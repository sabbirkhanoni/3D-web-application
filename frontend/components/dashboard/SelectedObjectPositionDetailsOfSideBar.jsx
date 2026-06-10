import React from "react";
import PositionViewOfSideBar from "./PositionViewOfSideBar";   

const SelectedObjectPositionDetailsOfSideBar = (props) => {

  const { objects, selectedId } = props;

  const selected = objects.find((o) => o.id === selectedId);
  if (!selected) return null;

  return (
    <div className="mt-auto border-t border-white/10 px-4 py-4 flex flex-col gap-4">
      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white">
        Selected Object
      </p>

      <h2 className="text-white font-semibold text-base -mt-2">{selected.name}</h2>

      {/* XYZ position */}
      <div className="flex  flex-col gap-2">
        {["x", "y", "z"].map((axis) => (
          <PositionViewOfSideBar
            key={axis}
            axis={axis.toUpperCase()}
            value={selected.position?.[axis] ?? 0}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectedObjectPositionDetailsOfSideBar;
