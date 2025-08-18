import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // Don't render modal if not open

  return (
    <>
      <div className="z-50">
        {/* Backdrop */}
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/10 "
          onClick={onClose}
        />

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent backdrop close when clicking inside modal
          >
            {/* Modal header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                type="button" // prevent default form submit behavior if inside form
                onClick={onClose} // call parent's onClose function
                className="text-gray-600 hover:text-gray-900 text-2xl leading-none font-bold hover:bg-gray-100 hover:rounded-full p-1"
                aria-label="Close modal"
              >
                <IoClose />
              </button>
            </div>

            {/* Modal body */}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
