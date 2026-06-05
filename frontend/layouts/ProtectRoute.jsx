import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import noAccessImage from "/no-access.jpg";

const ProtectRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`,
          { withCredentials: true }
        );
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        checkAuth();
    }, []);

  if (loading) return <div>Loading...</div>;
  
  return isAuth ? children : (
        <div>
            <div className="text-center bg-red-400/60 py-4 mt-1 text-2xl border-red-800 border-1 text-blue-950 text-md rounded">
                You do not have permission to access this page
            </div>
            <img src={noAccessImage} alt="no-access"
            className="w-96 h-80 object-contain mx-auto mt-4"/>
        </div>
  );
};

export default ProtectRoute;