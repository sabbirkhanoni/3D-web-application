import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../pages/LoadingPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";

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
  if (loading) return <Loading />;

  return isAuth ? children : <UnauthorizedPage />;
};

export default ProtectRoute;