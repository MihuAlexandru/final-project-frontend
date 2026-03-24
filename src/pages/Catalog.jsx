import { useToast } from "../context/ToastContext";

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
}
