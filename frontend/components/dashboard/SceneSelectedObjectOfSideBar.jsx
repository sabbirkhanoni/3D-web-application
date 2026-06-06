const OBJECT_ICONS = {
  box: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path d="M21 8l-9-5-9 5m18 0v8l-9 5m-9-5V8m9 5v8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  sphere: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="5" ry="9" />
    </svg>
  ),
  glb: (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 10l-10-5v7l10 5 10-5v-7l-10 5z" strokeLinejoin="round" />
    </svg>
  ),
};

const SceneSelectedObjectOfSideBar = ({ object, isSelected, onSelect }) => {
  const icon = OBJECT_ICONS[object.type] || OBJECT_ICONS.box;

  return (
    <li>
      <button
        onClick={onSelect}
        className={`
          w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100
          ${isSelected
            ? "bg-violet-600/20 border-l-2 border-violet-500"
            : "border-l-2 border-transparent hover:bg-white/5"
          }
        `}
      >
        {/* Icon container */}
        <span
          className={`
            flex items-center justify-center w-7 h-7 rounded-md shrink-0
            ${isSelected ? "bg-violet-500/30 text-violet-300" : "bg-white/8 text-white"}
          `}
        >
          {icon}
        </span>

        {/* Name + type */}
        <span className="flex flex-col min-w-0">
          <span
            className={`text-sm font-medium ${
              isSelected ? "text-white" : "text-white"
            }`}
          >
            {object.name}
          </span>
          <span className="text-[11px] text-white">
            {object.type}
          </span>
        </span>
      </button>
    </li>
  );
};

export default SceneSelectedObjectOfSideBar;

