import { useState } from "react";
import { YouTubeAccessTokenContext } from "../contexts/YouTubeAccessTokenContext";
import YouTubeConnectButton from "./YouTubeConnectButton";
import YouTubeSubscriptions from "./YouTubeSubscriptions";

export default function YouTube() {
  const [youtubeAccessToken, setTwitchAccessToken] = useState<string | null>(
    null,
  );

  const accessTokenFromStorage = localStorage.getItem("youtubeAccessToken");
  if (accessTokenFromStorage && !youtubeAccessToken)
    setTwitchAccessToken(accessTokenFromStorage);

  return (
    <YouTubeAccessTokenContext.Provider
      value={[youtubeAccessToken, setTwitchAccessToken]}
    >
      <h1>YouTube</h1>
      {!youtubeAccessToken ? (
        <YouTubeConnectButton />
      ) : (
        <YouTubeSubscriptions />
      )}
    </YouTubeAccessTokenContext.Provider>
  );
}
