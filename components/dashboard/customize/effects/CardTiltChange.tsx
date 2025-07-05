"use client";

import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import PremiumPlate from "@/components/global/plates/premiumPlate";

const CardTiltChange = ({
  editData,
  updateEditData,
  profile,
}: {
  editData: any;
  updateEditData: any;
  profile: any;
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(
    editData?.cardTilt ?? 50
  );

  useEffect(() => {
    if (editData?.cardTilt) {
      setSelectedNumber(editData.cardTilt);
    }
  }, [editData]);

  const handleChange = (e: Event, value: number | number[]) => {
    const numericValue = typeof value === "number" ? value : value[0];
    setSelectedNumber(numericValue);
    updateEditData("cardTilt", numericValue);
  };

  return (
    <div className="input_container">
      <div className="flex items-center gap-2">
        <div className="input_title">Card Tilt</div>
        <PremiumPlate />
      </div>
      <Slider
        value={selectedNumber}
        onChange={handleChange}
        shiftStep={30}
        step={10}
        marks
        min={0}
        max={100}
      />
    </div>
  );
};

export default CardTiltChange;
