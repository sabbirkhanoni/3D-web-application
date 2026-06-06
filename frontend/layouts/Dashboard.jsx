import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import SceneViewRoomPage from "../pages/SceneViewRoomPage";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-[#0a0b1a] overflow-hidden">
      <TopBar />
 
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        
        <main className="flex-1 overflow-y-auto bg-[#0d0e24]">
          <Outlet />
        </main>

        <div className="hidden lg:block w-full bg-[#000000] border-l border-gray-700 overflow-y-auto">
          <SceneViewRoomPage />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;