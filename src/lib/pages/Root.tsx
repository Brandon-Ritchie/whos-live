import { useState } from "react";
import Twitch from "../twitch/components/Twitch";
import Youtube from "../youtube/components/YouTube";
import DropdownButton from "../shared/DropdownButton";

export default function Root() {
  const [showTwitch, setShowTwitch] = useState<boolean>(true);
  const [showYoutube, setShowYoutube] = useState<boolean>(true);

  return (
    <>
      <ShowHideProviders
        twitchState={[showTwitch, setShowTwitch]}
        youtubeState={[showYoutube, setShowYoutube]}
      />
      {showTwitch && <Twitch />}
      {showYoutube && <Youtube />}
    </>
  );
}

type providerState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const ShowHideProviders = ({
  twitchState,
  youtubeState,
}: {
  twitchState: providerState;
  youtubeState: providerState;
}) => {
  const [showTwitch, setShowTwitch] = twitchState;
  const [showYoutube, setShowYoutube] = youtubeState;

  return (
    <div className="mt-4">
      <DropdownButton label="Show/Hide Providers" buttonColor="primary">
        <li>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={showTwitch}
              onChange={() => setShowTwitch(!showTwitch)}
            />
            <button className="ml-2" onClick={() => setShowTwitch(!showTwitch)}>
              Twitch
            </button>
          </label>
        </li>
        <li>
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="checkbox"
              checked={showYoutube}
              onChange={() => setShowYoutube(!showYoutube)}
            />
            <button
              className="ml-2"
              onClick={() => setShowYoutube(!showYoutube)}
            >
              YouTube
            </button>
          </label>
        </li>
      </DropdownButton>
    </div>
  );
};
