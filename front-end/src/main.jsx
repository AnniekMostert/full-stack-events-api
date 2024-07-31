import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { AddEvent, loader as addEventLoader } from "./pages/AddEvent";
import { inputTheme } from "./theming/inputTheme";
import { buttonTheme } from "./theming/buttonTheme";
import { checkboxTheme } from "./theming/checkboxTheme";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    console.log("This is handleLogin");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        fetch(`http://localhost:3000/users/${decodedToken.userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("User data in main: ", data);
            setUser(data);
          })
          .catch((err) => {
            console.error("Error fetching user data:", err);
            localStorage.removeItem("token");
          });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} onLogin={handleLogin} />,
      children: [
        {
          path: "/",
          element: <EventsPage />,
          loader: eventsLoader,
        },
        {
          path: "/event/:eventId",
          element: <EventPage user={user} />,
          loader: eventLoader,
        },
        {
          path: "/add-event",
          element: (
            <ProtectedRoute user={user}>
              <AddEvent user={user} />
            </ProtectedRoute>
          ),
          loader: addEventLoader,
        },
        {
          path: "/login",
          element: <Login onLogin={handleLogin} />,
        },
        {
          path: "/logout",
          element: <Logout setUser={setUser} />,
        },
      ],
    },
  ]);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          color: "red.700",
          width: "100%",
        },
      },
    },
    components: {
      Input: inputTheme,
      Button: buttonTheme,
      Checkbox: checkboxTheme,
    },
  });
  
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
