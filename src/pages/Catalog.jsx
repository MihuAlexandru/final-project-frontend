import { mockProducts } from "../../MockData/mockProducts";
import ProductCard from "../components/ProductCard/ProductCard";

import { useToast } from "../context/ToastContext";

export default function Catalog() {
  const { addToast } = useToast();

  return (
    <div>
      <h1>Catalog page</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {mockProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "100px" }}>
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
}
