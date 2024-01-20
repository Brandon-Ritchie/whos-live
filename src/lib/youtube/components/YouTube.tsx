import YouTubeConnectButton from "./YouTubeConnectButton";

export default function YouTube() {
  const youtubeAccessToken = localStorage.getItem("youtubeAccessToken");

  return (
    <>
      <h1>YouTube</h1>
      {!youtubeAccessToken ? (
        <YouTubeConnectButton />
      ) : (
        <p>We got you connected!</p>
      )}
    </>
  );
}
