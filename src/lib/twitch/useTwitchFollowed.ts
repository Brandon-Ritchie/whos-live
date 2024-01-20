export type TwitchChannel = {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: "" | "live";
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tags: string[];
  is_mature: boolean;
};

export default async ({
  twitchClientId,
  twitchAccessToken,
  twitchUserId,
}: {
  twitchClientId: string;
  twitchAccessToken: string;
  twitchUserId: string;
}): Promise<TwitchChannel[]> => {
  // TODO add Zod validation
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
};
