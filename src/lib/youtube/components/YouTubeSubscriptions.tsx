import { useContext, useState } from "react";
import { YouTubeAccessTokenContext } from "../contexts/YouTubeAccessTokenContext";
import { useYouTubeSubscribedVideos } from "../hooks/useYouTubeSubscribedVideos";
import {
  SubscriberSnippet,
  useYouTubeSubscriptions,
} from "../hooks/useYouTubeSubscriptions";
import YouTubeVideoCard from "./YouTubeVideoCard";
import LoadingIndicator from "@/lib/shared/LoadingIndicator";
import DropdownButton from "@/lib/shared/DropdownButton";
import CheckBoxButton from "@/lib/shared/CheckBoxButton";

export default function YouTubeSubscriptionsWrapper() {
  const [youtubeAccessToken, setYoutubeAccessToken] = useContext(
    YouTubeAccessTokenContext,
  );
  const [youtubeSubscriptions, subscriptionsStatus] = useYouTubeSubscriptions({
    youtubeAccessToken,
  });

  if (subscriptionsStatus === "error") {
    setYoutubeAccessToken(null);
    localStorage.removeItem("youtubeAccessToken");
  }

  return (
    <>
      {subscriptionsStatus === "pending" && <LoadingIndicator />}
      {youtubeSubscriptions && (
        <YouTubeSubscriptions youtubeSubscriptions={youtubeSubscriptions} />
      )}
    </>
  );
}

function YouTubeSubscriptions({
  youtubeSubscriptions,
}: {
  youtubeSubscriptions: SubscriberSnippet[];
}) {
  const sortedSubscriptions = youtubeSubscriptions.sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const [youtubeAccessToken] = useContext(YouTubeAccessTokenContext);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    sortedSubscriptions.map((channel) => channel.title),
  );

  const [subscribedVideos, subscribedVideosStatus] = useYouTubeSubscribedVideos(
    youtubeAccessToken,
    sortedSubscriptions.map((channel) => channel.resourceId.channelId),
  );

  const filteredSubscribedVideos = subscribedVideos?.filter((video) =>
    selectedChannels.includes(video.snippet.channelTitle),
  );

  return (
    <>
      <VideoFilters
        selectedChannels={selectedChannels}
        setSelectedChannels={setSelectedChannels}
        youtubeSubscriptions={sortedSubscriptions}
      />
      <div className="flex justify-center">
        <div className="cards-container">
          {subscribedVideosStatus === "pending" && <LoadingIndicator />}
          {filteredSubscribedVideos &&
            filteredSubscribedVideos.map((video) => (
              <YouTubeVideoCard key={video.id} video={video} />
            ))}
        </div>
      </div>
    </>
  );
}

const VideoFilters = ({
  selectedChannels,
  setSelectedChannels,
  youtubeSubscriptions,
}: {
  selectedChannels: string[];
  setSelectedChannels: React.Dispatch<React.SetStateAction<string[]>>;
  youtubeSubscriptions: SubscriberSnippet[];
}) => {
  function handleCheckedChange(checked: boolean, channelTitle: string) {
    setSelectedChannels((prev) =>
      checked
        ? [...prev, channelTitle]
        : prev.filter((title) => title !== channelTitle),
    );
  }

  return (
    <div className="mb-4">
      <DropdownButton label="Filter Channels" buttonColor="primary">
        <li>
          <button
            onClick={() =>
              setSelectedChannels(
                selectedChannels.length === youtubeSubscriptions.length
                  ? []
                  : youtubeSubscriptions.map((channel) => channel.title),
              )
            }
          >
            {selectedChannels.length === youtubeSubscriptions.length
              ? "Unselect All"
              : "Select All"}
          </button>
        </li>
        {youtubeSubscriptions.map((channel) => (
          <li key={channel.resourceId.channelId}>
            <CheckBoxButton
              label={channel.title}
              checked={selectedChannels.includes(channel.title)}
              onChange={(checked) =>
                handleCheckedChange(checked, channel.title)
              }
            />
          </li>
        ))}
      </DropdownButton>
    </div>
  );
};
