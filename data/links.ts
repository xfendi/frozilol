export type LinkType = {
  id?: number;
  name: string;
  friendlyName: string;
  type: string;
  link?: string;
  profileStartLink?: string;
};

export const socials: LinkType[] = [
  {
    name: "behance",
    friendlyName: "Behance",
    type: "socials",
    link: "https://behance.net/",
    profileStartLink: "behance.net/",
  },
  {
    name: "buymeacoffee",
    friendlyName: "Buy Me a Coffee",
    type: "socials",
    link: "https://buymeacoffee.com/",
    profileStartLink: "buymeacoffee.com/",
  },
  {
    name: "cashapp",
    friendlyName: "Cash App",
    type: "socials",
    link: "https://cash.app/",
    profileStartLink: "cash.app/$",
  },
  {
    name: "discord",
    friendlyName: "Discord",
    type: "socials",
    link: "https://discord.gg/",
    profileStartLink: "discord.gg/",
  },
  {
    name: "dribble",
    friendlyName: "Dribble",
    type: "socials",
    link: "https://dribble.com/",
    profileStartLink: "dribble.com/",
  },
  {
    name: "facebook",
    friendlyName: "Facebook",
    type: "socials",
    link: "https://facebook.com/",
    profileStartLink: "facebook.com/",
  },
  {
    name: "figma",
    friendlyName: "Figma",
    type: "socials",
    link: "https://figma.com/",
    profileStartLink: "figma.com/",
  },
  {
    name: "github",
    friendlyName: "GitHub",
    type: "socials",
    link: "https://github.com/",
    profileStartLink: "github.com/",
  },
  {
    name: "kick",
    friendlyName: "Kick",
    type: "socials",
    link: "https://kick.com/",
    profileStartLink: "kick.com/",
  },
  {
    name: "linkedin",
    friendlyName: "LinkedIn",
    type: "socials",
    link: "https://linkedin.com/",
    profileStartLink: "linkedin.com/in/",
  },
  {
    name: "instagram",
    friendlyName: "Instagram",
    type: "socials",
    link: "https://instagram.com/",
    profileStartLink: "instagram.com/",
  },
  {
    name: "medium",
    friendlyName: "Medium",
    type: "socials",
    link: "https://medium.com/",
    profileStartLink: "medium.com/@",
  },
  {
    name: "onlyfans",
    friendlyName: "OnlyFans",
    type: "socials",
    link: "https://onlyfans.com/",
    profileStartLink: "onlyfans.com/",
  },
  {
    name: "patreon",
    friendlyName: "Patreon",
    type: "socials",
    link: "https://patreon.com/",
    profileStartLink: "patreon.com/",
  },
  {
    name: "paypal",
    friendlyName: "PayPal",
    type: "socials",
    link: "https://paypal.com/",
    profileStartLink: "paypal.me/",
  },
  {
    name: "pinterest",
    friendlyName: "Pinterest",
    type: "socials",
    link: "https://pinterest.com/",
    profileStartLink: "pinterest.com/",
  },
  {
    name: "reddit",
    friendlyName: "Reddit",
    type: "socials",
    link: "https://reddit.com/",
    profileStartLink: "reddit.com/",
  },
  {
    name: "roblox",
    friendlyName: "Roblox",
    type: "socials",
    link: "https://roblox.com/",
    profileStartLink: "roblox.com/",
  },
  {
    name: "signal",
    friendlyName: "Signal",
    type: "socials",
    link: "https://signal.org/",
    profileStartLink: "signal.group/",
  },
  {
    name: "snapchat",
    friendlyName: "Snapchat",
    type: "socials",
    link: "https://snapchat.com/",
    profileStartLink: "snapchat.com/add/",
  },
  {
    name: "soundcloud",
    friendlyName: "SoundCloud",
    type: "socials",
    link: "https://soundcloud.com/",
    profileStartLink: "soundcloud.com/",
  },
  {
    name: "spotify",
    friendlyName: "Spotify",
    type: "socials",
    link: "https://spotify.com/",
    profileStartLink: "open.spotify.com/",
  },
  {
    name: "steam",
    friendlyName: "Steam",
    type: "socials",
    link: "https://steam.com/",
    profileStartLink: "steamcommunity.com/id/",
  },
  {
    name: "telegram",
    friendlyName: "Telegram",
    type: "socials",
    link: "https://t.me/",
    profileStartLink: "t.me/",
  },
  {
    name: "threads",
    friendlyName: "Threads",
    type: "socials",
    link: "https://threads.com/",
    profileStartLink: "threads.com/@",
  },
  {
    name: "tidal",
    friendlyName: "Tidal",
    type: "socials",
    link: "https://tidal.com/",
    profileStartLink: "tidal.com/",
  },
  {
    name: "tiktok",
    friendlyName: "TikTok",
    type: "socials",
    link: "https://tiktok.com/",
    profileStartLink: "tiktok.com/@",
  },
  {
    name: "twitch",
    friendlyName: "Twitch",
    type: "socials",
    link: "https://twitch.tv/",
    profileStartLink: "twitch.tv/",
  },
  {
    name: "twitter",
    friendlyName: "Twitter",
    type: "socials",
    link: "https://twitter.com/",
    profileStartLink: "twitter.com/",
  },
  {
    name: "whatsapp",
    friendlyName: "WhatsApp",
    type: "socials",
    link: "https://whatsapp.com/",
    profileStartLink: "whatsapp.com/",
  },
  {
    name: "xbox",
    friendlyName: "Xbox",
    type: "socials",
    link: "https://xbox.com/",
    profileStartLink: "account.xbox.com/",
  },
  {
    name: "youtube",
    friendlyName: "YouTube",
    type: "socials",
    link: "https://youtube.com/",
    profileStartLink: "youtube.com/@",
  },
];

export const crypto: LinkType[] = [
  {
    name: "bitcoin",
    friendlyName: "Bitcoin",
    type: "crypto",
    link: "",
  },
  {
    name: "dogecoin",
    friendlyName: "Dogecoin",
    type: "crypto",
    link: "",
  },
  {
    name: "ethereum",
    friendlyName: "Ethereum",
    type: "crypto",
    link: "",
  },
  {
    name: "litecoin",
    friendlyName: "Litecoin",
    type: "crypto",
    link: "",
  },
  {
    name: "monero",
    friendlyName: "Monero",
    type: "crypto",
    link: "",
  },
  {
    name: "solana",
    friendlyName: "Solana",
    type: "crypto",
    link: "",
  },
];

export type LinkTypesType = "socials" | "crypto";

export const linkTypes = {
  socials: socials,
  crypto: crypto,
};
