import { useRef, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import FormInput from "../UI/Input/FormInput";
import IconButton from "../UI/Button/IconButton";
import styles from "./ProductAttributeRow.module.css";

export default function ProductAttributeRow({
  name,
  value,
  isPlaceholder,
  isNew,
  onAdd,
  onRemove,
  onChangeName,
  onChangeValue,
}) {
  const nameRef = useRef(null);

  const rowClass = isPlaceholder
    ? `${styles.attributeRow} ${styles.placeholderRow}`
    : styles.attributeRow;

  useEffect(() => {
    if (isNew && nameRef.current) {
      nameRef.current.focus();
    }
  }, [isNew]);

  return (
    <div className={rowClass} onClick={isPlaceholder ? onAdd : undefined}>
      <FormInput
        ref={nameRef}
        placeholder="Attribute (e.g. Color)"
        value={name || ""}
        onChange={onChangeName}
        className={styles.flexInput}
        readOnly={isPlaceholder}
      />

      <FormInput
        placeholder="Value (e.g. Red)"
        value={value || ""}
        onChange={onChangeValue}
        className={styles.flexInput}
        readOnly={isPlaceholder}
      />

      <div className={styles.actionColumn}>
        {isPlaceholder ? (
          <IconButton icon={Plus} variant="add" size={18} type="button" />
        ) : (
          <IconButton
            icon={Trash2}
            variant="delete"
            size={18}
            aria-label="Remove attribute"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
        )}
      </div>
    </div>
  );
}
