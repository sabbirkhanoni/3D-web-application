import React from "react";
import PositionViewOfSideBar from "./PositionViewOfSideBar";   

const SelectedObjectPositionDetailsOfSideBar = (props) => {

  const { objects, selectedId, deleteObject } = props;

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

      
      <button
        onClick={() => deleteObject(selected.id)}
        className="
          w-full flex items-center justify-center gap-2
          bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50
          text-red-400 text-sm font-medium rounded-lg py-2
          transition-all duration-150 cursor-pointer
        "
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Delete Object
      </button>
    </div>
  );
};

export default SelectedObjectPositionDetailsOfSideBar;
