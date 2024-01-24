import { VideoCard } from "@/lib/shared/Cards";
import { YouTubeVideo } from "../hooks/useYouTubeSubscribedVideos";

const YouTubeVideoCard = ({ video }: { video: YouTubeVideo }) => {
  return (
    <VideoCard>
      <a href={`https://youtube.com/watch?v=${video.contentDetails.videoId}`}>
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          className="cursor-pointer"
        />
      </a>
      <a
        href={`https://youtube.com/channel/${video.snippet.channelTitle}`}
        className="text-primary"
      >
        {video.snippet.channelTitle}
      </a>
      <div className="h-10">
        <p className="line-clamp-2">{video.snippet.title}</p>
      </div>
    </VideoCard>
  );
};

export default YouTubeVideoCard;
