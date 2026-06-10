import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../pages/LoadingPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { useAuth } from "../context/AuthContext";

const ProtectRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { setUser } = useAuth();

  const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`,
          { withCredentials: true }
        );
        console.log("Auth check response:", response.data);
        setUser(response.data.user);
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
  if (loading) return <Loading />;

  return isAuth ? children : <UnauthorizedPage />;
};

export default ProtectRoute;