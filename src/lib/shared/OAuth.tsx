import { Navigate } from "react-router-dom";

export default function OAuth() {
  const storageKey = window.location.pathname.includes("youtube")
    ? "youtubeAccessToken"
    : "twitchAccessToken";

  localStorage.setItem(
    storageKey,
    document.location.hash.split("&")[0].split("=")[1],
  );

  if (window.location.pathname.includes("profile"))
    return <Navigate to="/profile" replace={true} />;

  return <Navigate to="/" replace={true} />;
}
