export default async function useTwitchUser({
  twitchClientId,
  twitchAccessToken,
}: {
  twitchClientId: string;
  twitchAccessToken: string;
}) {
  const res = await fetch(`https://api.twitch.tv/helix/users`, {
    headers: {
      "Client-ID": twitchClientId,
      Authorization: `Bearer ${twitchAccessToken}`,
    },
  });
  const json = await res.json();
  return json.data[0];
}
