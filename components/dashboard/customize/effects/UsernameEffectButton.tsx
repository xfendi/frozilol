import { OptionType } from "@/components/global/dropdownMenu";
import Modal from "@/components/global/modal";
import React, { useEffect, useState } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";

import "@/styles/effects.css";
import TypewriterText from "@/components/effects/typewriter";
import toast from "react-hot-toast";

export const UsernameEffectOptions = [
  {
    label: "None",
    icon: <MdBlock size={24} />,
    value: "none",
  },
  {
    label: "Rainbow",
    value: "rainbow",
  },
  {
    label: "Typewriter",
    value: "typewriter",
  },
];

export const UsernameEffectData = [
  {
    value: "none",
    title: "No effect",
    description: "No effect will be applied to the username.",
    previewClassName: "text text-stone-500",
    premium: false,
  },
  {
    value: "rainbow",
    title: "Rainbow Name",
    description: "Rainbow effect will be applied to the username.",
    previewClassName: "text-sm rainbow-text font-semibold",
    premium: true,
  },
  {
    value: "typewriter",
    title: "Typewriter",
    description: "Typewriter effect will be applied to the username.",
    previewClassName: "text-sm typewriter-text font-semibold",
    premium: true,
  },
];

export const UsernameEffectClassNames = [
  {
    value: "none",
    className: "!text-stone-500",
  },
  {
    value: "rainbow",
    className: "rainbow-text",
  },
  {
    value: "typewriter",
    className: "",
  },
];

const UsernameEffectButton = ({
  editData,
  updateEditData,
  profile,
}: {
  editData: any;
  updateEditData: any;
  profile: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState<OptionType | null>(null);

  const foundEffect =
    UsernameEffectOptions.find(
      (e) => e.value === editData?.effects?.username
    ) || null;

  useEffect(() => {
    resetSelectedEffect();
  }, []);

  const resetSelectedEffect = () => {
    setSelectedEffect(foundEffect);
  };

  const handleClickButton = () => {
    resetSelectedEffect();
    setIsModalOpen(true);
  };

  const handleClickEffect = (e: React.MouseEvent, effect: OptionType) => {
    e.preventDefault();
    setSelectedEffect(effect);
  };

  const handleCloseModal = (e?: React.MouseEvent) => {
    e?.preventDefault();

    setIsModalOpen(false);
    setTimeout(() => {
      resetSelectedEffect();
    }, 300);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      UsernameEffectData.find((e) => e.value === selectedEffect?.value)
        ?.premium &&
      !profile.premium
    ) {
      return toast.error("You need to be a Pro user to use this effect!");
    }

    updateEditData("effects", {
      ...editData.effects,
      username: selectedEffect?.value,
    });

    setIsModalOpen(false);
    setTimeout(() => {
      resetSelectedEffect();
    }, 300);
  };

  return (
    <>
      <div className="input_container">
        <div className="input_title">Username Effect</div>
        <button
          className="btn-outline flex items-center gap-4"
          onClick={handleClickButton}
        >
          <FaWandMagicSparkles size={20} />
          Choose Username Effect
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Username Effect"
        content={
          <div className="flex gap-4">
            <div className="grid grid-cols-3 gap-4">
              {UsernameEffectOptions.map((option) => (
                <button
                  className={`btn-outline !w-20 !h-20 flex items-center justify-center flex-col gap-1 relative !text-sm ${
                    option === selectedEffect &&
                    "!border-2 !border-(--color-primary)"
                  }`}
                  onClick={(e) => handleClickEffect(e, option)}
                >
                  {option.icon}
                  {option.value === "none" ||
                    (option.value === "rainbow" && (
                      <div
                        className={
                          UsernameEffectData.find(
                            (e) => e.value === option?.value
                          )?.previewClassName
                        }
                      >
                        {option.label}
                      </div>
                    ))}

                  {option.value === "typewriter" && (
                    <TypewriterText
                      text={profile.displayName || profile.username}
                    />
                  )}
                  {UsernameEffectData.find((e) => e.value === option.value)
                    ?.premium && (
                    <div className="bg-[rgb(255,102,178)] !text-white !w-6 !h-6 rounded-md flex justify-center items-center absolute -top-3 -right-3">
                      💎
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-[200px] h-[170px] bg-(--color-lite-black) border-2 border-(--border-secondary) rounded-[12px] flex items-center justify-center">
                <span
                  className={`text-2xl font-semibold !w-[150px] text-center ${
                    UsernameEffectClassNames.find(
                      (e) => e.value === selectedEffect?.value
                    )?.className
                  }`}
                >
                  {selectedEffect?.value === "typewriter" ? (
                    <TypewriterText
                      text={profile.displayName || profile.username}
                    />
                  ) : (
                    <div>{profile.displayName || profile.username}</div>
                  )}
                </span>
              </div>
              <div className="flex flex-col items-start text-start !w-[200px] !p-2 border-2 border-(--border-secondary) rounded-[12px]">
                <span className="text-md">
                  {
                    UsernameEffectData.find(
                      (e) => e.value === selectedEffect?.value
                    )?.title
                  }
                </span>
                <p className="text-[12px] !text-stone-500">
                  {
                    UsernameEffectData.find(
                      (e) => e.value === selectedEffect?.value
                    )?.description
                  }
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  className="btn-outline flex-1"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                {selectedEffect !== foundEffect && (
                  <button className="btn-primary flex-1" onClick={handleSubmit}>
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default UsernameEffectButton;
