import Card from "@/lib/shared/Card";
import { YouTubeVideo } from "../hooks/useYouTubeSubscribedVideos";

const YouTubeVideoCard = ({ video }: { video: YouTubeVideo }) => {
  return (
    <Card>
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
        <p>{video.snippet.title}</p>
      </div>
    </Card>
  );
};

export default YouTubeVideoCard;
