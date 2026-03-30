import { useState } from "react";
import styles from "./CollapsibleSection.module.css";

export default function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.section}>
      <div className={styles.header} onClick={() => setOpen((o) => !o)}>
        <strong>{title}</strong>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
}
