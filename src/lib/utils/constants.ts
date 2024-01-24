export const twitchClientId = "ifow1k6nszrt10kx88o1osjhddzld7";
export const youtubeClientId =
  "924965003686-p92saq1doq5tmk65lh01qqobbskbu39m.apps.googleusercontent.com";

const youtubeRedirectUri: unknown = import.meta.env.VITE_YOUTUBE_REDIRECT_URI;
const youtubeScopes = "https://www.googleapis.com/auth/youtube.readonly";

export const youtubeOAuthEndpoint =
  typeof youtubeRedirectUri !== "string"
    ? null
    : `https://accounts.google.com/o/oauth2/v2/auth?client_id=${youtubeClientId}&response_type=token&scope=${youtubeScopes}&redirect_uri=${youtubeRedirectUri}`;

const twitchRedirectUri: unknown = import.meta.env.VITE_TWITCH_REDIRECT_URI;
const twitchScopes = "user:read:follows";

export const twitchOAuthEndpoint =
  typeof twitchRedirectUri !== "string"
    ? null
    : `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&response_type=token&scope=${twitchScopes}&redirect_uri=${twitchRedirectUri}`;
