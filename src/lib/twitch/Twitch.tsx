import TwitchChannelCard from "./TwitchChannelCard";
import TwitchConnectButton from "./TwitchConnectButton";
import useTwitchFollowed, { TwitchChannel } from "./useTwitchFollowed";
import useTwitchUser, { TwitchUser } from "./useTwitchUser";
import { useEffect, useState } from "react";

export default () => {
  const [twitchAccessToken, setTwitchAccessToken] = useState<string | null>(
    null,
  );
  const [twitchUser, setTwitchUser] = useState<TwitchUser | null>(null);
  const [userTwitchFollowed, setUserTwitchFollowed] = useState<
    TwitchChannel[] | null
  >(null);

  const twitchAccessTokenFromLocalStorage =
    localStorage.getItem("twitchAccessToken");

  if (twitchAccessTokenFromLocalStorage && !twitchAccessToken) {
    setTwitchAccessToken(twitchAccessTokenFromLocalStorage);
  }

  const twitchUserFromLocalStorage = localStorage.getItem("twitchUser");

  if (twitchUserFromLocalStorage && !twitchUser) {
    setTwitchUser(JSON.parse(twitchUserFromLocalStorage));
  }

  const twitchClientId = "ifow1k6nszrt10kx88o1osjhddzld7";

  if (!twitchAccessToken && document.location.hash) {
    setTwitchAccessToken(document.location.hash.split("&")[0].split("=")[1]);
    localStorage.setItem(
      "twitchAccessToken",
      document.location.hash.split("&")[0].split("=")[1],
    );
  }

  useEffect(() => {
    async function getTwitchUser() {
      if (!twitchAccessToken) return;

      try {
        const twitchUser = await useTwitchUser({
          twitchAccessToken,
          twitchClientId,
        });
        setTwitchUser(twitchUser);
        localStorage.setItem("twitchUser", JSON.stringify(twitchUser));
      } catch (error) {
        console.error(error);
        clearLocalStorage();
      }
    }

    getTwitchUser();
  }, [twitchAccessToken]);

  useEffect(() => {
    async function getUserFollowers() {
      if (!twitchUser?.id || !twitchAccessToken) return;
      try {
        setUserTwitchFollowed(
          await useTwitchFollowed({
            twitchAccessToken,
            twitchClientId,
            twitchUserId: twitchUser.id,
          }),
        );
      } catch (error) {
        console.error(error);
        clearLocalStorage();
      }
    }

    getUserFollowers();
  }, [twitchUser?.id]);

  function clearLocalStorage() {
    localStorage.removeItem("twitchAccessToken");
    localStorage.removeItem("twitchUser");
    setTwitchAccessToken("");
    setTwitchUser(null);
  }

  return (
    <>
      <h1>Twitch</h1>
      <div className="flex gap-4">
        {!twitchUser && <TwitchConnectButton />}
        {twitchUser &&
          userTwitchFollowed &&
          userTwitchFollowed.map((channel) => (
            <TwitchChannelCard key={channel.id} channel={channel} />
          ))}
      </div>
    </>
  );
};
