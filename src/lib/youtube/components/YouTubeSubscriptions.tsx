import { useContext, useState } from "react";
import { YouTubeAccessTokenContext } from "../contexts/YouTubeAccessTokenContext";
import {
  YouTubeVideo,
  useYouTubeSubscribedVideos,
} from "../hooks/useYouTubeSubscribedVideos";
import {
  SubscriberSnippet,
  useYouTubeSubscriptions,
} from "../hooks/useYouTubeSubscriptions";
import YouTubeVideoCard from "./YouTubeVideoCard";
import LoadingIndicator from "@/lib/shared/LoadingIndicator";
import DropdownButton from "@/lib/shared/DropdownButton";
import CheckBoxButton from "@/lib/shared/CheckBoxButton";
import PagintationButtons from "@/lib/shared/PaginationButtons";
import { ProfileSettingsContext } from "@/lib/profile/contexts/ProfileSettingsContext";

export default function YouTubeSubscriptionsWrapper() {
  const [profileSettings] = useContext(ProfileSettingsContext);
  const [youtubeAccessToken, setYoutubeAccessToken] = useContext(
    YouTubeAccessTokenContext,
  );
  const [youtubeSubscriptions, subscriptionsStatus] = useYouTubeSubscriptions({
    youtubeAccessToken,
    numOfSubscriptions: profileSettings?.youtubeSubscriptionCount ?? 25,
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

  const [selectedPage, setSelectedPage] = useState(1);

  const filteredSubscribedVideos = subscribedVideos?.filter((video) =>
    selectedChannels.includes(video.snippet.channelTitle),
  );

  const paginatedSubscribedVideos = filteredSubscribedVideos?.slice(
    (selectedPage - 1) * 8,
    selectedPage * 8,
  );

  const maxPage = Math.ceil(filteredSubscribedVideos?.length ?? 0 / 8);

  return (
    <>
      <VideoFilters
        selectedChannels={selectedChannels}
        setSelectedChannels={setSelectedChannels}
        youtubeSubscriptions={sortedSubscriptions}
      />
      <YouTubePaginationButtons
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        maxPage={maxPage}
      />
      <YouTubeCards
        paginatedSubscribedVideos={paginatedSubscribedVideos}
        subscribedVideosStatus={subscribedVideosStatus}
      />
      <YouTubePaginationButtons
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        maxPage={maxPage}
      />
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

const YouTubeCards = ({
  paginatedSubscribedVideos,
  subscribedVideosStatus,
}: {
  paginatedSubscribedVideos: YouTubeVideo[] | undefined;
  subscribedVideosStatus: string;
}) => {
  return (
    <div className="youtube-cards-wrapper">
      {subscribedVideosStatus === "pending" && <LoadingIndicator />}
      {paginatedSubscribedVideos && (
        <div className="cards-container">
          {paginatedSubscribedVideos.map((video) => (
            <YouTubeVideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

function YouTubePaginationButtons({
  selectedPage,
  setSelectedPage,
  maxPage,
}: {
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}) {
  return (
    <div className="my-4 flex justify-center">
      <PagintationButtons
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        maxPage={maxPage}
      />
    </div>
  );
}
