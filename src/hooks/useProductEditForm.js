import { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../services/productService";
import { useToast } from "../context/ToastContext";

export function useProductForm(productId, onSubmit, onClose) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

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

    const errorMessage = validateProductData(updatedFields);
    if (errorMessage) {
      return addToast({ type: "error", message: errorMessage });
    }

    try {
      const updatedProduct = await updateProduct(productId, updatedFields);
      addToast({
        type: "success",
        message: "Product updated successfully!",
      });
      if (onSubmit) onSubmit(updatedProduct);
      onClose();
    } catch (error) {
      addToast({
        type: "error",
        message: `Failed to update: ${error.message}`,
      });
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

function validateProductData(data) {
  if (!data.name || data.name.trim().length < 3) {
    return "The product name must have at least 3 characters.";
  }

  if (isNaN(data.price) || data.price <= 0) {
    return "Please enter a valid price (greater than 0).";
  }

  if (isNaN(data.stock_quantity) || data.stock_quantity < 0) {
    return "Stock cannot be a negative number.";
  }

  if (!data.category_id) {
    return "Please select a category for the product.";
  }

  for (const attr of data.attributes) {
    if (!attr.name.trim() || !attr.value.trim()) {
      return "All attributes must have both a name and a value.";
    }
  }

  return null;
}
