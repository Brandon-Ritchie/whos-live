import { useState } from "react";
import { ProfileSettings } from "../contexts/ProfileSettingsContext";
import ToggleWithLabel from "@/lib/shared/ToggleWithLabel";
import ProfileYoutubeSubsRange from "./ProfileYouTubeSubsRange";

export default function ProfileForm({
  profileSettings,
  setProfileSettings,
}: {
  profileSettings: ProfileSettings | null;
  setProfileSettings: (settings: ProfileSettings) => void;
}) {
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
      {profileSettings?.useYoutube && (
        <ProfileYoutubeSubsRange
          numberOfSubs={profileSettings?.youtubeSubscriptionCount}
          name="youtubeSubscriptionCount"
          onChange={(numberOfSubs) =>
            setProfileSettings({
              ...profileSettings,
              youtubeSubscriptionCount: numberOfSubs,
            })
          }
        />
      )}

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
}
