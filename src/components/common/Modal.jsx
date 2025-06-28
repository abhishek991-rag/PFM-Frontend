import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white rounded-lg shadow-xl p-6 relative w-full max-w-lg mx-4 ${className}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Title */}
        {title && (
          <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
            {title}
          </h3>
        )}

        {/* Content */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') // This is the portal target
  );
};

export default Modal;
