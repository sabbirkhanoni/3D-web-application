import { createContext, useContext, useState } from "react";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [objects, setObjects] = useState([]);
  const [selectedObjectId, setSelectedObjectId] = useState(null);

   const deleteObject = (objectId) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== objectId));
    if (selectedObjectId === objectId) setSelectedObjectId(null);
  };

  return (
    <SceneContext.Provider value={{ objects, setObjects, selectedObjectId, setSelectedObjectId , deleteObject }}>
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => useContext(SceneContext);