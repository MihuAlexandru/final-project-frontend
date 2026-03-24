import style from "./Input.module.css";

export default function Input({
  label,
  showPassword,
  togglePassword,
  type,
  ...props
}) {
  const inputType = showPassword && type === "password" ? "text" : type;

  return (
    <div className={style.inputGroup}>
      {label && <label>{label}</label>}

      {type === "password" ? (
        <div className="password-wrapper">
          <input type={inputType} {...props} />
          <button
            type="button"
            className="toggle"
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      ) : (
        <input type={inputType} {...props} />
      )}
    </div>
  );
}
