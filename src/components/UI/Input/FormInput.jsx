import styles from "./FormInput.module.css";
import { forwardRef } from "react";

function FormInput(
  {
    label,
    id,
    type = "text",
    placeholder,
    className = "",
    options = [],
    onClick,
    error,
    ...props
  },
  ref,
) {
  const isTextArea = type === "textarea";
  const isSelect = type === "select";
  const inputClass = `${error ? styles.inputError : ""} ${props.className || ""}`;

  return (
    <div className={`${styles.inputGroup} ${className}`} onClick={onClick}>
      {label && <label htmlFor={id}>{label}</label>}

      {isTextArea && (
        <textarea
          ref={ref}
          id={id}
          placeholder={placeholder}
          className={inputClass}
          {...props}
        />
      )}

      {isSelect && (
        <select ref={ref} id={id} className={inputClass} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt, index) => (
            <option key={index} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      )}

      {!isTextArea && !isSelect && (
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className={inputClass}
          {...props}
        />
      )}

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}

export default forwardRef(FormInput);
