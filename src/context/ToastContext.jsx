import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

let ToastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    function removeToast(id) {
        setToasts((prev) => 
            prev.map((t) => (t.id === id ? {...t, exiting: true} : t)),
        );

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300);
    }

    function addToast({ type = "info", message, duration = 4000 }) {
        const id = ++ToastId;

        setToasts((prev) => [...prev, { id, type, message, exiting: false }]);

        if(duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('usetoast must be used within toastProvider');
    }
    return context;
}