export default () => {
  const twitchClientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
  const twitchRedirectUri = import.meta.env.VITE_TWITCH_REDIRECT_URI;
  const twitchScopes = "user:read:follows";

  return (
    <a
      href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${twitchClientId}&redirect_uri=${twitchRedirectUri}&scope=${twitchScopes}`}
      className="btn btn-primary"
    >
      Link your Twitch account
    </a>
  );
};
