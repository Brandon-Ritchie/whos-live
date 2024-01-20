import YouTubeConnectButton from "./YouTubeConnectButton";
import YouTubeSubscriptions from "./YouTubeSubscriptions";

export default function YouTube() {
  const youtubeAccessToken = localStorage.getItem("youtubeAccessToken");

  return (
    <>
      <h1>YouTube</h1>
      {!youtubeAccessToken ? (
        <YouTubeConnectButton />
      ) : (
        <YouTubeSubscriptions youtubeAccessToken={youtubeAccessToken} />
      )}
    </>
  );
}
