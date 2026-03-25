import style from "./Button.module.css";

export default function Button({ children, className = "", ...props }) {
  return (
    <button className={`${style.btn} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
