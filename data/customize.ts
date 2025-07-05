import { OptionType } from "@/components/global/dropdownMenu";

export type CustomizeDataType = {
  theme: (typeof themes)[number];
  linkStyle: (typeof linkStyles)[number];
  description: string;
  location: string;
  cardTilt: number;
  effects: {
    bg: OptionType["value"];
  };

  discordPresenceEnabled: boolean;
  discordAvatarEnabled: boolean;
  discordDecorationEnabled: boolean;
  volumeControlEnabled: boolean;
};

export const defaultCustomizeData: CustomizeDataType = {
  theme: "clear",
  linkStyle: "icons",
  description: "",
  location: "",
  cardTilt: 50,
  effects: {
    bg: "none",
  },

  discordPresenceEnabled: false,
  discordAvatarEnabled: false,
  discordDecorationEnabled: false,
  volumeControlEnabled: false,
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
