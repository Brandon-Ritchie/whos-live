import { useContext } from "react";
import { ProfileSettingsContext } from "../contexts/ProfileSettingsContext";
import ProfileForm from "./ProfileForm";
import ConnectCard from "./ConnectCard";
import { Card } from "@/lib/shared/Cards";

export default function Profile() {
  const [profileSettings, setProfileSettings] = useContext(
    ProfileSettingsContext,
  );

  return (
    <div>
      <h1>Profile</h1>
      <div className="grid grid-cols-2 gap-12">
        <Card>
          <div className="min-w-72">
            <ProfileForm
              profileSettings={profileSettings}
              setProfileSettings={setProfileSettings}
            />
          </div>
        </Card>
        <div className="flex gap-4 self-center ">
          {profileSettings?.useTwitch && <ConnectCard provider="twitch" />}
          {profileSettings?.useYoutube && <ConnectCard provider="youtube" />}
        </div>
      </div>
    </div>
  );
}
