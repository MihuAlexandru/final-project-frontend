import Button from "../../../../components/UI/Button/Button.jsx";
import { useUser } from "../../../../context/UserContext.jsx";
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

export default function UserRow({
  user,
  onPromote,
  onDemote,
  onDelete,
  onReactivate,
}) {
  const { user: currentUser } = useUser();

  const isTargetAdmin = user.role === "admin";
  const canDelete = !isTargetAdmin && currentUser?.role === "admin";

  return (
    <li className={style.row}>
      <div className={style.userInfo}>
        <span className={style.icon}>
          <PersonIcon />
        </span>
        <div>
          <span className={style.email}>
            {user.email}
            {!user.is_active && (
              <span
                className={style.deactivatedTag}
                aria-label="Deactivated account"
              >
                Deactivated
              </span>
            )}
          </span>
          <span className={`${style.role} ${style[user.role]}`}>
            {user.role}
          </span>
        </div>
      </div>

      <div
        className={style.actions}
        role="group"
        aria-label={`Actions for ${user.email}`}
      >
        {!isTargetAdmin && (
          <Button
            className={style.promoteBtn}
            onClick={() => onPromote(user.id)}
            aria-label={`Promote ${user.email} to admin`}
          >
            Promote
          </Button>
        )}
        {!isTargetAdmin && (
          <Button
            className={style.demoteBtn}
            onClick={() => onDemote(user.id)}
            aria-label={`Demote ${user.email} to customer`}
          >
            Demote
          </Button>
        )}
        {!user.is_active && (
          <Button
            className={style.reactivateBtn}
            onClick={() => onReactivate(user.id)}
            aria-label={`Reactivate ${user.email}`}
          >
            Reactivate
          </Button>
        )}
        {canDelete && (
          <Button
            className={style.deleteBtn}
            onClick={() => onDelete(user.id)}
            aria-label={`Deactivate ${user.email}`}
          >
            Delete
          </Button>
        )}
      </div>
    </li>
  );
}
