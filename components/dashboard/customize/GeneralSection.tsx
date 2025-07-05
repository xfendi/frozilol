import React from "react";

import { LocationEditIcon } from "lucide-react";
import { MdDescription } from "react-icons/md";
import BackgroundEffectSelector from "./effects/BackgroundEffectSelector";
import UsernameEffectButton from "./effects/UsernameEffectButton";
import CardTiltChange from "./effects/CardTiltChange";

const GeneralSection = ({
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
      <div className="flex gap-4 !w-full lg:flex-row flex-col">
        <div className="flex flex-col gap-4 flex-1">
          <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
            General Info
          </div>
          <div className="divider"></div>
          <div className="flex gap-4 !w-full 2xl:flex-row flex-col">
            <div className="flex flex-col gap-4 flex-1">
              <div className="input_container">
                <div className="input_title">Description</div>
                <div className="input_body !gap-[10px]">
                  <MdDescription size={24} />
                  <input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="this is my description"
                    value={editData?.description}
                    onChange={(e) =>
                      updateEditData("description", e.target.value)
                    }
                    className="focus:outline-none"
                  />
                </div>
              </div>

              <div className="input_container">
                <div className="input_title">Location</div>
                <div className="input_body !gap-[10px] !text-red-500">
                  <LocationEditIcon size={24} />
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="My Location"
                    value={editData?.location}
                    onChange={(e) => updateEditData("location", e.target.value)}
                    className="focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-4 flex-1">
                <div className="input_container">
                  <div className="input_title">Discord Presence</div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={editData?.discordPresenceEnabled}
                      onChange={(e) =>
                        updateEditData(
                          "discordPresenceEnabled",
                          e.target.checked
                        )
                      }
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="feature-title max-w-sm text-xl font-semibold flex items-center gap-4">
            Effects Customization
          </div>
          <div className="divider"></div>
          <div className="flex gap-4 !w-full 2xl:flex-row flex-col">
            <div className="flex flex-col gap-4 flex-1">
              <BackgroundEffectSelector
                editData={editData}
                updateEditData={updateEditData}
              />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <UsernameEffectButton
                editData={editData}
                updateEditData={updateEditData}
                profile={profile}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
