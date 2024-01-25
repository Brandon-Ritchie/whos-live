import { twitchOAuthEndpoint } from "@/lib/utils/constants";

export default function TwitchConnectButton() {
  if (!twitchOAuthEndpoint) {
    console.error("Missing VITE_TWITCH_REDIRECT_URI environment variable");
    return (
      <div className="alert-danger alert">
        <p>Some environment variables seems to be missing</p>
      </div>
    );
  }

  return (
    <a href={twitchOAuthEndpoint} className="btn btn-primary">
      Link your Twitch account
    </a>
  );
}
