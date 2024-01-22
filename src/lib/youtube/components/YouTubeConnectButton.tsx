import { youtubeOAuthEndpoint } from "@/lib/utils/constants";

export default function YouTubeConnectButton() {
  if (!youtubeOAuthEndpoint) {
    console.error("Missing VITE_YOUTUBE_REDIRECT_URI environment variable");
    return (
      <div className="alert-danger alert">
        <p>Some environment variables seems to be missing</p>
      </div>
    );
  }

  return (
    <a href={youtubeOAuthEndpoint} className="btn btn-primary">
      Link your YouTube account
    </a>
  );
}
