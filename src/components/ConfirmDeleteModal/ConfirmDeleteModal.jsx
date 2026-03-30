import { useEffect } from "react";
import style from "./ConfirmDeleteModal.module.css"

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  itemName,
}) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <div className={style.iconCircle}>
          <svg viewBox="0 0 20 20" fill="currentColor" width="28" height="28">
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h2 className={style.title}>Delete {itemName}?</h2>
        <p className={style.message}>
          This action cannot be undone. Are you sure you want to permanently
          delete this {itemName.toLowerCase()}?
        </p>

        <div className={style.actions}>
          <button className={style.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={style.deleteBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}