import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useToast } from "../../context/ToastContext";
import { resetPassword } from "../../services/authService";
import { validatePassword, doPasswordsMatch } from "../../utils/validation";
import styles from "../Login/Login.module.css";
import loginBg from "../../assets/dark-surface-illustration.jpg";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  if (!token) {
     return (
       <div className={styles.container}>
         <div className={styles.formWrapper}>
            <h1 className={styles.title}>Invalid Link</h1>
            <p className={styles.subtitle}>No reset token provided. Please request a new password reset.</p>
            <Link to="/forgot-password"><Button>Request Reset</Button></Link>
         </div>
       </div>
     );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = { password: "", confirm: "" };

    if (!validatePassword(newPassword)) {
      nextErrors.password = "Password must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.";
    }

    if (!doPasswordsMatch(newPassword, confirmPassword)) {
      nextErrors.confirm = "Passwords do not match.";
    }

    setErrors(nextErrors);

    if (nextErrors.password || nextErrors.confirm) return;

    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      addToast({ type: "success", message: "Password reset successfully!" });
      navigate("/login", { replace: true });
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
          <h1 className={styles.title}>Reset Password</h1>
          <p className={styles.subtitle}>Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <Input
              label="New Password"
              type="password"
              placeholder="••••••"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.fieldGroup}>
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirm: "" }));
              }}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />
            {errors.confirm && <p className={styles.error}>{errors.confirm}</p>}
          </div>

          <Button className={styles.loginButton} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
      <div
        className={styles.colorBlock}
        style={{ backgroundImage: `url(${loginBg})` }}
      />
    </div>
  );
}