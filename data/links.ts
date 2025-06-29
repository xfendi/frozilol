export type LinkType = {
  id?: number;
  name: string;
  friendlyName: string;
  type: string;
  linkMode?: "href" | "copy";
  link?: string;
  profileStartLink?: string;
};

export const socials: LinkType[] = [
  {
    name: "behance",
    friendlyName: "Behance",
    type: "socials",
    linkMode: "href",
    link: "https://behance.net/",
    profileStartLink: "behance.net/",
  },
  {
    name: "buymeacoffee",
    friendlyName: "Buy Me a Coffee",
    type: "socials",
    linkMode: "href",
    link: "https://buymeacoffee.com/",
    profileStartLink: "buymeacoffee.com/",
  },
  {
    name: "cashapp",
    friendlyName: "Cash App",
    type: "socials",
    linkMode: "href",
    link: "https://cash.app/",
    profileStartLink: "cash.app/$",
  },
  {
    name: "discord",
    friendlyName: "Discord",
    type: "socials",
    linkMode: "href",
    link: "https://discord.gg/",
    profileStartLink: "discord.gg/",
  },
  {
    name: "dribble",
    friendlyName: "Dribble",
    type: "socials",
    linkMode: "href",
    link: "https://dribble.com/",
    profileStartLink: "dribble.com/",
  },
  {
    name: "facebook",
    friendlyName: "Facebook",
    type: "socials",
    linkMode: "href",
    link: "https://facebook.com/",
    profileStartLink: "facebook.com/",
  },
  {
    name: "figma",
    friendlyName: "Figma",
    type: "socials",
    linkMode: "href",
    link: "https://figma.com/",
    profileStartLink: "figma.com/",
  },
  {
    name: "github",
    friendlyName: "GitHub",
    type: "socials",
    linkMode: "href",
    link: "https://github.com/",
    profileStartLink: "github.com/",
  },
  {
    name: "kick",
    friendlyName: "Kick",
    type: "socials",
    linkMode: "href",
    link: "https://kick.com/",
    profileStartLink: "kick.com/",
  },
  {
    name: "linkedin",
    friendlyName: "LinkedIn",
    type: "socials",
    linkMode: "href",
    link: "https://linkedin.com/",
    profileStartLink: "linkedin.com/in/",
  },
  {
    name: "instagram",
    friendlyName: "Instagram",
    type: "socials",
    linkMode: "href",
    link: "https://instagram.com/",
    profileStartLink: "instagram.com/",
  },
  {
    name: "medium",
    friendlyName: "Medium",
    type: "socials",
    linkMode: "href",
    link: "https://medium.com/",
    profileStartLink: "medium.com/@",
  },
  {
    name: "namemc",
    friendlyName: "NameMC",
    type: "socials",
    linkMode: "href",
    link: "https://namemc.com/",
    profileStartLink: "namemc.com/profile/",
  },
  {
    name: "onlyfans",
    friendlyName: "OnlyFans",
    type: "socials",
    linkMode: "href",
    link: "https://onlyfans.com/",
    profileStartLink: "onlyfans.com/",
  },
  {
    name: "patreon",
    friendlyName: "Patreon",
    type: "socials",
    linkMode: "href",
    link: "https://patreon.com/",
    profileStartLink: "patreon.com/",
  },
  {
    name: "paypal",
    friendlyName: "PayPal",
    type: "socials",
    linkMode: "href",
    link: "https://paypal.com/",
    profileStartLink: "paypal.me/",
  },
  {
    name: "pinterest",
    friendlyName: "Pinterest",
    type: "socials",
    linkMode: "href",
    link: "https://pinterest.com/",
    profileStartLink: "pinterest.com/",
  },
  {
    name: "reddit",
    friendlyName: "Reddit",
    type: "socials",
    linkMode: "href",
    link: "https://reddit.com/",
    profileStartLink: "reddit.com/",
  },
  {
    name: "roblox",
    friendlyName: "Roblox",
    type: "socials",
    linkMode: "href",
    link: "https://roblox.com/",
    profileStartLink: "roblox.com/",
  },
  {
    name: "signal",
    friendlyName: "Signal",
    type: "socials",
    linkMode: "href",
    link: "https://signal.org/",
    profileStartLink: "signal.group/",
  },
  {
    name: "snapchat",
    friendlyName: "Snapchat",
    type: "socials",
    linkMode: "href",
    link: "https://snapchat.com/",
    profileStartLink: "snapchat.com/add/",
  },
  {
    name: "soundcloud",
    friendlyName: "SoundCloud",
    type: "socials",
    linkMode: "href",
    link: "https://soundcloud.com/",
    profileStartLink: "soundcloud.com/",
  },
  {
    name: "spotify",
    friendlyName: "Spotify",
    type: "socials",
    linkMode: "href",
    link: "https://spotify.com/",
    profileStartLink: "open.spotify.com/",
  },
  {
    name: "steam",
    friendlyName: "Steam",
    type: "socials",
    linkMode: "href",
    link: "https://steam.com/",
    profileStartLink: "steamcommunity.com/id/",
  },
  {
    name: "telegram",
    friendlyName: "Telegram",
    type: "socials",
    linkMode: "href",
    link: "https://t.me/",
    profileStartLink: "t.me/",
  },
  {
    name: "threads",
    friendlyName: "Threads",
    type: "socials",
    linkMode: "href",
    link: "https://threads.com/",
    profileStartLink: "threads.com/@",
  },
  {
    name: "tidal",
    friendlyName: "Tidal",
    type: "socials",
    linkMode: "href",
    link: "https://tidal.com/",
    profileStartLink: "tidal.com/",
  },
  {
    name: "tiktok",
    friendlyName: "TikTok",
    type: "socials",
    linkMode: "href",
    link: "https://tiktok.com/",
    profileStartLink: "tiktok.com/@",
  },
  {
    name: "tipply",
    friendlyName: "Tipply",
    type: "socials",
    linkMode: "href",
    link: "https://tipply.pl/",
    profileStartLink: "tipply.pl/@",
  },
  {
    name: "twitch",
    friendlyName: "Twitch",
    type: "socials",
    linkMode: "href",
    link: "https://twitch.tv/",
    profileStartLink: "twitch.tv/",
  },
  {
    name: "twitter",
    friendlyName: "Twitter",
    type: "socials",
    linkMode: "href",
    link: "https://twitter.com/",
    profileStartLink: "twitter.com/",
  },
  {
    name: "whatsapp",
    friendlyName: "WhatsApp",
    type: "socials",
    linkMode: "href",
    link: "https://whatsapp.com/",
    profileStartLink: "whatsapp.com/",
  },
  {
    name: "xbox",
    friendlyName: "Xbox",
    type: "socials",
    linkMode: "href",
    link: "https://xbox.com/",
    profileStartLink: "account.xbox.com/",
  },
  {
    name: "youtube",
    friendlyName: "YouTube",
    type: "socials",
    linkMode: "href",
    link: "https://youtube.com/",
    profileStartLink: "youtube.com/@",
  },
];

