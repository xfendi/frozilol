import React, { useEffect, useState } from "react";

import { FaRegStar } from "react-icons/fa";

import DropdownMenu, { OptionType } from "@/components/global/dropdownMenu";
import { BackgroundEffectOptions } from "@/data/customize";

const BackgroundEffectSelector = ({
  editData,
  updateEditData,
}: {
  editData: any;
  updateEditData: any;
}) => {
  const [selectedEffect, setSelectedEffect] = useState<OptionType | null>(null);

  useEffect(() => {
    if (editData?.effects) {
      const bgEffect = BackgroundEffectOptions.find(
        (e) => e.value === editData.effects.bg
      );
      if (bgEffect) {
        setSelectedEffect(bgEffect);
      }
    }
  }, [editData?.effects]);

  const handleSelectEffect = (effect: OptionType) => {
    updateEditData("effects", { ...editData.effects, bg: effect.value });
  };

  return (
    <div className="input_container">
      <div className="input_title">Background Effect</div>
      <DropdownMenu
        options={BackgroundEffectOptions}
        selected={selectedEffect}
        onChange={handleSelectEffect}
        icon={<FaRegStar size={20} />}
      />
    </div>
  );
};

export default BackgroundEffectSelector;
