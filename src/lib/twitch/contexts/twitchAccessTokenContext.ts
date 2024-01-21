import { createContext } from "react";

export const TwitchAccessTokenContext = createContext<
  [string | null, (twitchAccessToken: string | null) => void]
>([localStorage.getItem("twitchAccessToken") ?? null, () => ({})]);
