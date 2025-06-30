export type CustomizeDataType = {
  theme: (typeof themes)[number];
  linkStyle: (typeof linkStyles)[number];
  description: string;
  location: string;
  // inne pola jak np. name, id itd.
};

export const defaultCustomizeData: CustomizeDataType = {
  theme: "clear",
  linkStyle: "icons",
  description: "",
  location: "",
  // ...inne pola
};

export const themes = ["card", "clear"];

export const linkStyles = ["list", "icons"];
