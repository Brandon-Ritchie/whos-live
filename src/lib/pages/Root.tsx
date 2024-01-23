import { useState } from "react";
import Twitch from "../twitch/components/Twitch";
import Youtube from "../youtube/components/YouTube";
import DropdownButton from "../shared/DropdownButton";
import CheckBoxButton from "../shared/CheckBoxButton";

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
          <CheckBoxButton
            label="Twitch"
            checked={showTwitch}
            onChange={setShowTwitch}
          />
        </li>
        <li>
          <CheckBoxButton
            label="YouTube"
            checked={showYoutube}
            onChange={setShowYoutube}
          />
        </li>
      </DropdownButton>
    </div>
  );
};
