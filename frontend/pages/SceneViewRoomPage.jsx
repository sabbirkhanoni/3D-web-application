import React, { useState, useEffect, useRef } from "react";
import AddObjectDialogBox from "../components/dashboard/AddObjectDialogBox";
import toast from "react-hot-toast";
import SceneRoom from "../components/scene/SceneRoom";
import axios from "axios";

const SceneViewRoomPage = () => {
  const [openAddObjectDialogBox, setOpenAddObjectDialogBox] = useState(false);
  const [objects, setObjects] = useState([]);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingScene, setIsLoadingScene] = useState(false);
  const objectsRef = useRef([]);

  const loadSavedScene = async () => {
    try {
      setIsLoadingScene(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/scene`,
        { withCredentials: true },
      );

      if (response.data.success) {
        setObjects(response.data.data.objects);
        objectsRef.current = response.data.data.objects;
        toast.success("Scene loaded successfully!");
      }
    } catch (error) {
      console.error("Error loading scene:", error);
    } finally {
      setIsLoadingScene(false);
    }
  };

  useEffect(() => {
    loadSavedScene();
  }, []);

  // This is Call back function to update object position in state
  const handleUpdateObjectPosition = (objectId, newPosition) => {
    setObjects((prev) => {
      const updated = prev.map((obj) =>
        obj.id === objectId ? { ...obj, position: newPosition } : obj,
      );

      objectsRef.current = updated;
      return updated;
    });
  };


  const handleOnSaveScene = async () => {
    try {
      if (objectsRef.current.length === 0) {
        toast.error("Please add at least one object to save the scene.");
        return;
      }

      setLoading(true);

      const cleanObjects = objectsRef.current.map((obj) => ({
        id: obj.id,
        type: obj.type,
        position: {
          x: obj.position.x,
          y: obj.position.y,
          z: obj.position.z,
        },
      }));

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/scene`,
        {
          objects: cleanObjects,
        },
        { withCredentials: true },
      );

      if (response.data.success) {
        toast.success("Scene saved successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save scene");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteObject = (objectId) => {
  if (!objectId) {
    toast.error("Select an object first");
    return;
  }

  setObjects((prev) => {
    const updated = prev.filter((obj) => obj.id !== objectId);
    objectsRef.current = updated; // 🔥 এইটা missing ছিল
    return updated;
  });

  setSelectedObjectId(null);
  toast.success("Object deleted successfully!");
};

  return (
    <section className="h-full w-full overflow-hidden flex flex-col bg-[#0d0e24]">
      <div className="relative flex-1 w-full bg-gray-800/30 flex items-center justify-center overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          {openAddObjectDialogBox && (
            <div className="absolute top-0 right-full mr-3">
              <AddObjectDialogBox
                onClose={() => setOpenAddObjectDialogBox(false)}
                onAddObject={(type) => {
                  setObjects((prev) => [
                    ...prev,
                    {
                      id: `${type}_${Date.now()}`,
                      type,
                      position: {
                        x: Math.round(Math.random() * 20 - 10), // Randomly added position for new object
                        y: 0,
                        z: Math.round(Math.random() * 20 - 10), //Randomly added position for new object
                      },
                    },
                  ]);
                  setOpenAddObjectDialogBox(false);
                }}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              className="bg-blue-500 cursor-pointer flex items-center justify-center gap-2 border border-blue-600 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              onClick={() => setOpenAddObjectDialogBox(!openAddObjectDialogBox)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d="M12 4v16m8-8H4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add Object ({objects.length})
            </button>

            <button
              onClick={() => handleDeleteObject(selectedObjectId)}
              className={`
                flex items-center justify-center gap-2
                text-sm font-medium rounded-lg py-2 px-3
                transition-all duration-200
                ${
                  selectedObjectId
                    ? "bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 cursor-pointer"
                    : "bg-red-500/5 border border-red-500/20 text-red-300 cursor-not-allowed opacity-50"
                }
              `}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Delete Object
            </button>

            <button
              className={`
                flex items-center gap-1 justify-center
                border font-semibold rounded-md py-2 px-4 text-sm
                transition-all duration-200
                ${
                  loading
                    ? "bg-gray-500/50 border-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-green-500/10 border-green-600 cursor-pointer hover:bg-green-600/20 text-white"
                }
              `}
              onClick={() => handleOnSaveScene()}
              disabled={loading}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="absolute inset-0">
          <SceneRoom
            objects={objects}
            onUpdateObjectPosition={handleUpdateObjectPosition}
            onSelectObject={setSelectedObjectId} 
          />
        </div>
      </div>
    </section>
  );
};

export default SceneViewRoomPage;
