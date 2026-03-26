import { X, ImagePlus, Trash2 } from "lucide-react";
import styles from "./ProductEditModal.module.css";
import FormInput from "../UI/Input/FormInput";

import img1 from "./MockPictures/1.avif";
import img2 from "./MockPictures/2.avif";
import img3 from "./MockPictures/3.avif";
import img4 from "./MockPictures/4.avif";
import img5 from "./MockPictures/5.avif";
import IconButton from "../UI/Button/IconButton";
import FormButton from "../UI/Button/FormButton";
import ProductAttributeRow from "./ProductAttributeRow";
import { useProductForm } from "../../hooks/useProductEditForm";

export default function ProductEditModal({ productId, onClose, onSubmit }) {
  const productImages = [img1, img2, img3, img4, img5];
  const {
    product,
    isLoading,
    handleAddAttribute,
    handleRemoveAttribute,
    handleAttributeChange,
    handleSubmit,
  } = useProductForm(productId, onSubmit, onClose);

  if (isLoading) {
    return <div className={styles.overlay}>Loading...</div>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <div className={styles.header}>
          <h2>Edit Product</h2>
          <IconButton
            icon={X}
            variant="close"
            onClick={onClose}
            aria-label="Close modal"
          />
        </div>

        <form className={styles.formBody} onSubmit={handleSubmit}>
          <div className={styles.scrollArea}>
            <div className={styles.inputGroup}>
              <label>Product Gallery</label>
              <div className={styles.imageGrid}>
                <div className={styles.imagePlaceholder}>
                  <ImagePlus size={32} />
                  <span>Upload Photo</span>
                </div>

                {productImages.map((imgSrc, index) => (
                  <div key={index} className={styles.imageThumb}>
                    <img src={imgSrc} alt={`Product ${index}`} />
                    <IconButton icon={Trash2} variant="delete" size={16} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <FormInput
                label="Product Name"
                id="name"
                name="name"
                defaultValue={product.name}
              />
            </div>

            <div className={styles.row}>
              <FormInput
                label="Price (RON)"
                id="price"
                name="price"
                type="number"
                defaultValue={product.price}
              />

              <FormInput
                label="Stock"
                id="stock"
                name="stock"
                type="number"
                defaultValue={product.stock_quantity}
              />

              <FormInput
                label="Category"
                id="category"
                name="category"
                type="number"
                defaultValue={product.category_id}
              />
            </div>

            <FormInput
              label="Description"
              id="description"
              name="description"
              type="textarea"
              defaultValue={product.description}
              rows="4"
            />

            <div className={styles.inputGroup}>
              <label>Attributes</label>
              {product.attributes.map((attr) => (
                <ProductAttributeRow
                  key={attr.id}
                  name={attr.name}
                  value={attr.value}
                  isNew={attr.isNew}
                  onChangeName={(e) =>
                    handleAttributeChange(attr.id, "name", e.target.value)
                  }
                  onChangeValue={(e) =>
                    handleAttributeChange(attr.id, "value", e.target.value)
                  }
                  onRemove={() => handleRemoveAttribute(attr.id)}
                />
              ))}
              <ProductAttributeRow
                isPlaceholder={true}
                name=""
                value=""
                onAdd={handleAddAttribute}
              />
            </div>
          </div>

          <div className={styles.footer}>
            <FormButton
              variant="secondary"
              onClick={onClose}
              aria-label="Close modal"
            >
              Cancel
            </FormButton>

            <FormButton
              variant="primary"
              type="submit"
              aria-label="Save Changes"
            >
              Save Changes
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
}
