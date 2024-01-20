export type UseTwitchUserParams = {
  twitchClientId: string;
  twitchAccessToken: string;
};

export type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: "staff" | "admin" | "global_mod" | "";
  broadcaster_type: "affiliate" | "partner" | "";
  description: string;
  profile_image_url: string;
  offline_image_url: string;
};

export default async function useTwitchUser({
  twitchClientId,
  twitchAccessToken,
}: UseTwitchUserParams): Promise<TwitchUser> {
  const res = await fetch(`https://api.twitch.tv/helix/users`, {
    headers: {
      "Client-ID": twitchClientId,
      Authorization: `Bearer ${twitchAccessToken}`,
    },
  });
  const json = await res.json();
  return json.data[0];
}
