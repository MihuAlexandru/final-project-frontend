import { X, ImagePlus, Trash2 } from "lucide-react";
import styles from "./ProductEditModal.module.css";
import FormInput from "../UI/Input/FormInput";
import { useState, useEffect } from "react";

import img1 from "./MockPictures/1.avif";
import img2 from "./MockPictures/2.avif";
import img3 from "./MockPictures/3.avif";
import img4 from "./MockPictures/4.avif";
import img5 from "./MockPictures/5.avif";
import IconButton from "../UI/Button/IconButton";
import FormButton from "../UI/Button/FormButton";
import ProductAttributeRow from "./ProductAttributeRow";
import { getProductById } from "../../services/productService";

export default function ProductEditModal({ productId, onClose, onSubmit }) {
  const productImages = [img1, img2, img3, img4, img5];

  const [product, setProduct] = useState(null);

  function handleAddAttribute() {
    const newAttribute = {
      id: Date.now(),
      name: "",
      value: "",
    };
    setProduct({
      ...product,
      attributes: [...product.attributes, newAttribute],
    });
  }

  function handleRemoveAttributeRow(id) {
    setProduct({
      ...product,
      attributes: product.attributes.filter((attr) => attr.id !== id),
    });
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(productId);
        console.log("Produsul primit:", data);
        setProduct(data);
        console.log(product);
      } catch (error) {
        console.log(error);
      }
    }

    loadProduct();
  }, [productId]);

  if (!product) {
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
                defaultValue={product.name}
              />
            </div>

            <div className={styles.row}>
              <FormInput
                label="Price (RON)"
                id="price"
                type="number"
                defaultValue={product.price}
              />

              <FormInput
                label="Stock"
                id="stock"
                type="number"
                defaultValue={product.stock_quantity}
              />

              <FormInput
                label="Category"
                id="category"
                type="number"
                defaultValue={product.category_id}
              />
            </div>

            <FormInput
              label="Description"
              id="description"
              type="textarea"
              defaultValue={product.description}
              rows="4"
            />

            {/* ATTRIBUTES SECTION */}
            <div className={styles.inputGroup}>
              <label>Attributes</label>
              {product.attributes.map((attr) => (
                <ProductAttributeRow
                  key={attr.id}
                  name={attr.name}
                  value={attr.value}
                  onRemove={() => {
                    handleRemoveAttributeRow(attr.id);
                  }}
                />
              ))}
              <ProductAttributeRow
                isPlaceholder={true}
                name=""
                value=""
                onAdd={(e) => {
                  e.preventDefault();
                  handleAddAttribute();
                }}
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
