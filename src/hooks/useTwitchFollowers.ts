export default async function useTwitchFollowers({
  twitchClientId,
  twitchAccessToken,
  twitchUserId,
}: {
  twitchClientId: string;
  twitchAccessToken: string;
  twitchUserId: string;
}) {
  const res = await fetch(
    `https://api.twitch.tv/helix/streams/followed?user_id=${twitchUserId}`,
    {
      headers: {
        "Client-ID": twitchClientId,
        Authorization: `Bearer ${twitchAccessToken}`,
      },
    },
  );
  const json = await res.json();
  return json.data;
}
