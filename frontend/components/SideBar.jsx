import React from "react";
import SceneObjectsList from "./dashboard/SceneObjectsList";
import SelectedObjectPositionDetailsOfSideBar from "./dashboard/SelectedObjectPositionDetailsOfSideBar";
import { useScene } from "../context/SceneContext";

const SideBar = () => {
  const { objects, selectedId, selectObject } = useScene();

  return (
    <aside className="w-60 bg-[#070709] border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
      <SceneObjectsList
        objects={objects}
        selectedId={selectedId}
        onSelect={selectObject}
      />
      <SelectedObjectPositionDetailsOfSideBar
        objects={objects}
        selectedId={selectedId}
      />
    </aside>
  );
};

export default SideBar;
