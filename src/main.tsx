import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./lib/shared/PageLayout.tsx";
import Root from "./lib/pages/Root.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OAuthTwitch from "./lib/twitch/components/OAuthTwitch.tsx";
import OAuthYouTube from "./lib/youtube/components/OAuthYouTube.tsx";
import Profile from "./lib/pages/Profile.tsx";
import {
  ProfileSettings,
  ProfileSettingsContext,
} from "./lib/profile/contexts/ProfileSettingsContext.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const profileState = useState<ProfileSettings | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileSettingsContext.Provider value={profileState}>
        <PageLayout />
      </ProfileSettingsContext.Provider>
    </QueryClientProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
