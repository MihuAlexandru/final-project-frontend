import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useToast } from "../../context/ToastContext";
import { requestPasswordReset } from "../../services/authService";
import { validateEmail } from "../../utils/validation";
import styles from "../Login/Login.module.css";
import loginBg from "../../assets/dark-surface-illustration.jpg";

export default function ForgotPassword() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address*");
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSubmitted(true);
      addToast({ type: "success", message: "Reset link sent to your email!" });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.introBlock}>
          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>
            {submitted
              ? "If an account exists, a reset link has been sent to your email."
              : "Enter your email address to request a password reset."}
          </p>
        </div>

        {!submitted && (
          <form onSubmit={handleSubmit}>
            <div className={styles.fieldGroup}>
              <Input
                label="Email address"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              {error && <p className={styles.error}>{error}</p>}
            </div>

            <Button className={styles.loginButton} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}

        <p className={styles.signupText}>
          Remembered your password? <Link to="/login">Back to Login</Link>
        </p>
      </div>

      <div
        className={styles.colorBlock}
        style={{ backgroundImage: `url(${loginBg})` }}
      />
    </div>
  );
}
