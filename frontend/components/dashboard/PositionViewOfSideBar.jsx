import React from "react";

const PositionViewOfSideBar = ({ axis, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs font-mono font-semibold text-white w-4">{axis}</span>
    <label
        className="
        flex-1 bg-white/5 border border-white/10 hover:border-white/20 focus:border-violet-500
        rounded-md px-3 py-1.5 text-sm text-white/80 font-mono
        outline-none transition-colors duration-150
      "
    >
      {value}
    </label>
  </div>
);

export default PositionViewOfSideBar;
