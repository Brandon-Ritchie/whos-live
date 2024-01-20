import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./lib/shared-components/PageLayout.tsx";
import Root from "./lib/pages/Root.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
