import React, { useState } from "react";
import AddObjectDialogBox from "../components/dashboard/AddObjectDialogBox";
import toast from "react-hot-toast";

const SceneViewRoomPage = () => {
  const [openAddObjectDialogBox, setOpenAddObjectDialogBox] = useState(null);

  const handleOnSaveScene = () => {
    toast.success("Scene saved successfully!");
  };

  return (
    <section className="h-full w-full overflow-hidden flex flex-col bg-[#0d0e24]">
      <div className="relative flex-1 w-full bg-gray-800/30 flex items-center justify-center overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          {openAddObjectDialogBox && (
            <div className="absolute top-0 right-full mr-3">
              <AddObjectDialogBox
                onClose={() => setOpenAddObjectDialogBox()}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => setOpenAddObjectDialogBox(!openAddObjectDialogBox)}
            >
              Add Object
            </button>

            <button 
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => handleOnSaveScene()}
            >
              Save
            </button>
          </div>
        </div>

        <div className="text-center px-4">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <p className="text-gray-400 text-sm">3D Scene View Placeholder</p>
          <p className="text-gray-500 text-xs mt-2">Ready for 3D content</p>
        </div>
      </div>
    </section>
  );
};

export default SceneViewRoomPage;
