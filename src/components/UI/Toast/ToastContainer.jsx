import { useToast } from "../../../context/ToastContext";
import Toast from "./Toast";

export default function ToastContainer() {
    const {toasts, removeToast} = useToast();

    if(toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={removeToast} />
            ))}
        </div>
    )
}