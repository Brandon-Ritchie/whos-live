import { twitchClientId } from "@/lib/utils/constants";

const TwitchConnectButton = () => {
  const twitchRedirectUri: unknown = import.meta.env.VITE_TWITCH_REDIRECT_URI;
  const twitchScopes = "user:read:follows";

  if (typeof twitchRedirectUri !== "string") {
    console.error("Missing VITE_TWITCH_REDIRECT_URI environment variable");
    return (
      <div className="alert-danger alert">
        <p>Some environment variables seems to be missing</p>
      </div>
    );
  }

  return (
    <a
      href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchClientId}&redirect_uri=${twitchRedirectUri}&scope=${twitchScopes}`}
      className="btn btn-primary"
    >
      Link your Twitch account
    </a>
  );
};

export default TwitchConnectButton;
