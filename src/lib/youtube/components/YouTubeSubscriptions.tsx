import { useYouTubeSubscribedVideos } from "../hooks/useYouTubeSubscribedVideos";
import { useYouTubeSubscriptions } from "../hooks/useYouTubeSubscriptions";
import YouTubeVideoCard from "./YouTubeVideoCard";

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

  const [subscribedVideos, subscribedVideosStatus] = useYouTubeSubscribedVideos(
    youtubeAccessToken,
    YouTubeSubscriptions?.map((channel) => channel.resourceId.channelId) ?? [],
  );

  return (
    <div className="m-auto flex flex-wrap justify-between gap-4">
      {subscribedVideosStatus === "pending" && <p>Loading...</p>}
      {subscribedVideos &&
        subscribedVideos.map((video) => (
          <YouTubeVideoCard key={video.id} video={video} />
        ))}
    </div>
  );
}
