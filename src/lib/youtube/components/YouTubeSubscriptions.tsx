import { useYouTubeSubscribedVideos } from "../hooks/useYouTubeSubscribedVideos";
import { useYouTubeSubscriptions } from "../hooks/useYouTubeSubscriptions";

export default function YouTubeSubscriptions({
  youtubeAccessToken,
}: {
  youtubeAccessToken: string;
}) {
  const [YouTubeSubscriptions, subscriptionsStatus] = useYouTubeSubscriptions({
    youtubeAccessToken,
  });

  if (subscriptionsStatus === "error") {
    // TODO definitely need to move this to context
    localStorage.removeItem("youtubeAccessToken");
  }

  const [subscribedVideos] = useYouTubeSubscribedVideos(
    youtubeAccessToken,
    YouTubeSubscriptions?.map((channel) => channel.resourceId.channelId) ?? [],
  );

  return (
    <div className="flex w-full gap-4">
      {subscribedVideos &&
        subscribedVideos.map((video) => (
          <div key={video.id}>
            <a
              href={`https://www.youtube.com/watch?v=${video.contentDetails.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
              />
            </a>
            <p>{video.snippet.channelTitle}</p>
          </div>
        ))}
    </div>
  );
}
