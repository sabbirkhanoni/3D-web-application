import React from "react";
import SceneObjectsList from "./dashboard/SceneObjectsList";
import SelectedObjectPositionDetailsOfSideBar from "./dashboard/SelectedObjectPositionDetailsOfSideBar";

const SideBar = () => {
  //Demo Data For Testing
  const { objects, selectedId, selectObject } = {
    objects: [
        { id: 1, name: "Box", type: "box", position: { x: 0, y: 1, z: 2 } },
    ],
    selectedId: 1,
    selectObject: (id) => console.log("Select object:", id),
  };

  return (
    <aside className="w-60 bg-[#070709] border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
      <SceneObjectsList objects={objects} selectedId={selectedId} onSelect={selectObject} />
      <SelectedObjectPositionDetailsOfSideBar objects={objects} selectedId={selectedId} />
    </aside>
  );
};

export default SideBar;