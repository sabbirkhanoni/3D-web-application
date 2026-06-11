
import React from "react";
import { useScene } from "../../context/SceneContext";

const OBJECT_ICONS = {
  box: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        d="M21 8l-9-5-9 5m18 0v8l-9 5m-9-5V8m9 5v8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  ),
  sphere: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="5" ry="9" />
    </svg>
  ),
  glb: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5zm0 10l-10-5v7l10 5 10-5v-7l-10 5z"
        strokeLinejoin="round"
      />
    </svg>
  ),
};


const SceneSelectedObjectOfSideBar = ({ object, isSelected, onSelect }) => {
  const { deleteObject } = useScene();
  const icon = OBJECT_ICONS[object.type] || OBJECT_ICONS.box;

  return (
    <li
      onClick={onSelect}
      className={`
        flex items-center justify-between px-2.5 py-2 cursor-pointer gap-2.5
        border transition-all duration-150
        ${
          isSelected
            ? "bg-violet-500/15 border-violet-400/35"
            : "bg-transparent hover:bg-white/10 hover:rounded-lg border-white/10"
        }
      `}
    >
      {/* Icon badge */}
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className={`
          w-7 h-7 flex items-center justify-center rounded-md shrink-0 border
          ${
            isSelected
              ? "bg-violet-500/25 border-violet-400/40 text-violet-300"
              : "bg-white/5 border-white/10 text-gray-400"
          }
        `}
        >
          {icon}
        </span>

        <div className="min-w-0">
          <p
            className={`text-[13px] font-medium truncate ${isSelected ? "text-violet-200" : "text-white"}`}
          >
            {object.name || object.type}
          </p>
          <p
            className={`text-[11px] truncate ${isSelected ? "text-violet-400/70" : "text-gray-500"}`}
          >
            {object.type} · ({object.position.x.toFixed(1)},{" "}
            {object.position.y.toFixed(1)}, {object.position.z.toFixed(1)})
          </p>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteObject(object.id);
        }}
        className={`
          w-[30px] h-[30px] cursor-pointer flex items-center justify-center rounded-md shrink-0
          transition-all duration-150
        bg-red-500/10 text-white border border-red-400
          ${isSelected ? "text-violet-400/50" : "text-gray-600"}
        `}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        </svg>
      </button>
    </li>
  );
};

export default SceneSelectedObjectOfSideBar;
