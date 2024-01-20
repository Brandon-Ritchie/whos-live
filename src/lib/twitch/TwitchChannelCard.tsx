import Card from "../shared-components/Card";
import { remToPixels } from "../utils/remToPixels";
import { TwitchChannel } from "./useTwitchFollowed";

export default ({ channel }: { channel: TwitchChannel }) => {
  const thumbnailWidth = remToPixels(24).toString();
  const thumbnailHeight = remToPixels(12.5).toString();

  return (
    <Card>
      <div className="max-w-96 flex-1">
        <img
          src={channel.thumbnail_url
            .replace("{width}", thumbnailWidth)
            .replace("{height}", thumbnailHeight)}
          alt={channel.user_name}
          className="cursor-pointer"
          onClick={() => window.open(`https://twitch.tv/${channel.user_name}`)}
        />
        <a
          href={`https://twitch.tv/${channel.user_name}`}
          className="text-primary"
        >
          {channel.user_name}
        </a>
        <p>{channel.title}</p>
        <a
          href={`https://www.twitch.tv/directory/category/${channel.game_name}`}
          className="text-secondary"
        >
          {channel.game_name}
        </a>
      </div>
    </Card>
  );
};
