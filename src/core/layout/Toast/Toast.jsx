import React from "react";
import './Toast.scss';
const iconMap = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️"
}

const Toast = ({ type = "success", message, onClose }) => {
  const toastClass = `toast toast--${type}`
  return (
    <div className={toastClass}>
        
        {/* Levi deo: Ikonica */}
        <div className="toast__icon">
            {iconMap[type]}
        </div>
        
        {/* Srednji deo: Tekst */}
        <span className="toast__message">
            {message}
        </span>

        {/* Desni deo: Dugme za zatvaranje (x) */}
        <button className="toast__close" onClick={onClose}>
            ×
        </button>
    </div>
  )
}

export default Toast;