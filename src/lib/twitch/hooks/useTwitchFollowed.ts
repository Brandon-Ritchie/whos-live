import { twitchClientId } from "../../utils/constants";
import { QueryFunction, QueryStatus, useQuery } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";

const TwitchChannelSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_login: z.string(),
  user_name: z.string(),
  game_id: z.string(),
  game_name: z.string(),
  type: z.union([z.literal(""), z.literal("live")]),
  title: z.string(),
  viewer_count: z.number(),
  started_at: z.string(),
  language: z.string(),
  thumbnail_url: z.string(),
  tags: z.array(z.string()),
  is_mature: z.boolean(),
});
export type TwitchChannel = z.infer<typeof TwitchChannelSchema>;

const JsonReturnSchema = z.object({
  data: z.array(TwitchChannelSchema),
  pagination: z.object({
    cursor: z.string().optional(),
  }),
});
export type JsonReturn = z.infer<typeof JsonReturnSchema>;

export type UseTwitchFollowedParams = {
  twitchAccessToken: string;
  twitchUserId: string;
};

const fetchTwitchFollowed: QueryFunction<
  TwitchChannel[],
  ["followed", UseTwitchFollowedParams]
> = async ({ queryKey }) => {
  const { twitchAccessToken, twitchUserId } = queryKey[1];
  const res = await axios.get<JsonReturn>(
    `https://api.twitch.tv/helix/streams/followed?user_id=${twitchUserId}`,
    {
      headers: {
        "Client-ID": twitchClientId,
        Authorization: `Bearer ${twitchAccessToken}`,
      },
    },
  );

  return z.array(TwitchChannelSchema).parse(res.data.data);
};

export const useTwitchFollowed = (
  params: UseTwitchFollowedParams,
): [TwitchChannel[] | undefined, QueryStatus] => {
  const results = useQuery({
    queryKey: ["followed", params],
    queryFn: fetchTwitchFollowed,
  });

  return [results?.data, results.status];
};
