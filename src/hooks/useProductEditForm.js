import { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../services/productService";

export function useProductForm(productId, onSubmit, onClose) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  const handleAddAttribute = () => {
    const newAttribute = {
      id: Date.now(),
      name: "",
      value: "",
      isNew: true,
    };
    setProduct((prev) => ({
      ...prev,
      attributes: [...prev.attributes, newAttribute],
    }));
  };

  const handleRemoveAttribute = (id) => {
    setProduct((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((attr) => attr.id !== id),
    }));
  };

  const handleAttributeChange = (id, field, newValue) => {
    setProduct((prev) => ({
      ...prev,
      attributes: prev.attributes.map((attr) =>
        attr.id === id ? { ...attr, [field]: newValue } : attr,
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedFields = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      stock_quantity: parseInt(formData.get("stock"), 10),
      category_id: parseInt(formData.get("category"), 10),
      attributes: product.attributes,
    };

    try {
      const updatedProduct = await updateProduct(productId, updatedFields);
      if (onSubmit) onSubmit(updatedProduct);
      onClose();
    } catch (error) {
      alert("Eroare: " + error.message);
    }
  };

  return {
    product,
    isLoading,
    handleAddAttribute,
    handleRemoveAttribute,
    handleAttributeChange,
    handleSubmit,
  };
}
