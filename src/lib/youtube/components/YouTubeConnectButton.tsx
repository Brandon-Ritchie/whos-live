import { youtubeClientId } from "../../utils/constants";

export default function YouTubeConnectButton() {
  const youtubeRedirectUri: unknown = import.meta.env.VITE_YOUTUBE_REDIRECT_URI;
  const youtubeScopes = "https://www.googleapis.com/auth/youtube.readonly";

  if (typeof youtubeRedirectUri !== "string") {
    console.error("Missing VITE_YOUTUBE_REDIRECT_URI environment variable");
    return (
      <div className="alert-danger alert">
        <p>Some environment variables seems to be missing</p>
      </div>
    );
  }

  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${youtubeClientId}&redirect_uri=${youtubeRedirectUri}&response_type=token&scope=${youtubeScopes}`}
      className="btn btn-primary"
    >
      Link your YouTube account
    </a>
  );
}
