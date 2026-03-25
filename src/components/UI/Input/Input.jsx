import style from "./Input.module.css";

export default function Input({ label, ...props }) {
  return (
    <div className={style.inputGroup}>
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
}
