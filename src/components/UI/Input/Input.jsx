import style from "./Input.module.css";

export default function Input({
  label,
  showPassword,
  togglePassword,
  type,
  ...props
}) {
  const inputType = showPassword && type === "password" ? "text" : type;

  if (type === "checkbox") {
    return (
      <label className={style.checkboxWrapper}>
        <input type="checkbox" {...props} />
        {label && <span>{label}</span>}
      </label>
    );
  }

  return (
    <div className={style.inputGroup}>
      {label && <label>{label}</label>}

      {type === "password" ? (
        <div className={style.passwordWrapper}>
          <input type={inputType} {...props} />
          <button
            type="button"
            className={style.toggle}
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
