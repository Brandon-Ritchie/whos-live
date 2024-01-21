import { remToPixels } from "@/lib/utils/remToPixels";
import { TwitchChannel } from "../hooks/useTwitchFollowed";
import Card from "@/lib/shared/Card";

const TwitchChannelCard = ({ channel }: { channel: TwitchChannel }) => {
  const thumbnailWidth = remToPixels(24); // rem from max-w-96
  const thumbnailHeight = thumbnailWidth * 0.5625; // 16:9 aspect ratio

  return (
    <Card>
      <a href={`https://twitch.tv/${channel.user_name}`}>
        <img
          src={channel.thumbnail_url
            .replace("{width}", thumbnailWidth.toString())
            .replace("{height}", thumbnailHeight.toString())}
          alt={channel.user_name}
          className="cursor-pointer"
        />
      </a>
      <a
        href={`https://twitch.tv/${channel.user_name}`}
        className="text-primary"
      >
        {channel.user_name}
      </a>
      <p>{channel.title}</p>
      <a
        href={`https://www.twitch.tv/directory/category/${channel.game_name.toLowerCase()}`}
        className="text-secondary"
      >
        {channel.game_name}
      </a>
    </Card>
  );
};

export default TwitchChannelCard;
