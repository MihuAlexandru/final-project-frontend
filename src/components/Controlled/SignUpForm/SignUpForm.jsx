import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { useState } from "react";
import { useNavigation } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";
import styles from "./style.module.css";

import {
  validatePassword,
  doPasswordsMatch,
  validateEmail,
  validatePhone,
} from "../../../utils/validation";
import { signup } from "../../../services/register";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  const addToast = useToast();
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isSurname = formData.last_name.trim().length > 0;
  const isName = formData.first_name.trim().length > 0;
  const isPasswordValid = validatePassword(formData.password);
  const isMatch = doPasswordsMatch(formData.password, formData.confirmPassword);
  const isEmailValid = validateEmail(formData.email);
  const isPhoneValid = validatePhone(formData.phone);

  const isFormValid =
    isSurname &&
    isName &&
    isPasswordValid &&
    isMatch &&
    isEmailValid &&
    isPhoneValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setWasSubmitted(true);

    if (!isFormValid) return;

    setLoading(true);
    try {
      const payload = { ...formData };
      delete payload.confirmPassword;
      const result = await signup(payload);
      localStorage.setItem("access_token", result.access_token);
      addToast({ type: "success", message: "Registered successfully!" });
      navigate("/catalog", { replace: true });
    } catch (err) {
      addToast({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegisterClick}>
      <Input
        type="text"
        name="last_name"
        label="Surname:"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="first_name"
        label="Name:"
        onChange={handleChange}
      />
      <Input
        type="tel"
        name="phone"
        label="Telephone number:"
        onChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        label="E-mail:"
        onChange={handleChange}
      />
      {!isEmailValid && formData.email && (
        <span className={styles.errorMessage}>Invalid Email</span>
      )}
      <Input
        type="password"
        name="password"
        label="Password:"
        onChange={handleChange}
      />
      {!isPasswordValid && formData.password && (
        <span className={styles.errorMessage}>Invalid Password</span>
      )}

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password:"
        onChange={handleChange}
      />
      {!isMatch && formData.confirmPassword && (
        <span className={styles.errorMessage}>{"Passwords don't match"}</span>
      )}

      {wasSubmitted && !isFormValid && (
        <div className={styles.summaryErrorContainer}>
          <span className={styles.summaryErrorText}>
            Please fill in all fields correctly to register.
          </span>
        </div>
      )}

      <Button disabled={loading} className={styles.submitButton}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
