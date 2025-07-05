import React from "react";
import CardTiltChange from "./effects/CardTiltChange";

const DiscordAvatarSwitch = ({ editData, updateEditData }: any) => {
  return (
    <div className="input_container">
      <div className="input_title">Use Discord Avatar</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={editData?.discordAvatarEnabled}
          onChange={(e) =>
            updateEditData("discordAvatarEnabled", e.target.checked)
          }
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

const DiscordDecorationSwitch = ({ editData, updateEditData }: any) => {
  return (
    <div className="input_container">
      <div className="input_title">Use Discord Avatar Decoration</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={editData?.discordDecorationEnabled}
          onChange={(e) =>
            updateEditData("discordDecorationEnabled", e.target.checked)
          }
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

const VolumeControlSwitch = ({ editData, updateEditData }: any) => {
  return (
    <div className="input_container">
      <div className="input_title">Volume Control</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={editData?.volumeControlEnabled}
          onChange={(e) =>
            updateEditData("volumeControlEnabled", e.target.checked)
          }
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

const OtherSection = ({
  editData,
  updateEditData,
  profile,
}: {
  editData: any;
  updateEditData: any;
  profile: any;
}) => {
  return (
    <div className="dashboard__section-main flex 2xl:flex-row flex-col gap-4">
      <div className="flex flex-col gap-4 flex-1">
        <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
          Other Customization
        </div>
        <div className="divider"></div>
        <div className="flex gap-4 !w-full 2xl:flex-row flex-col">
          <div className="flex flex-col gap-4 flex-1">
            {profile.customize.theme === "card" && (
              <CardTiltChange
                editData={editData}
                updateEditData={updateEditData}
                profile={profile}
              />
            )}
          </div>

          <div className="flex flex-col gap-4 flex-1"></div>
          <div className="flex flex-col gap-4 flex-1">
            <VolumeControlSwitch
              editData={editData}
              updateEditData={updateEditData}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <DiscordAvatarSwitch
              editData={editData}
              updateEditData={updateEditData}
            />
            <DiscordDecorationSwitch
              editData={editData}
              updateEditData={updateEditData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherSection;
