import ProductEditModal from "../../components/admin/ProductEditModal";
import style from "./AdminPanel.module.css";
import { useState } from "react";

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const productId = 1; /* ONLY FOR TESTING */
  return (
    <>
      <h1 className={style.something}>Admin Panel Page</h1>;
      {/* TESTING FOR ADMIN PANEL */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Only for product id 1 (yet)</h2>
        <button
          onClick={() => setIsOpen(true)}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Open Modal
        </button>
        {isOpen && (
          <ProductEditModal
            productId={productId}
            onClose={() => setIsOpen(false)}
            onSubmit={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
}
