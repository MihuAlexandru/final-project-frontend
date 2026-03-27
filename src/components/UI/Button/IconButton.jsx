import styles from "./IconButton.module.css";

export default function IconButton({
  icon: Icon,
  onClick,
  variant,
  size = 20,
  ...props
}) {
  return (
    <button
      className={`${styles.iconBtn} ${styles[variant] || ""}`}
      onClick={onClick}
      type="button"
      {...props}
    >
      <Icon size={size} />
    </button>
  );
}
