import React from "react";
import { RiLogoutCircleRFill } from "react-icons/ri";

const TopBar = () => {
  const handleLogout = async () => {};

  return (
    <header className="flex items-center justify-between px-5 bg-[#54579d] border-b border-white/10 shrink-0 z-30">
      <div className="flex items-center gap-3">
        <div className="flex items-center cursor-pointer gap-2">
          <img src="/vrsb.png" alt="Logo" className="w-20 h-15" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* User avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-semibold uppercase select-none">
            {"AC"}
          </div>

          <button
            onClick={handleLogout}
            className="text-sm text-black hover:text-black border cursor-pointer border-red-600 hover:border-white/40 rounded-lg px-3 py-1.5 transition-all duration-150 bg-red-200"
          >
            Logout
            <RiLogoutCircleRFill className="inline-block ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
