import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/root-layout";
import Auth from "./pages/auth/auth";
import PrivateRoute from "./private/private-route";
import Dashboard from "./pages/dashboard/dashboard";
import { useEffect } from "react";
import { authService } from "./services/auth.service";
import { useUserStore } from "./store/user/user.store";
import Apartments from "./pages/apartments/apartments";
import Citizens from "./pages/citizens/citizens";
import ServicesPage from "./pages/services/services";

export default function App() {
  const { login, logout } = useUserStore();

  useEffect(() => {
    (async () => {
      try {
        const data = await authService.findMe();
        login(data.user);
      } catch (error) {
        console.error(error);
        logout();
      }
    })();
  }, [login, logout]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <p>Error page</p>,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute roles={["inspector"]}>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/apartments",
          element: (
            <PrivateRoute roles={["inspector"]}>
              <Apartments />
            </PrivateRoute>
          ),
        },
        {
          path: "/citizens",
          element: (
            <PrivateRoute roles={["inspector"]}>
              <Citizens />
            </PrivateRoute>
          ),
        },
        {
          path: "/services",
          element: (
            <PrivateRoute roles={["inspector"]}>
              <ServicesPage />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Auth />,
    },
  ]);
  return <RouterProvider router={router} />;
}
