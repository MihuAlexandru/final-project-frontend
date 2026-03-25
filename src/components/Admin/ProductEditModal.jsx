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

export default function ProductEditModal({ onClose, onSubmit }) {
  const productImages = [img1, img2, img3, img4, img5];

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

        <form className={styles.formBody} onSubmit={onSubmit}>
          <div className={styles.scrollArea}>
            {/* IMAGES SECTION */}
            <div className={styles.inputGroup}>
              <label>Product Gallery</label>
              <div className={styles.imageGrid}>
                <div className={styles.imagePlaceholder}>
                  <ImagePlus size={32} />
                  <span>Upload Photo</span>
                </div>

                {/* RENDER EXISTING PICTURES */}
                {productImages.map((imgSrc, index) => (
                  <div key={index} className={styles.imageThumb}>
                    <img src={imgSrc} alt={`Product ${index}`} />
                    <IconButton icon={Trash2} variant="delete" size={16} />
                  </div>
                ))}
              </div>
            </div>

            {/* INFO SECTION */}
            <div className={styles.inputGroup}>
              <FormInput
                label="Product Name"
                id="name"
                placeholder="e.g. Gaming Laptop"
              />
            </div>

            <div className={styles.row}>
              <FormInput
                label="Price (RON)"
                id="price"
                type="number"
                placeholder="0.00"
              />

              <FormInput
                label="Stock"
                id="stock"
                type="number"
                placeholder="10"
              />

              <FormInput
                label="Category"
                id="category"
                type="select"
                placeholder="Choose the category"
                defaultValue=""
                options={["Option 1", "Option 2", "Option 3"]}
              />
            </div>

            <FormInput
              label="Description"
              id="description"
              type="textarea"
              placeholder="Add product details..."
              rows="4"
            />

            {/* ATTRIBUTES SECTION */}
            <div className={styles.inputGroup}>
              <label>Attributes</label>
              <ProductAttributeRow />
              <ProductAttributeRow />
              <ProductAttributeRow />
              <ProductAttributeRow />
              <ProductAttributeRow />
              <ProductAttributeRow />
              <ProductAttributeRow />
              <ProductAttributeRow />
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
