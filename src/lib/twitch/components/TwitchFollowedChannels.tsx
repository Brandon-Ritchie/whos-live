import useTwitchUser from "../hooks/useTwitchUser";
import { useTwitchFollowed } from "../hooks/useTwitchFollowed";
import TwitchChannelCard from "./TwitchChannelCard";

export default function TwitchFollowedChannels({
  twitchAccessToken,
}: {
  twitchAccessToken: string;
}) {
  const [twitchUser] = useTwitchUser({
    twitchAccessToken,
  });

  return (
    <>
      {!twitchUser ? (
        <div>Loading...</div>
      ) : (
        <ChannelsWrapper
          userId={twitchUser.id}
          twitchAccessToken={twitchAccessToken}
        />
      )}
    </>
  );
}

const ChannelsWrapper = ({
  userId,
  twitchAccessToken,
}: {
  userId: string;
  twitchAccessToken: string;
}) => {
  const [userTwitchFollowed] = useTwitchFollowed({
    twitchAccessToken,
    twitchUserId: userId,
  });

  return (
    <div className="m-auto flex flex-wrap justify-between gap-4">
      {userTwitchFollowed &&
        userTwitchFollowed.map((channel) => (
          <TwitchChannelCard key={channel.id} channel={channel} />
        ))}
    </div>
  );
};
