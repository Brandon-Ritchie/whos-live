import { useContext } from "react";
import { ProfileSettingsContext } from "../profile/contexts/ProfileSettingsContext";
import ProfileForm from "../profile/components/ProfileForm";

export default function Profile() {
  const [profileSettings, setProfileSettings] = useContext(
    ProfileSettingsContext,
  );

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