export const crypto: LinkType[] = [
  {
    name: "bitcoin",
    friendlyName: "Bitcoin",
    type: "crypto",
    linkMode: "copy",
    link: "",
  },
  {
    name: "dogecoin",
    friendlyName: "Dogecoin",
    type: "crypto",
    linkMode: "copy",
    link: "",
  },
  {
    name: "ethereum",
    friendlyName: "Ethereum",
    type: "crypto",
    linkMode: "copy",
    link: "",
  },
  {
    name: "litecoin",
    friendlyName: "Litecoin",
    type: "crypto",
    linkMode: "copy",
    link: "",
  },
  {
    name: "monero",
    friendlyName: "Monero",
    type: "crypto",
    linkMode: "copy",
    link: "",
  },
  {
    name: "solana",
    friendlyName: "Solana",
    type: "crypto",
    linkMode: "copy",
    link: "",
  },
];

export const others: LinkType[] = [
  {
    name: "other",
    friendlyName: "Custom URL",
    type: "other",
    linkMode: "href",
    link: "",
    profileStartLink: "https://",
  },
  {
    name: "email",
    friendlyName: "Email",
    type: "email",
    linkMode: "copy",
    link: "",
    profileStartLink: "mailto:",
  },
];

export type LinkTypesType = "socials" | "crypto";

export const linkTypes = {
  socials: socials,
  crypto: crypto,
  other: others,
  email: others,
};

export type FolderType = keyof typeof folederNames;

export const folederNames = {
  socials: "socials",
  crypto: "crypto",
  other: "others",
  email: "others",
};
