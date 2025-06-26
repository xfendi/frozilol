export type CustomizeDataType = {
  theme: (typeof themes)[number];
  linkStyle: (typeof linkStyles)[number];
  // inne pola jak np. name, id itd.
};

export const defaultCustomizeData: CustomizeDataType = {
  theme: "clear",
  linkStyle: "icons",
  // ...inne pola
};

export const themes = ["card", "clear"];

export const linkStyles = ["list", "icons"];
