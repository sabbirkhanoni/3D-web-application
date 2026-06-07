import React, { useState } from "react";
import AddObjectDialogBox from "../components/dashboard/AddObjectDialogBox";
import toast from "react-hot-toast";

const SceneViewRoomPage = () => {
  const [openAddObjectDialogBox, setOpenAddObjectDialogBox] = useState(null);

  const handleOnSaveScene = () => {
    toast.success("Scene saved successfully!");
  };

  const handleDeleteObject = (objectId) => {
    toast.success("Object deleted successfully!");
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
              className="bg-blue-500 cursor-pointer flex items-center justify-center gap-2 border border-blue-600 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              onClick={() => setOpenAddObjectDialogBox(!openAddObjectDialogBox)}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Add Object
            </button>

            <button
              onClick={() => handleDeleteObject(selectedObjectId)}
                className="
                  flex items-center justify-center gap-2
                  bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50
                  text-red-400 text-sm font-medium rounded-lg py-2 px-3
                  transition-all duration-200 cursor-pointer
                "
              >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Delete Object
            </button>

            <button 
              className="flex items-center gap-1 justify-center bg-green-500/10 border font-semibold border-green-600 cursor-pointer hover:bg-green-600/20 text-white px-4 py-2 rounded-md text-sm"
              onClick={() => handleOnSaveScene()}
            >
              {/* Save icon, not + icon */}
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
