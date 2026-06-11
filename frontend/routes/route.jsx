import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ProtectRoute from "../layouts/ProtectRoute";
import Dashboard from "../layouts/Dashboard";
import SceneViewRoomPage from "../pages/SceneViewRoomPage";
import ForgotPasswordPage from "../pages/ForgetPasswordPage";

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
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "dashboard",
        element: (
            <ProtectRoute>
                <Dashboard />
            </ProtectRoute>
        ),
        children: [
          {
            path: "view-room",
            element: <SceneViewRoomPage />,
          },
        ],
      }
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;