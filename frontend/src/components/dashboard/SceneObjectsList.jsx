import React from "react";
import SceneSelectedObjectOfSideBar from "./SceneSelectedObjectOfSideBar";

const SceneObjectsList = ({ objects, selectedId, onSelect }) => {
  return (
    <div className="flex flex-col">
      {/* Section header */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white">
          Scene Objects
        </p>
        <p className="text-[11px] text-white mt-0.5">
          {objects.length} object{objects.length !== 1 ? "s" : ""} in scene
        </p>
      </div>

      {/* Selected Each Object */}
      <ul className="mt-1">
        {objects.map((obj) => (
          <SceneSelectedObjectOfSideBar
            key={obj.id}
            object={obj}
            isSelected={obj.id === selectedId}
            onSelect={() => onSelect(obj.id)}
          />
        ))}
      </ul>

      {objects.length === 0 && (
        <p className="px-4 py-3 text-xs text-white italic">
          No objects yet. Click "+ Add Object" to start.
        </p>
      )}
    </div>
  );
};

export default SceneObjectsList;