import React from "react";

const Modal = ({ isOpen, onClose, content }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            {content.loading && <p>Processing your CSV file...</p>}
            {content.error && <p>Error: {content.error}</p>}
            {content.success && <p>Successfully downloaded CSV file.</p>}
            <button
              onClick={onClose}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
