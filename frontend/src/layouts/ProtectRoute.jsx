import Loading from "../pages/LoadingPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectRoute = ({ children }) => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          { withCredentials: true },
        );
  
        setUser(response.data.user);
        console.log("User data from ProtectRoute:", response.data.user);
        setIsAuth(true);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };


    useEffect(() => {
      checkAuth();
    }, []);

  if (loading) return <Loading />;

  return isAuth ? children : <UnauthorizedPage />;
};

export default ProtectRoute;