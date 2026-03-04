const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure?",
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-2 text-gray-600">{message}</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
