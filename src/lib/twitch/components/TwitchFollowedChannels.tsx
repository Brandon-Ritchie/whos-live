import useTwitchUser from "../hooks/useTwitchUser";
import { useTwitchFollowed } from "../hooks/useTwitchFollowed";
import TwitchChannelCard from "./TwitchChannelCard";
import { useContext } from "react";
import { TwitchAccessTokenContext } from "../TwitchAccessTokenContext";

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
    <div className="flex justify-center">
      <div className="cards-container">
        {userTwitchFollowed &&
          userTwitchFollowed.map((channel) => (
            <TwitchChannelCard key={channel.id} channel={channel} />
          ))}
      </div>
    </div>
  );
};
