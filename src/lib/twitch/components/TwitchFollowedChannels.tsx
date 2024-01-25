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
      {twitchUser && (
        <TwitchFollowedWrapper
          userStatus={userStatus}
          userId={twitchUser.id}
          twitchAccessToken={twitchAccessToken}
        />
      )}
    </>
  );
}

const TwitchFollowedWrapper = ({
  userStatus,
  userId,
  twitchAccessToken,
}: {
  userStatus: "pending" | "success" | "error";
  userId: string;
  twitchAccessToken: string;
}) => {
  const [followedChannels] = useTwitchFollowed({
    twitchAccessToken,
    twitchUserId: userId,
  });

  return (
    <div className="flex justify-center">
      {userStatus === "pending" && <LoadingIndicator />}
      {followedChannels && (
        <div className="cards-container">
          {followedChannels.map((channel) => (
            <TwitchChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      )}
    </div>
  );
};
