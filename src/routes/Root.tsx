import useTwitchFollowers from "@/hooks/useTwitchFollowers";
import useTwitchUser from "@/hooks/useTwitchUser";
import { useEffect, useState } from "react";

export default function Root() {
  // TODO type these properly
  const [twitchAccessToken, setTwitchAccessToken] = useState<string>("");
  const [twitchUser, setTwitchUser] = useState<any>("");
  const [userTwitchFollowers, setUserTwitchFollowers] = useState<any>("");

  const twitchAccessTokenFromLocalStorage =
    localStorage.getItem("twitchAccessToken");

  if (twitchAccessTokenFromLocalStorage && !twitchAccessToken) {
    setTwitchAccessToken(twitchAccessTokenFromLocalStorage);
  }

  const twitchUserFromLocalStorage = localStorage.getItem("twitchUser");

  if (twitchUserFromLocalStorage && !twitchUser) {
    setTwitchUser(JSON.parse(twitchUserFromLocalStorage));
  }

  const twitchRedirectUri = import.meta.env.VITE_TWITCH_REDIRECT_URI;
  const twitchScopes = "user:read:follows";

  const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=ifow1k6nszrt10kx88o1osjhddzld7&redirect_uri=${twitchRedirectUri}&scope=${twitchScopes}`;

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
      const twitchUser = await useTwitchUser({
        twitchAccessToken,
        twitchClientId,
      });
      try {
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
      if (!twitchUser.id) return;
      try {
        setUserTwitchFollowers(
          await useTwitchFollowers({
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
  }, [twitchUser.id]);

  function clearLocalStorage() {
    localStorage.removeItem("twitchAccessToken");
    localStorage.removeItem("twitchUser");
    setTwitchAccessToken("");
    setTwitchUser("");
  }

  return (
    <>
      <h1>Twitch</h1>
      <div className="flex gap-4">
        {!twitchUser && (
          <a href={twitchAuthUrl} className="btn btn-primary">
            Link your Twitch account
          </a>
        )}
        {twitchUser &&
          userTwitchFollowers &&
          // TODO type this properly
          userTwitchFollowers.map((follower: any) => (
            <div className="flex-1" key={follower.user_id}>
              <img
                src={follower.thumbnail_url
                  .replace("{width}", "360")
                  .replace("{height}", "200")}
                alt={follower.user_name}
                className="cursor-pointer"
                onClick={() =>
                  window.open(`https://twitch.tv/${follower.user_name}`)
                }
              />
              <a
                href={`https://twitch.tv/${follower.user_name}`}
                className="text-primary"
              >
                {follower.user_name}
              </a>
              <p>{follower.title}</p>
              <a
                href={`https://www.twitch.tv/directory/category/${follower.game_name}`}
                className="text-secondary"
              >
                {follower.game_name}
              </a>
            </div>
          ))}
      </div>
      <h1>YouTube</h1>
      <div>
        <p>YouTube subscription feed here</p>
      </div>
    </>
  );
}
