import useTwitchUser from "../hooks/useTwitchUser";
import { useTwitchFollowed } from "../hooks/useTwitchFollowed";
import TwitchChannelCard from "./TwitchChannelCard";
import { useContext } from "react";
import { TwitchAccessTokenContext } from "../contexts/twitchAccessTokenContext";

export default function TwitchFollowedChannels({
  twitchAccessToken,
}: {
  twitchAccessToken: string;
}) {
  const [, setTwitchAccessToken] = useContext(TwitchAccessTokenContext);
  const [twitchUser, userStatus] = useTwitchUser({
    twitchAccessToken,
  });

  if (userStatus === "error") {
    localStorage.removeItem("twitchAccessToken");
    setTwitchAccessToken(null);
  }

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
    <div className="grid w-full md:grid-cols-2 lg:grid-cols-3">
      {userTwitchFollowed &&
        userTwitchFollowed.map((channel) => (
          <TwitchChannelCard key={channel.id} channel={channel} />
        ))}
    </div>
  );
};
