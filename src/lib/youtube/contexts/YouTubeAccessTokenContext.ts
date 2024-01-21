import { createContext } from "react";

export const YouTubeAccessTokenContext = createContext<
  [string | null, (twitchAccessToken: string | null) => void]
>([localStorage.getItem("youtubeAccessToken") ?? null, () => ({})]);
