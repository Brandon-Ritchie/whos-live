import { youtubeClientId, youtubeOAuthEndpoint } from "../../utils/constants";
import { QueryFunction, QueryStatus, useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
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
      youtubeAccessToken: string | null;
      numOfSubscriptions: number;
    },
  ]
> = async ({ queryKey }) => {
  const { youtubeAccessToken, numOfSubscriptions } = queryKey[1];

  console.log(numOfSubscriptions);

  if (youtubeAccessToken === null) {
    throw new Error("No YouTube access token");
  }

  const res = await axios.get(
    "https://www.googleapis.com/youtube/v3/subscriptions?" +
      `key=${youtubeClientId}&` +
      `part=snippet&` +
      `mine=true&` +
      `maxResults=${numOfSubscriptions}&` +
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
  youtubeAccessToken: string | null;
  numOfSubscriptions: number;
}): [SubscriberSnippet[] | undefined, QueryStatus] => {
  const results = useQuery({
    queryKey: ["youtube-subscriptions", params],
    queryFn: fetchYouTubeSubscriptions,
    staleTime: 1000 * 60 * 60,
    retry: (failureCount, error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });

  if (
    results.status === "error" &&
    isAxiosError(results.error) &&
    results.error.response?.status === 401
  ) {
    if (youtubeOAuthEndpoint !== null) {
      window.location.href = youtubeOAuthEndpoint;
    }
  }

  return [results.data, results.status];
};
