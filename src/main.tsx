import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./lib/shared/PageLayout.tsx";
import Root from "./Root.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OAuth from "./lib/shared/OAuth.tsx";
import Profile from "./lib/profile/components/Profile.tsx";
import {
  ProfileSettings,
  ProfileSettingsContext,
  ProfileSettingsSchema,
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
  const [profileSettings, setProfileSettings] =
    useState<ProfileSettings | null>(null);

  const parsedSettings = ProfileSettingsSchema.safeParse(
    JSON.parse(localStorage.getItem("profileSettings") ?? "{}"),
  );

  if (!profileSettings && parsedSettings.success) {
    setProfileSettings(parsedSettings.data);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileSettingsContext.Provider
        value={[profileSettings, setProfileSettings]}
      >
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
        element: <OAuth />,
      },
      {
        path: "/oauth/youtube",
        element: <OAuth />,
      },
      {
        path: "/oauth/twitch/profile",
        element: <OAuth />,
      },
      {
        path: "/oauth/youtube/profile",
        element: <OAuth />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
