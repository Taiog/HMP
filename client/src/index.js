import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import About from "./Components/pages/About";
import Leaderboard from "./Components/pages/Leaderboard";
import Contact from "./Components/pages/Contact";
import Principal from "./Components/pages/Principal";
import { GameProvider } from "./context/game";
import { UserProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Principal />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <UserProvider>
      <GameProvider>
        <RouterProvider router={router} />
      </GameProvider>
    </UserProvider>
  </React.StrictMode>
);
