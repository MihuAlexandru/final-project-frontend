import style from "./ProfileHeader.module.css";

function AvatarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default function ProfileHeader({ user }) {
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <section className={style.header}>
      <div className={style.avatar} aria-hidden="true">
        <AvatarIcon />
      </div>
      <div className={style.info}>
        <h2 className={style.name}>{fullName}</h2>
        <p className={style.email}>{user.email}</p>
        <span className={`${style.role} ${style[user.role]}`}>{user.role}</span>
      </div>
    </section>
  );
}
