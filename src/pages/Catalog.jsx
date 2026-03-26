import { useToast } from "../context/ToastContext";

import ProductEditModal from "../components/Admin/ProductEditModal";
import { useState } from "react";

export default function Catalog() {
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Catalog page</h1>

      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
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

      <div style={{ padding: "40px", textAlign: "center" }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Open Modal
        </button>
        {isOpen && (
          <ProductEditModal
            productId={1}
            onClose={() => setIsOpen(false)}
            onSubmit={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
