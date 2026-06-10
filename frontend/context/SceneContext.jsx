import { createContext, useContext, useState } from "react";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [objects, setObjects] = useState([]);
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  return (
    <SceneContext.Provider value={{ objects, setObjects, selectedObjectId, setSelectedObjectId }}>
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => useContext(SceneContext);