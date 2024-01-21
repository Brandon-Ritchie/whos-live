import { youtubeClientId } from "../../utils/constants";
import { QueryFunction, QueryStatus, useQuery } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";

const SnippetSchema = z.object({
  channelId: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  title: z.string(),
  resourceId: z.object({
    kind: z.string(),
    channelId: z.string(),
  }),
  thumbnails: z.object({
    default: z.object({
      url: z.string(),
    }),
    medium: z.object({
      url: z.string(),
    }),
    high: z.object({
      url: z.string(),
    }),
  }),
});
export type SubscriberSnippet = z.infer<typeof SnippetSchema>;

const JsonReturnSchema = z.object({
  etag: z.string(),
  items: z.array(
    z.object({
      kind: z.string(),
      etag: z.string(),
      id: z.string(),
      snippet: SnippetSchema,
    }),
  ),
  kind: z.string(),
  nextPageToken: z.string().optional(),
  prevPageToken: z.string().optional(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
});

const fetchYouTubeSubscriptions: QueryFunction<
  SubscriberSnippet[],
  [
    "youtube-subscriptions",
    {
      youtubeAccessToken: string;
    },
  ]
> = async ({ queryKey }) => {
  const { youtubeAccessToken } = queryKey[1];

  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/subscriptions?" +
      `key=${youtubeClientId}&` +
      `part=snippet&` +
      `mine=true&` +
      `maxResults=25&` +
      "order=unread",
    {
      headers: {
        Authorization: `Bearer ${youtubeAccessToken}`,
      },
    },
  );

  return JsonReturnSchema.parse(res.data).items.map((item) => item.snippet);
};

export const useYouTubeSubscriptions = (params: {
  youtubeAccessToken: string;
}): [SubscriberSnippet[] | undefined, QueryStatus] => {
  const results = useQuery({
    queryKey: ["youtube-subscriptions", params],
    queryFn: fetchYouTubeSubscriptions,
    staleTime: 1000 * 60 * 60,
  });

  return [results.data, results.status];
};
