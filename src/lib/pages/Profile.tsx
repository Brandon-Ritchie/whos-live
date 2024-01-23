import { useContext, useState } from "react";
import {
  ProfileSettings,
  ProfileSettingsContext,
  ProfileSettingsSchema,
} from "../profile/contexts/ProfileSettingsContext";
import ToggleWithLabel from "../shared/ToggleWithLabel";

export default function Profile() {
  const [profileSettings, setProfileSettings] = useContext(
    ProfileSettingsContext,
  );

  const parsedSettings = ProfileSettingsSchema.safeParse(
    JSON.parse(localStorage.getItem("profileSettings") ?? "{}"),
  );

  if (!profileSettings && parsedSettings.success) {
    setProfileSettings(parsedSettings.data);
  }

  return (
    <div>
      <h1>Profile</h1>
      <div className="max-w-96 rounded-box bg-neutral p-4">
        <ProfileForm
          profileSettings={profileSettings}
          setProfileSettings={setProfileSettings}
        />
      </div>
    </div>
  );
}

const ProfileForm = ({
  profileSettings,
  setProfileSettings,
}: {
  profileSettings: ProfileSettings | null;
  setProfileSettings: (settings: ProfileSettings) => void;
}) => {
  const [buttonState, setButtonState] = useState<"idle" | "success" | "error">(
    "idle",
  );

  function handleSubmit() {
    try {
      localStorage.setItem("profileSettings", JSON.stringify(profileSettings));
      setButtonState("success");
      setTimeout(() => {
        setButtonState("idle");
      }, 3000);
    } catch (e) {
      setButtonState("error");
      setTimeout(() => {
        setButtonState("idle");
      }, 3000);
    }
  }

  return (
    <div className="flex flex-col">
      <ToggleWithLabel
        label="Show Twitch"
        checked={profileSettings?.useTwitch ?? false}
        name="useTwitch"
        onChange={(checked) =>
          setProfileSettings({
            ...profileSettings!,
            useTwitch: checked,
          })
        }
      />
      <ToggleWithLabel
        label="Show YouTube"
        checked={profileSettings?.useYoutube ?? false}
        name="useYoutube"
        onChange={(checked) =>
          setProfileSettings({
            ...profileSettings!,
            useYoutube: checked,
          })
        }
      />
      <ProfileYoutubeSubsRange
        numberOfSubs={profileSettings?.youtubeSubscriptionCount}
        name="youtubeSubscriptionCount"
        onChange={(numberOfSubs) =>
          setProfileSettings({
            ...profileSettings!,
            youtubeSubscriptionCount: numberOfSubs,
          })
        }
      />
      {buttonState === "idle" && (
        <button className="btn btn-primary my-4" onClick={handleSubmit}>
          Save
        </button>
      )}
      {buttonState === "success" && (
        <button className="btn btn-success my-4">Saved!</button>
      )}
      {buttonState === "error" && (
        <button className="btn btn-error my-4">Error!</button>
      )}
    </div>
  );
};

const ProfileYoutubeSubsRange = ({
  numberOfSubs,
  name,
  onChange,
}: {
  numberOfSubs: number | undefined;
  name: string;
  onChange: (numberOfSubs: number) => void;
}) => {
  return (
    <label htmlFor={name}>
      <span className="label">
        Number of YouTube Subscribers To Use: {numberOfSubs}
      </span>
      <input
        type="range"
        min={5}
        max={50}
        value={numberOfSubs}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range"
        step={5}
        id={name}
        name={name}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
    </label>
  );
};
