import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-[#0a0b1a] overflow-hidden">
      <TopBar />
 
      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <main className="flex-1 overflow-y-auto bg-[#0d0e24]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;