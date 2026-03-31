import { useNavigate } from "react-router-dom";
import styles from "./LoginPromptModal.module.css";

export default function LoginPromptModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Authentication Required</h2>
        <p>You need to be logged in to access this feature.</p>
        <div className={styles.modalActions}>
          <button
            className={styles.loginButton}
            onClick={() => {
              onClose();
              navigate("/login");
            }}
          >
            Go to Login
          </button>
          <button
            className={styles.signupButton}
            onClick={() => {
              onClose();
              navigate("/signup");
            }}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
}