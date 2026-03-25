import styles from "./FormInput.module.css";

export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  className = "",
  options = [],
  ...props
}) {
  const isTextArea = type === "textarea";
  const isSelect = type === "select";

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}

      {isTextArea && <textarea id={id} placeholder={placeholder} {...props} />}

      {isSelect && (
        <select id={id} {...props}>
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
        <input id={id} type={type} placeholder={placeholder} {...props} />
      )}
    </div>
  );
}
