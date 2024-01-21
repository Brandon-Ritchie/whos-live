import useTwitchUser from "../hooks/useTwitchUser";
import { useTwitchFollowed } from "../hooks/useTwitchFollowed";
import TwitchChannelCard from "./TwitchChannelCard";
import { useContext } from "react";
import { TwitchAccessTokenContext } from "../contexts/TwitchAccessTokenContext";
import LoadingIndicator from "@/lib/shared/LoadingIndicator";

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
      {userStatus === "pending" && <LoadingIndicator />}
      {twitchUser && (
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
