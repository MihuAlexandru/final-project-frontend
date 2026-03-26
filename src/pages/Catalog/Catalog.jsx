import { useState } from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal/ConfirmDeleteModal";
import { mockProducts } from "../../../MockData/mockProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useToast } from "../../context/ToastContext";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const { addToast } = useToast();
  const [deleteModal, setDeleteModal] = useState({ open: false, type: "" });

  const openDelete = (type) => setDeleteModal({ open: true, type });
  const closeDelete = () => setDeleteModal({ open: false, type: "" });

  const handleConfirmDelete = () => {
    addToast({
      type: "success",
      message: `${deleteModal.type} deleted successfully!`,
    });
    closeDelete();
  };

  return (
    <div>
      <h1>Catalog page</h1>
      <div className={styles.catalogContainer}>
        {mockProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      <div className={styles.toastTest}>
        <button
          onClick={() =>
            addToast({ type: "success", message: "Item added to cart!" })
          }
        >
          Test Success
        </button>
        <button
          onClick={() =>
            addToast({ type: "error", message: "Something went wrong." })
          }
        >
          Test Error
        </button>
        <button
          onClick={() =>
            addToast({ type: "warning", message: "Low stock warning." })
          }
        >
          Test Warning
        </button>
        <button
          onClick={() =>
            addToast({ type: "info", message: "New products available." })
          }
        >
          Test Info
        </button>
      </div>

      <h2 style={{ marginTop: "32px" }}>Delete Modal Test</h2>
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <button onClick={() => openDelete("User")}>Delete User</button>
        <button onClick={() => openDelete("Product")}>Delete Product</button>
      </div>

      <ConfirmDeleteModal
        open={deleteModal.open}
        onClose={closeDelete}
        onConfirm={handleConfirmDelete}
        itemName={deleteModal.type}
      />
    </div>
  );
}
