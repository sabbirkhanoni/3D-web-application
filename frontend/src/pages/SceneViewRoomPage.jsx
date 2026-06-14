import React, { useState, useEffect, useRef } from "react";
import AddObjectDialogBox from "../components/dashboard/AddObjectDialogBox";
import toast from "react-hot-toast";
import SceneRoom from "../components/scene/SceneRoom";
import axios from "axios";
import { useScene } from "../context/SceneContext";
import { useAuth } from "../context/AuthContext";
import AxiosToastError from "../utils/AxiosToastError";
import ConfirmationModal from "../components/ConfirmationModel";

const SceneViewRoomPage = () => {
  const { objects, setObjects, selectedObjectId, setSelectedObjectId } =
    useScene();

  const { user } = useAuth();
  const [openAddObjectDialogBox, setOpenAddObjectDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingScene, setIsLoadingScene] = useState(false);
  const [confirmClearModel, setConfirmClearModel] = useState(false);
  const objectsRef = useRef([]);

  const fetchSavedScene = async () => {
    try {
      setIsLoadingScene(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/scene`,
        { withCredentials: true },
      );

      if (response.data.success) {
        setObjects(response.data.data.objects);
        objectsRef.current = response.data.data.objects;
      }
    } catch (error) {
      console.log("Error fetching saved scene:", error);
    } finally {
      setIsLoadingScene(false);
    }
  };

  const handleOnSubscribe = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscription/initiate`,
        {}, // No body needed for this request, handled entirely on the backend
        { withCredentials: true },
      );

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        window.location.href = response.data.url; // Redirect to the SSLCommerz payment gateway Provider
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchSavedScene();
  }, []);

  const handleOnSaveScene = async () => {
    try {
      if (objectsRef.current.length === 0) {
        toast.error("Please add at least one object to save the scene.");
        return;
      }

      setLoading(true);

      const cleanObjects = objects.map((obj) => ({
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
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <section className="h-full w-full overflow-hidden flex flex-col bg-[#0d0e24]">
      <div className="relative flex-1 w-full bg-gray-800/30 flex items-center justify-center overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          {openAddObjectDialogBox && (
            <div className="absolute top-0 right-full mr-3">
              <AddObjectDialogBox
                onClose={() => setOpenAddObjectDialogBox(false)}
                onAddObject={(type) => {
                  setObjects((prev) => {
                    const newObj = {
                      id: `${type}_${Date.now()}`,
                      type,
                      position: {
                        x: Math.round(Math.random() * 20 - 10),
                        y: 0,
                        z: Math.round(Math.random() * 20 - 10),
                      },
                    };
                    const updated = [...prev, newObj];
                    objectsRef.current = updated;
                    return updated;
                  });
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

            <button
              onClick={() => setConfirmClearModel(true)}
              className={`
                flex items-center justify-center gap-2
                text-sm font-medium rounded-lg py-2 px-3
                transition-all duration-200
               bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 cursor-pointer" 
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
              Clear Scene
            </button>

            <button
              onClick={handleOnSubscribe}
              className={`
                flex items-center justify-center gap-2
                text-sm font-medium rounded-lg py-2 px-3
                transition-all duration-200
              text-white cursor-pointer ${
                user && user.subscriptionStatus === "premium"
                  ? "bg-green-500/50 border-green-600 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600 border-yellow-600"
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v4.764a1 1 0 01-1.447.894L15 12M5 18h8a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {
                user && user.subscriptionStatus === "premium"
                  ? "Already Premium"
                  : "Subscription with 500 BDT"
              }
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

      {confirmClearModel && (
        <ConfirmationModal onClose={() => setConfirmClearModel(false)} />
      )}
    </section>
  );
};

export default SceneViewRoomPage;
