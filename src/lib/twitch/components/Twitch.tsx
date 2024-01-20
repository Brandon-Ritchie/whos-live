import TwitchConnectButton from "./TwitchConnectButton";
import TwitchFollowedChannels from "./TwitchFollowedChannels";

const Twitch = () => {
  // TODO debate changing this to a context
  const twitchAccessToken = localStorage.getItem("twitchAccessToken") ?? null;

  return (
    <>
      <h1>Twitch</h1>
      <div className="flex gap-4">
        {!twitchAccessToken ? (
          <TwitchConnectButton />
        ) : (
          <TwitchFollowedChannels twitchAccessToken={twitchAccessToken} />
        )}
      </div>
    </>
  );
};

export default Twitch;
