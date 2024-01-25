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
  function handleChange(profileSettings: ProfileSettings) {
    localStorage.setItem("profileSettings", JSON.stringify(profileSettings));
    setProfileSettings(profileSettings);
  }

  return (
    <div className="flex flex-col self-center">
      <ToggleWithLabel
        label="Show Twitch"
        checked={profileSettings?.useTwitch ?? false}
        name="useTwitch"
        onChange={(checked) =>
          handleChange({
            ...profileSettings!,
            useTwitch: checked,
          })
        }
      />
      <ToggleWithLabel
        label="Show YouTube"
        checked={profileSettings?.useYoutube ?? false}
        name="useYoutube"
        onChange={(checked: boolean) =>
          handleChange({
            ...profileSettings!,
            useYoutube: checked,
          })
        }
      />
      {profileSettings?.useYoutube && (
        <ProfileYoutubeSubsRange
          numberOfSubs={profileSettings?.youtubeSubscriptionCount}
          name="youtubeSubscriptionCount"
          onChange={(numberOfSubs: number) =>
            handleChange({
              ...profileSettings,
              youtubeSubscriptionCount: numberOfSubs,
            })
          }
        />
      )}
    </div>
  );
}
