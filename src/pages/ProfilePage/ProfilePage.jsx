import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader.jsx";
import ProfileField from "./components/ProfileField/ProfileField.jsx";
import ProfileActions from "./components/ProfileActions/ProfileActions.jsx";
import { fetchCurrentUser } from "../../services/profileService.js";
import style from "./ProfilePage.module.css";

const ADDRESS_FIELDS = [
  { label: "Street", key: "street" },
  { label: "City", key: "city" },
  { label: "State / Region", key: "state" },
  { label: "Postal code", key: "postal_code" },
  { label: "Country", key: "country" },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token] = useState(() => localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    fetchCurrentUser()
      .then(setUser)
      .catch((err) => {
        if (err.status === 401) {
          navigate("/login", { replace: true });
        } else {
          setError(err.message);
        }
      })
      .finally(() => setIsLoading(false));
  }, [navigate, token]);

  if (!token) return null;
  if (isLoading) {
    return (
      <section className={style.page}>
        <p className={style.statusMsg} aria-live="polite">
          Loading profile...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={style.page}>
        <p className={style.errorMsg} role="alert">
          {error}
        </p>
      </section>
    );
  }
  if (!user) return null;

  return (
    <section className={style.page}>
      <h1 className={style.pageTitle}>My Profile</h1>
      <article className={style.card}>
        <ProfileHeader user={user} />

        <section className={style.section} aria-label="Personal information">
          <h2 className={style.sectionTitle}>Personal Information</h2>
          <dl className={style.fieldList}>
            <ProfileField label="First name" value={user.first_name} />
            <ProfileField label="Last name" value={user.last_name} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="Phone" value={user.phone} />
          </dl>
        </section>

        <section className={style.section} aria-label="Delivery address">
          <h2 className={style.sectionTitle}>Delivery Address</h2>
          <dl className={style.fieldList}>
            {ADDRESS_FIELDS.map(({ label, key }) => (
              <ProfileField key={key} label={label} value={null} />
            ))}
          </dl>
        </section>

        <ProfileActions />
      </article>
    </section>
  );
}
