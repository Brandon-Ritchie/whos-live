import TwitchConnectButton from "./TwitchConnectButton";
import TwitchFollowedChannels from "./TwitchFollowedChannels";
import { TwitchAccessTokenContext } from "../TwitchAccessTokenContext";
import { useState } from "react";

const Twitch = () => {
  const [twitchAccessToken, setTwitchAccessToken] = useState<string | null>(
    null,
  );

  const accessTokenFromStorage = localStorage.getItem("twitchAccessToken");
  if (accessTokenFromStorage && !twitchAccessToken)
    setTwitchAccessToken(accessTokenFromStorage);

  return (
    <TwitchAccessTokenContext.Provider
      value={[twitchAccessToken, setTwitchAccessToken]}
    >
      <h1>Twitch</h1>
      {!twitchAccessToken ? (
        <TwitchConnectButton />
      ) : (
        <TwitchFollowedChannels twitchAccessToken={twitchAccessToken} />
      )}
    </TwitchAccessTokenContext.Provider>
  );
};

export default Twitch;
