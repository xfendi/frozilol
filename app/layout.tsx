import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "@/context/authContext";

import AOSInitializer from "@/components/global/AOSinitializer";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "frozi.lol",
  description:
    "frozi.lol is your go-to for modern, customizable biolinks and fast, secure file hosting. Build your own link hub in seconds. Everything you need — right here.",
  keywords: [
    "biolink tool",
    "create bio page",
    "file hosting",
    "link in bio",
    "frozi",
    "frozi.lol",
    "custom biolinks",
    "free biolink website",
    "host files online",
    "guns.lol alternative",
  ],
  robots: { index: true, follow: true },
  authors: [{ name: "frozi.lol Team", url: "https://frozi.lol" }],
  creator: "frozi.lol",
  publisher: "frozi.lol",
  metadataBase: new URL("https://frozi.lol"),
  openGraph: {
    title: "frozi.lol | Build Biolinks. Host Files. Done Right.",
    description:
      "frozi.lol lets you create clean, modern biolinks and host your files – all in one place. No clutter, just what you need.",
    url: "https://frozi.lol",
    type: "website",
    siteName: "frozi.lol",
  },
  twitter: {
    card: "summary_large_image",
    site: "@frozi",
    creator: "@frozi",
    title: "frozi.lol – Your Biolink & File Hub",
    description:
      "Create beautiful biolinks, share your socials, and host files securely with frozi.lol. Everything you want, right here.",
  },
};

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://identitytoolkit.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://firestore.googleapis.com"
          crossOrigin="anonymous"
        />

        <link
          rel="dns-prefetch"
          href="https://identitytoolkit.googleapis.com"
        />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
      </head>
      <body className={roboto.className}>
        <AOSInitializer />
        <Toaster position="bottom-right" reverseOrder={false} />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
