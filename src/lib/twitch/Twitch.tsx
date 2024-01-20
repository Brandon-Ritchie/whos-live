import TwitchConnectButton from "./TwitchConnectButton";
import TwitchFollowedChannels from "./TwitchFollowedChannels";
import { useState } from "react";

const Twitch = () => {
  const [twitchAccessToken, setTwitchAccessToken] = useState<string | null>(
    null,
  );

  const twitchAccessTokenFromLocalStorage =
    localStorage.getItem("twitchAccessToken");

  if (twitchAccessTokenFromLocalStorage && !twitchAccessToken) {
    setTwitchAccessToken(twitchAccessTokenFromLocalStorage);
  }

  if (!twitchAccessToken && document.location.hash) {
    setTwitchAccessToken(document.location.hash.split("&")[0].split("=")[1]);
    localStorage.setItem(
      "twitchAccessToken",
      document.location.hash.split("&")[0].split("=")[1],
    );
  }

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
