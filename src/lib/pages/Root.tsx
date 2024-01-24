import { useContext, useState } from "react";
import Twitch from "../twitch/components/Twitch";
import Youtube from "../youtube/components/YouTube";
import DropdownButton from "../shared/DropdownButton";
import CheckBoxButton from "../shared/CheckBoxButton";
import {
  ProfileSettings,
  ProfileSettingsContext,
} from "../profile/contexts/ProfileSettingsContext";
import { Link } from "react-router-dom";

export default function Root() {
  const [profileSettings] = useContext(ProfileSettingsContext);
  const [showTwitch, setShowTwitch] = useState<boolean>(true);
  const [showYoutube, setShowYoutube] = useState<boolean>(true);

  return (
    <>
      {(profileSettings?.useTwitch || profileSettings?.useYoutube) && (
        <ProvidersFilter
          twitchState={[showTwitch, setShowTwitch]}
          youtubeState={[showYoutube, setShowYoutube]}
          profileSettings={profileSettings}
        />
      )}

      {!profileSettings?.useTwitch && !profileSettings?.useYoutube && (
        <Welcome />
      )}

      {profileSettings?.useTwitch && showTwitch && <Twitch />}

      {profileSettings?.useYoutube && showYoutube && <Youtube />}
    </>
  );
}

const Welcome = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1>Welcome to ContentDash!</h1>
      <p>ContentDash is a dashboard to keep track of your favorite content!</p>
      <p>
        You can connect your Twitch and YouTube accounts to see your favorite
        streamers and channels all in one place!
      </p>
      <p>Head over to the Profile page to get started!</p>
      <Link to="/profile">
        <button className="btn btn-primary mt-4">Profile</button>
      </Link>
    </div>
  );
};

type providerState = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const ProvidersFilter = ({
  twitchState,
  youtubeState,
  profileSettings,
}: {
  twitchState: providerState;
  youtubeState: providerState;
  profileSettings: ProfileSettings | null;
}) => {
  const [showTwitch, setShowTwitch] = twitchState;
  const [showYoutube, setShowYoutube] = youtubeState;

  return (
    <div className="mt-4">
      <DropdownButton label="Filter Providers" buttonColor="primary">
        {profileSettings?.useTwitch && (
          <li>
            <CheckBoxButton
              label="Twitch"
              checked={showTwitch}
              onChange={setShowTwitch}
            />
          </li>
        )}
        {profileSettings?.useYoutube && (
          <li>
            <CheckBoxButton
              label="YouTube"
              checked={showYoutube}
              onChange={setShowYoutube}
            />
          </li>
        )}
      </DropdownButton>
    </div>
  );
};
