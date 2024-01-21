import TwitchConnectButton from "./TwitchConnectButton";
import TwitchFollowedChannels from "./TwitchFollowedChannels";
import { TwitchAccessTokenContext } from "../contexts/twitchAccessTokenContext";
import { useContext } from "react";

const Twitch = () => {
  const [twitchAccessToken, setTwitchAccessToken] = useContext(
    TwitchAccessTokenContext,
  );

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
