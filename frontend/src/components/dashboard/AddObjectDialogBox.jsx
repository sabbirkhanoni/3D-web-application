import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { RiCloseCircleFill } from "react-icons/ri";

const AddObjectDialogBox = (props) => {
  const { onClose, onAddObject } = props;
  const [selectedObject, setSelectedObject] = useState("Cube");
  const { user } = useAuth();

  const objects = [
    "Cube",
    "Sphere",
    "Rectangle",
    "Wardrobe",
    "Table",
    "Sofa",
    "Refrigerator",
    "Bed",
  ];

  const handleAddObjectToScene = () => {
    if (selectedObject === "Rectangle" && user.subscriptionStatus !== "premium") {
      toast.error("This object requires a premium subscription.");
      return;
    }
    onAddObject(selectedObject);
    toast.success("Object added to scene successfully!");
    onClose();
  };

  return (
    <div className="w-72 bg-[#16182d] border border-gray-700 rounded-xl shadow-xl p-4">
      <div className="text-white text-lg font-semibold mb-4 flex items-center justify-between">
        <span className="block text-sm text-gray-400 mb-1">Add New Object</span>
        <RiCloseCircleFill
          size={20}
          className="absolute top-5 right-5 text-gray-400 cursor-pointer hover:text-gray-200 transition"
          onClick={onClose}
        />
      </div>

      <div className="space-y-2">
        {objects.map((object) => (
          <label
            key={object}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#22243d] hover:bg-[#2b2e4d] cursor-pointer transition"
          >
            <input
              type="radio"
              name="object"
              value={object}
              checked={selectedObject === object}
              onChange={(e) => setSelectedObject(e.target.value)}
              className="w-4 h-4"
            />
            <span className="text-white font-medium flex items-center gap-2">
              {object}

              {object === "Rectangle" && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md">
                  Premium
                </span>
              )}
            </span>
          </label>
        ))}
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={handleAddObjectToScene}
          className="px-6 py-2 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-lg font-medium transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddObjectDialogBox;
