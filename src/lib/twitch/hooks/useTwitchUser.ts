import { twitchClientId } from "../../utils/constants";
import { QueryStatus, useQuery, QueryFunction } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

export const TwitchUserSchema = z.object({
  id: z.string(),
  login: z.string(),
  display_name: z.string(),
  type: z.union([
    z.literal("staff"),
    z.literal("admin"),
    z.literal("global_mod"),
    z.literal(""),
  ]),
  broadcaster_type: z.union([
    z.literal("affiliate"),
    z.literal("partner"),
    z.literal(""),
  ]),
  description: z.string(),
  profile_image_url: z.string(),
  offline_image_url: z.string(),
});
export type TwitchUser = z.infer<typeof TwitchUserSchema>;

export type UseTwitchUserParams = {
  twitchAccessToken: string;
};

const fetchTwitchUser: QueryFunction<
  TwitchUser,
  ["user", UseTwitchUserParams]
> = async ({ queryKey }) => {
  const { twitchAccessToken } = queryKey[1];
  const res = await axios.get<{ data: TwitchUser[] }>(
    `https://api.twitch.tv/helix/users`,
    {
      headers: {
        "Client-ID": twitchClientId,
        Authorization: `Bearer ${twitchAccessToken}`,
      },
    },
  );

  return TwitchUserSchema.parse(res.data.data[0]);
};

export default function useTwitchUser(
  params: UseTwitchUserParams,
): [TwitchUser | undefined, QueryStatus] {
  const results = useQuery({
    queryKey: ["user", params],
    queryFn: fetchTwitchUser,
  });

  return [results?.data, results.status];
}
