import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useState } from "react";
import {
  validatePassword,
  doPasswordsMatch,
  validateEmail,
  validatePhone,
} from "../../utils/validation";
import { signup } from "../../services/register";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

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

    try {
      const result = await signup(formData);
      localStorage.setItem("token", result.access_token);
      window.location.href = "/login";
    } catch (err) {
      console.log(err.message);
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
        <span style={{ color: "red" }}>Invalid Email</span>
      )}
      <Input
        type="password"
        name="password"
        label="Password:"
        onChange={handleChange}
      />
      {!isPasswordValid && formData.password && (
        <span style={{ color: "red" }}>Invalid Password</span>
      )}

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password:"
        onChange={handleChange}
      />
      {!isMatch && formData.confirmPassword && (
        <span style={{ color: "red" }}>{"Passwords don't match"}</span>
      )}

      {wasSubmitted && !isFormValid && (
        <div style={{ marginBottom: "10px" }}>
          <span style={{ color: "red", fontWeight: "bold" }}>
            Please fill in all fields correctly to register.
          </span>
        </div>
      )}

      <Button style={{ backgroundColor: "black", color: "white" }}>
        Register
      </Button>
    </form>
  );
}
