import { useToast } from "../context/ToastContext";

import ProductEditModal from "../components/Admin/ProductEditModal";
import { useState } from "react";

export default function Catalog() {
  const { addToast } = useToast();

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
    </div>
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Pagina Inventar (Test)</h1>
      {/* 2. Butonul care schimbă starea în 'true' */}
      <button
        onClick={() => setIsOpen(true)}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Deschide Modalul
      </button>
      {/* 3. Logica de afișare: dacă isOpen e true, randează componenta */}
      {isOpen && (
        <ProductEditModal
          onClose={() => setIsOpen(false)} // Când modalul cere închidere, facem starea 'false'
          onSubmit={(data) => {
            console.log("Date salvate:", data);
            setIsOpen(false); // Închidem după "salvare"
          }}
        />
      )}
    </div>
  );
}
