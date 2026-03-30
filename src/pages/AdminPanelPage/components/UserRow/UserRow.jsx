import Button from "../../../../components/UI/Button/Button.jsx";
import style from "./UserRow.module.css";

function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export default function UserRow({ user, onPromote, onDemote, onDelete }) {
  return (
    <li className={style.row}>
      <div className={style.userInfo}>
        <span className={style.icon}>
          <PersonIcon />
        </span>
        <div>
          <span className={style.email}>{user.email}</span>
          <span className={`${style.role} ${style[user.role]}`}>{user.role}</span>
        </div>
      </div>
      <div className={style.actions} role="group" aria-label={`Actions for ${user.email}`}>
        <Button
          className={style.promoteBtn}
          onClick={() => onPromote(user.id)}
          aria-label={`Promote ${user.email} to admin`}
        >
          Promote
        </Button>
        <Button
          className={style.demoteBtn}
          onClick={() => onDemote(user.id)}
          aria-label={`Demote ${user.email} to user`}
        >
          Demote
        </Button>
        <Button
          className={style.deleteBtn}
          onClick={() => onDelete(user.id)}
          aria-label={`Delete ${user.email}`}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
