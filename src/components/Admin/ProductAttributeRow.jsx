import { Trash2, Plus } from "lucide-react";
import FormInput from "../UI/Input/FormInput";
import IconButton from "../UI/Button/IconButton";
import styles from "./ProductAttributeRow.module.css";

export default function ProductAttributeRow({
  name,
  value,
  isPlaceholder,
  onAdd,
  onRemove,
}) {
  const rowClass = isPlaceholder
    ? `${styles.attributeRow} ${styles.placeholderRow}`
    : styles.attributeRow;

  const handleRowClick = (e) => {
    if (isPlaceholder && onAdd) {
      onAdd(e);
    }
  };

  return (
    <div
      className={rowClass}
      onClick={handleRowClick}
      role={isPlaceholder ? "button" : undefined}
    >
      <FormInput
        placeholder="Attribute (e.g. Color)"
        defaultValue={name}
        className={styles.flexInput}
        readOnly={isPlaceholder}
      />

      <FormInput
        placeholder="Value (e.g. Red)"
        defaultValue={value}
        className={styles.flexInput}
        readOnly={isPlaceholder}
      />

      <div className={styles.actionColumn}>
        {isPlaceholder ? (
          <IconButton icon={Plus} variant="primary" size={18} type="button" />
        ) : (
          <IconButton
            icon={Trash2}
            variant="delete"
            size={18}
            aria-label="Remove attribute"
            onClick={onRemove}
          />
        )}
      </div>
    </div>
  );
}
