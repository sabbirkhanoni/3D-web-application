import Loading from "../pages/LoadingPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { useAuth } from "../context/AuthContext";

const ProtectRoute = ({ children }) => {
  const { loading, isAuth } = useAuth();

  if (loading) return <Loading />;

  return isAuth ? children : <UnauthorizedPage />;
};

export default ProtectRoute;