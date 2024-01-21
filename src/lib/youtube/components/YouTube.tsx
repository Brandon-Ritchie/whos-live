import { useContext } from "react";
import { YouTubeAccessTokenContext } from "../contexts/YouTubeAccessTokenContext";
import YouTubeConnectButton from "./YouTubeConnectButton";
import YouTubeSubscriptions from "./YouTubeSubscriptions";

export default function YouTube() {
  const [youtubeAccessToken, setTwitchAccessToken] = useContext(
    YouTubeAccessTokenContext,
  );

  return (
    <YouTubeAccessTokenContext.Provider
      value={[youtubeAccessToken, setTwitchAccessToken]}
    >
      <h1>YouTube</h1>
      {!youtubeAccessToken ? (
        <YouTubeConnectButton />
      ) : (
        <YouTubeSubscriptions youtubeAccessToken={youtubeAccessToken} />
      )}
    </YouTubeAccessTokenContext.Provider>
  );
}
