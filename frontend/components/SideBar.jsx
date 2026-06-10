import React from "react";
import { useScene } from "../context/SceneContext";
import SceneObjectsList from "./dashboard/SceneObjectsList";
import SelectedObjectPositionDetailsOfSideBar from "./dashboard/SelectedObjectPositionDetailsOfSideBar";

const SideBar = () => {
  const { objects, selectedObjectId, setSelectedObjectId } = useScene();

  return (
    <aside className="w-60 bg-[#070709] border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
      <SceneObjectsList
        objects={objects}
        selectedId={selectedObjectId}
        onSelect={setSelectedObjectId}
      />
      <SelectedObjectPositionDetailsOfSideBar
        objects={objects}
        selectedId={selectedObjectId}
      />
    </aside>
  );
};

export default SideBar;