import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ProtectRoute from "../layouts/ProtectRoute";
import Dashboard from "../layouts/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: (
            <ProtectRoute>
                <Dashboard />
            </ProtectRoute>
        )
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;