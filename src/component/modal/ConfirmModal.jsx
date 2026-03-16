// const ConfirmModal = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title = "Confirm Action",
//   message = "Are you sure?",
// }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//         <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <p className="mt-2 text-gray-600">{message}</p>
//           <div className="mt-4 flex justify-end gap-2">
//             <button
//               className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
//               onClick={() => {
//                 onConfirm();
//                 onClose();
//               }}
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConfirmModal;

import { useEffect } from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in-95">
        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {message}
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
            >
              {cancelText}
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-400 transition"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
