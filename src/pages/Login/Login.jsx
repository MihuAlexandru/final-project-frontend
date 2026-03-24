import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useToast } from "../../context/ToastContext";
import styles from "./Login.module.css";
import loginBg from "../../assets/dark-surface-illustration.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      email: email ? "" : "Email is required*",
      password: password ? "" : "Password is required*",
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      addToast({
        type: "error",
        message: "Login failed. Please try again.",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addToast({ type: "success", message: "Logged in successfully!" });
      navigate("/catalog");
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.introBlock}>
          <h1 className={styles.title}>Welcome back!</h1>
          <p className={styles.subtitle}>
            Log in to continue shopping your saved picks and exclusive drops.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <Input
              label="Email address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.fieldGroup}>
            <Input
              label="Password"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <p className={styles.signupText}>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>

          <Button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
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
