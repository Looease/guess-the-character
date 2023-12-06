import React from "react";
import "./App.css";
import Game from "./pages/Game/Game";
import { Welcome } from "./components/Welcome";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/quiz",
    element: <Game />,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
