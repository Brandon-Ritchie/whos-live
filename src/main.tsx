import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./lib/shared/PageLayout.tsx";
import Root from "./lib/pages/Root.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OAuthTwitch from "./lib/twitch/components/OAuthTwitch.tsx";
import OAuthYouTube from "./lib/youtube/components/OAuthYouTube.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/oauth/twitch",
        element: <OAuthTwitch />,
      },
      {
        path: "/oauth/youtube",
        element: <OAuthYouTube />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
