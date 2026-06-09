import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const TopBar = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
          <div className="flex items-center gap-2 mr-5">
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-semibold uppercase select-none border-3 border-white">
              {"AC"}
            </div>
            <span className="text-white text-xs font-medium">User</span>
          </div>

          <button
            onClick={handleLogout}
            className="    bg-red-300 hover:bg-red-500 hover:text-white border border-red-500/30 hover:border-red-500/50
                           text-red-900 text-sm font-medium rounded-lg p-2 transition-all duration-600 cursor-pointer"
          >
            Sign out
            <RiLogoutCircleRFill className="inline-block ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
