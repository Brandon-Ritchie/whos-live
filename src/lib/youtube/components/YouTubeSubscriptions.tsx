import { useContext } from "react";
import { YouTubeAccessTokenContext } from "../contexts/YouTubeAccessTokenContext";
import { useYouTubeSubscribedVideos } from "../hooks/useYouTubeSubscribedVideos";
import { useYouTubeSubscriptions } from "../hooks/useYouTubeSubscriptions";
import YouTubeVideoCard from "./YouTubeVideoCard";

export default function YouTubeSubscriptions({
  youtubeAccessToken,
}: {
  youtubeAccessToken: string;
}) {
  const [, setTwitchAccessToken] = useContext(YouTubeAccessTokenContext);
  const [YouTubeSubscriptions, subscriptionsStatus] = useYouTubeSubscriptions({
    youtubeAccessToken,
  });

  if (subscriptionsStatus === "error") {
    setTwitchAccessToken(null);
    localStorage.removeItem("youtubeAccessToken");
  }

  const [subscribedVideos, subscribedVideosStatus] = useYouTubeSubscribedVideos(
    youtubeAccessToken,
    YouTubeSubscriptions?.map((channel) => channel.resourceId.channelId) ?? [],
  );

  return (
    <div className="flex justify-center">
      <div className="cards-container">
        {subscribedVideosStatus === "pending" && <p>Loading...</p>}
        {subscribedVideos &&
          subscribedVideos.map((video) => (
            <YouTubeVideoCard key={video.id} video={video} />
          ))}
      </div>
    </div>
  );
}
