import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/UI/Button/Button.jsx";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { deactivateCurrentUser } from "../../../../services/profileService.js";
import { useUser } from "../../../../context/UserContext.jsx";
import { useToast } from "../../../../context/ToastContext.jsx";
import style from "./ProfileActions.module.css";

export default function ProfileActions() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { logout } = useUser();
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function handleDeleteConfirm() {
    try {
      await deactivateCurrentUser();
      logout();
      navigate("/login", { replace: true });
      addToast({ type: "info", message: "Your account has been deactivated." });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    } finally {
      setShowDelete(false);
    }
  }

  return (
    <section className={style.actions}>
      <Button className={style.editBtn} onClick={() => setShowEdit(true)}>
        Edit profile
      </Button>

      <Button
        disabled
        aria-disabled="true"
        className={style.resetBtn}
      >
        Reset password
      </Button>

      <Button
        className={style.deleteBtn}
        onClick={() => setShowDelete(true)}
        aria-label="Delete your account"
      >
        Delete account
      </Button>

      <EditProfileModal open={showEdit} onClose={() => setShowEdit(false)} />

      <ConfirmDeleteModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDeleteConfirm}
        itemName="account"
      />
    </section>
  );
}
