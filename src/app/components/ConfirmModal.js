"use client";

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-[28rem] shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {message}
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
          </div>
          <div className="flex items-center justify-center px-2 py-3">
            <button
              id="cancel-btn"
              className="px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-md w-auto mr-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
              onClick={onClose}
            >
              {/* <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg> */}
              Cancel action
            </button>
            <button
              id="ok-btn"
              className="px-4 py-2 bg-red-100 text-red-700 text-base font-medium rounded-md w-auto hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 flex items-center justify-center"
              onClick={onConfirm}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
