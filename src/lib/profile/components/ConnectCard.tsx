import { Card } from "@/lib/shared/Cards";
import {
  twitchOAuthEndpoint,
  youtubeOAuthEndpoint,
} from "@/lib/utils/constants";

export default function ConnectCard({
  provider,
}: {
  provider: "twitch" | "youtube";
}) {
  const storageKey = `${provider}AccessToken`;
  const accessToken = localStorage.getItem(storageKey);
  const oAuthEndpoint =
    provider === "twitch" ? twitchOAuthEndpoint : youtubeOAuthEndpoint;

  if (!twitchOAuthEndpoint || !youtubeOAuthEndpoint) {
    console.error("Missing environment variable");
    return (
      <div className="alert-danger alert">
        <p>Some environment variables seems to be missing</p>
      </div>
    );
  }

  return (
    <Card>
      <div className="flex min-w-64 flex-col">
        <h2 className="text-2xl font-bold">
          {provider === "twitch" ? "Twitch" : "YouTube"}
        </h2>
        {!accessToken ? (
          <>
            <p className="text-center text-xl">Not Connected</p>
            <a
              href={oAuthEndpoint + "/profile"}
              className="btn btn-primary mt-4"
            >
              Link your {provider === "twitch" ? "Twitch" : "YouTube"} account
            </a>
          </>
        ) : (
          <>
            <p className="text-center text-xl">Connected</p>
            <button
              className="btn btn-error mt-4"
              onClick={() => {
                localStorage.removeItem(storageKey);
                window.location.reload();
              }}
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </Card>
  );
}
