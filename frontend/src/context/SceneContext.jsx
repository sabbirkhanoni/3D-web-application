import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRef } from "react";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [objects, setObjects] = useState([]);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [isLoadingScene, setIsLoadingScene] = useState(false);
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

  const deleteObject = (objectId) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== objectId));
    if (selectedObjectId === objectId) setSelectedObjectId(null);
  };

  return (
    <SceneContext.Provider
      value={{
        objects,
        setObjects,
        selectedObjectId,
        setSelectedObjectId,
        deleteObject,
        fetchSavedScene,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => useContext(SceneContext);
