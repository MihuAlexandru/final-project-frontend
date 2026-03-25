import { Trash2 } from "lucide-react";
import FormInput from "../UI/Input/FormInput";
import IconButton from "../UI/Button/IconButton";
import styles from "./ProductAttributeRow.module.css";

export default function ProductAttributeRow({ name, value }) {
  return (
    <div className={styles.attributeRow}>
      <FormInput
        placeholder="Attribute (e.g. Color)"
        value={name}
        className={styles.flexInput}
      />

      <FormInput
        placeholder="Value (e.g. Red)"
        value={value}
        className={styles.flexInput}
      />

      <div className={styles.actionColumn}>
        <IconButton
          icon={Trash2}
          variant="delete"
          size={18}
          aria-label="Remove attribute"
        />
      </div>
    </div>
  );
}
