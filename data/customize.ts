import { OptionType } from "@/components/global/dropdownMenu";

export type CustomizeDataType = {
  theme: (typeof themes)[number];
  linkStyle: (typeof linkStyles)[number];
  description: string;
  location: string;
  effects: {
    bg: OptionType["value"];
  };
};

export const defaultCustomizeData: CustomizeDataType = {
  theme: "clear",
  linkStyle: "icons",
  description: "",
  location: "",
  effects: {
    bg: "none",
  },
};

export const themes = ["card", "clear"];

export const linkStyles = ["list", "icons"];

export const BackgroundEffectOptions = [
  {
    label: "None",
    value: "none",
    icon: "none",
  },
  {
    label: "Blurred Background",
    value: "blur",
    icon: "blur",
  },
  {
    label: "Night Vision",
    value: "night",
    icon: "night",
  },
];
