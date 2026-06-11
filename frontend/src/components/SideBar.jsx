import React from "react";
import { useScene } from "../context/SceneContext";
import SceneObjectsList from "./dashboard/SceneObjectsList";
import SelectedObjectPositionDetailsOfSideBar from "./dashboard/SelectedObjectPositionDetailsOfSideBar";

const SideBar = () => {
  const { objects, selectedObjectId, setSelectedObjectId } = useScene();

  return (
    <aside className="w-60 bg-[#070709] border-r border-white/[0.07] flex flex-col shrink-0">

      {/* Header */}
      <div className="px-3 pt-3 pb-1.5 border-b border-white/[0.06]">
        <p className="text-[11px] font-medium text-white/30 tracking-widest uppercase">
          Scene objects
        </p>
      </div>

      {/* Objects list */}
      <div className="flex-1 overflow-y-auto px-2 py-1.5 flex flex-col gap-0.5">
        <SceneObjectsList
          objects={objects}
          selectedId={selectedObjectId}
          onSelect={setSelectedObjectId}
        />
      </div>

      {/* Bottom panel */}
      <div className="border-t border-white/[0.07] p-3">
        {selectedObjectId ? (
          <>
            <p className="text-[11px] font-medium text-white/30 tracking-widest uppercase mb-2.5">
              Transform
            </p>
            <SelectedObjectPositionDetailsOfSideBar
              objects={objects}
              selectedId={selectedObjectId}
            />
          </>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2.5">
            <div className="w-2 h-2 rounded-full bg-white" />
            <p className="text-[11px] text-white/25 italic">No object selected</p>
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        )}
      </div>

    </aside>
  );
};

export default SideBar;
