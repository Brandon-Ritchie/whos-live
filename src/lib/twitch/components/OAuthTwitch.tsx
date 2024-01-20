import { Navigate } from "react-router-dom";

export default function OAuthTwitch() {
  localStorage.setItem(
    "twitchAccessToken",
    document.location.hash.split("&")[0].split("=")[1],
  );

  return <Navigate to="/" replace={true} />;
}
