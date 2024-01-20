import { youtubeClientId } from "../../utils/constants";
import { QueryFunction, QueryStatus, useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import z from "zod";

const ChannelSnippetSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  contentDetails: z.object({
    relatedPlaylists: z.object({
      uploads: z.string(),
    }),
  }),
});
export type ChannelSnippet = z.infer<typeof ChannelSnippetSchema>;

const ChannelsResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string().optional(),
  prevPageToken: z.string().optional(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
  items: z.array(ChannelSnippetSchema),
});
type ChannelsResponse = z.infer<typeof ChannelsResponseSchema>;

const PlayListItemSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  id: z.string(),
  snippet: z.object({
    publishedAt: z.string(),
    channelId: z.string(),
    title: z.string(),
    description: z.string(),
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
    channelTitle: z.string(),
    playlistId: z.string(),
    resourceId: z.object({
      kind: z.string(),
      videoId: z.string(),
    }),
  }),
  contentDetails: z.object({
    videoId: z.string(),
    startAt: z.string(),
    endAt: z.string(),
    note: z.string(),
    videoPublishedAt: z.string(),
  }),
});
type PlayListItem = z.infer<typeof PlayListItemSchema>;

const PlayListItemsResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string().optional(),
  prevPageToken: z.string().optional(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
  items: z.array(PlayListItemSchema),
});
type PlayListItemsResponse = z.infer<typeof PlayListItemsResponseSchema>;

const fetchYouTubeSubscribedVideos: QueryFunction<
  PlayListItem[],
  [
    "youtube-subscribed-videos",
    {
      youtubeAccessToken: string;
      channelIds: string[];
    },
  ]
> = async ({ queryKey }) => {
  const { youtubeAccessToken, channelIds } = queryKey[1];

  const res = await axios.get<ChannelsResponse[]>(
    "https://www.googleapis.com/youtube/v3/channels?" +
      `key=${youtubeClientId}&` +
      `id=${channelIds.join(",")}&` +
      `part=contentDetails&` +
      `maxResults=50&`,
    {
      headers: {
        Authorization: `Bearer ${youtubeAccessToken}`,
      },
    },
  );

  const parsedResponse = ChannelsResponseSchema.parse(res.data);

  const playlistIds = parsedResponse.items.map(
    (item) => item.contentDetails.relatedPlaylists.uploads,
  );

  const playlistItemPromises: Promise<AxiosResponse<PlayListItemsResponse>>[] =
    [];

  for (const playlistId of playlistIds) {
    const playlistRes = axios.get<PlayListItemsResponse>(
      "https://www.googleapis.com/youtube/v3/playlistItems?" +
        `key=${youtubeClientId}&` +
        `playlistId=${playlistId}&` +
        `part=snippet&` +
        `part=contentDetails&` +
        `maxResults=5&`,
      {
        headers: {
          Authorization: `Bearer ${youtubeAccessToken}`,
        },
      },
    );

    playlistItemPromises.push(playlistRes);
  }

  const playlistItems = await Promise.all(playlistItemPromises);

  const videos = playlistItems.flatMap(
    (playlistItems) => playlistItems.data?.items,
  );

  // sort videos by videoPublishedAt, which exists on the contentDetails object
  // of each video
  videos.sort((a, b) => {
    const aDate = new Date(a?.contentDetails.videoPublishedAt);
    const bDate = new Date(b?.contentDetails.videoPublishedAt);

    return bDate.getTime() - aDate.getTime();
  });

  return videos;
};

export const useYouTubeSubscribedVideos = (
  youtubeAccessToken: string,
  channelIds: string[],
): [PlayListItem[] | undefined, QueryStatus] => {
  const results = useQuery({
    queryKey: ["youtube-subscribed-videos", { youtubeAccessToken, channelIds }],
    queryFn: fetchYouTubeSubscribedVideos,
  });

  if (results.status === "error" && results.error.message === "Unauthorized") {
    localStorage.removeItem("youtubeAccessToken");
  }

  return [results.data, results.status];
};
