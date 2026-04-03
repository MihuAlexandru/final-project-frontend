import style from "./ProductsPanel.module.css";
import Button from "../../../../components/UI/Button/Button";
import Input from "../../../../components/UI/Input/Input";
import DropZone from "../Drag&DropBox/DropZone";
import DropDown from "../DropDown/DropDown";
import Tags from "../Tags/Tags";
import { useToast } from "../../../../context/ToastContext";
import { useState } from "react";
import {
  createProduct,
  uploadProductImage,
  addProductAtttribute,
} from "../../../../services/productService";

export default function ProductsPanel() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    category_id: 1,
    is_active: true,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      //create product
      const newProduct = await createProduct(formData);

      if (selectedFile) {
        await uploadProductImage(newProduct.id, selectedFile);
      }

      if (attributes.length > 0) {
        const attributePromises = attributes.map((attr) =>
          addProductAtttribute(newProduct.id, {
            name: attr.name,
            value: attr.value.toLowerCase(),
          }),
        );
        await Promise.all(attributePromises);
      }

      addToast({ type: "success", message: "Product added successfully!" });
      handleCancel();
    } catch (error) {
      addToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      category_id: 1,
    });
    setSelectedFile(null);
    setAttributes([]);
  };

  return (
    <section className={style.panel}>
      <header className={style.header}>
        <h2 className={style.title}>Add Products</h2>
        <span className={style.subtitle}>
          Create new items for your store catalog.
        </span>
        <div className={style.btnWrapper}>
          <Button
            className={style.addBtn}
            onClick={handleAddProduct}
            disabled={loading}
          >
            {loading ? "Adding product ..." : "Add product"}
          </Button>
          <Button className={style.cancelBtn} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </header>
      <form className={style.addContainer}>
        {/* <p className={style.message}>Products management - TBA</p> */}
        <Input
          label="Product Name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange(e, "name")}
        />
        <Input
          className={style.description}
          label="Description"
          type="text"
          value={formData.description}
          onChange={(e) => handleChange(e, "description")}
        />
        <div className={style.contentGroup}>
          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange(e, "price")}
          />
          <Input
            label="Stock"
            type="number"
            value={formData.stock_quantity}
            onChange={(e) => handleChange(e, "stock_quantity")}
          />
        </div>
        <DropZone onFileSelect={setSelectedFile} />
        <DropDown
          value={formData.category_id}
          onChange={(newCategoryId) =>
            setFormData({ ...formData, category_id: newCategoryId })
          }
        />
        <Tags items={attributes} setItems={setAttributes} />
      </form>
    </section>
  );
}
