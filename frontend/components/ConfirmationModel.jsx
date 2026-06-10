import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { RiDeleteBack2Fill } from 'react-icons/ri';

const ConfirmationModal = (props) => {
  const {onClose} = props;

  const handleClearScene = () => {
    // call API to clear scene
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55">
      <div className="bg-[#b8bbd0] border border-white/10 rounded-xl p-6 w-[340px] flex flex-col gap-5">
        
        <div className="flex items-start gap-3">
          <div className="w-[38px] h-[38px] rounded-lg bg-red-400 text-white font-semibold flex items-center justify-center shrink-0">
            <FaTrash size={18} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-medium text-black">Are you sure you want to clear all objects?</p>
            <p className="text-[13px] text-black italic">
                This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[13px] rounded-lg border border-white/15 text-white bg-gray-900 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleClearScene}
            className="px-4 py-1.5 text-[13px] rounded-lg border border-red-400/30 text-white font-medium bg-red-500 transition cursor-pointer"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;