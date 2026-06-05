import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          <Link to="/dashboard">Home</Link>
        </nav>
      </aside>

      {/* content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;