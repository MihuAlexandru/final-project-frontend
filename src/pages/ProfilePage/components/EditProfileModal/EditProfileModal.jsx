import { useEffect, useState } from "react";
import { useUser } from "../../../../context/UserContext.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";
import { updateCurrentUser } from "../../../../services/profileService.js";
import Input from "../../../../components/UI/Input/Input.jsx";
import style from "./EditProfileModal.module.css";

export default function EditProfileModal({ open, onClose }) {
  const { user, setUser } = useUser();
  const { addToast } = useToast();
  const [personalForm, setPersonalForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open && user) {
      setPersonalForm({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [open, user]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  function handlePersonalChange(e) {
    const { name, value } = e.target;
    setPersonalForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true);

    const changedPersonal = Object.fromEntries(
      Object.entries(personalForm).filter(([k, v]) => v !== (user[k] ?? "")),
    );
    if (Object.keys(changedPersonal).length === 0) {
      onClose();
      setIsSaving(false);
      return;
    }

    try {
      const updated = await updateCurrentUser(changedPersonal);
      setUser(updated);
      addToast({ type: "success", message: "Profile updated successfully." });
      onClose();
    } catch (err) {
      addToast({ type: "error", message: err.message });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <header className={style.modalHeader}>
          <h2 className={style.title}>Edit Profile</h2>
          <button
            className={style.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.formBody}>
            <section className={style.section}>
              <h3 className={style.sectionTitle}>Personal Information</h3>
              <div className={style.grid}>
                <Input
                  label="First name"
                  type="text"
                  name="first_name"
                  value={personalForm.first_name ?? ""}
                  onChange={handlePersonalChange}
                />
                <Input
                  label="Last name"
                  type="text"
                  name="last_name"
                  value={personalForm.last_name ?? ""}
                  onChange={handlePersonalChange}
                />
              </div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={personalForm.email ?? ""}
                onChange={handlePersonalChange}
              />
              <Input
                label="Phone"
                type="tel"
                name="phone"
                value={personalForm.phone ?? ""}
                onChange={handlePersonalChange}
              />
            </section>
          </div>

          <footer className={style.footer}>
            <button
              type="button"
              className={style.cancelBtn}
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button type="submit" className={style.saveBtn} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save changes"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
