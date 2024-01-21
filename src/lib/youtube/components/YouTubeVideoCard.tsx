import Card from "../../shared/Card";
import { YouTubeVideo } from "../hooks/useYouTubeSubscribedVideos";

const YouTubeVideoCard = ({ video }: { video: YouTubeVideo }) => {
  return (
    <Card>
      <div className="max-w-96 flex-1">
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
        <p>{video.snippet.title}</p>
        <p className="mt-2 line-clamp-3">{video.snippet.description}</p>
      </div>
    </Card>
  );
};

export default YouTubeVideoCard;
