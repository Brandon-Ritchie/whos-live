import useTwitchFollowers from "@/hooks/useTwitchFollowers";
import useTwitchUser from "@/hooks/useTwitchUser";
import { useEffect, useState } from "react";

export default function Root() {
  // TODO type these properly
  const [twitchUser, setTwitchUser] = useState<any>("");
  const [userTwitchFollowers, setUserTwitchFollowers] = useState<any>("");

  const twitchAuthBaseUrl = "https://id.twitch.tv/oauth2/authorize";
  const twitchTokenResponseType = "token";
  const twitchClientId = "ifow1k6nszrt10kx88o1osjhddzld7";
  const twitchRedirectUri = "http://localhost:5173";
  const twitchScopes = "user:read:follows";

  const twitchAuthUrl = `${twitchAuthBaseUrl}?response_type=${twitchTokenResponseType}&client_id=${twitchClientId}&redirect_uri=${twitchRedirectUri}&scope=${twitchScopes}`;

  const twitchAccessToken = document.location.hash.split("&")[0].split("=")[1];

  useEffect(() => {
    async function getTwitchUser() {
      if (!twitchAccessToken) return;
      setTwitchUser(await useTwitchUser({ twitchAccessToken, twitchClientId }));
    }
    getTwitchUser();
  }, [twitchAccessToken]);

  useEffect(() => {
    async function getUserFollowers() {
      if (!twitchUser.id) return;
      setUserTwitchFollowers(
        await useTwitchFollowers({
          twitchAccessToken,
          twitchClientId,
          twitchUserId: twitchUser.id,
        }),
      );
    }
    getUserFollowers();
  }, [twitchUser.id]);

  return (
    <>
      <h2>Twitch</h2>
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
      <h2>YouTube</h2>
      <div>
        <p>YouTube subscription feed here</p>
      </div>
    </>
  );
}
