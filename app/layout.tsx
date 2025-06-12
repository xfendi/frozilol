import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "@/context/authContext";

import AOSInitializer from "@/components/global/AOSinitializer";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "frozi.lol",
  description:
    "frozi.lol is your essential platform for creating modern, customizable bio-pages to meet all your digital needs.",
  keywords: [
    "biolink tool",
    "create bio page",
    "link in bio",
    "frozi",
    "frozi.lol",
    "custom biolinks",
    "free biolink website",
  ],
  robots: { index: true, follow: true },
  authors: [{ name: "frozi.lol Team", url: "https://frozi.lol" }],
  creator: "frozi.lol",
  publisher: "frozi.lol",
  metadataBase: new URL("https://frozi.lol"),
  openGraph: {
    title: "frozi.lol – Your Biolink",
    description:
      "frozi.lol is your essential platform for creating modern, customizable bio-pages to meet all your digital needs.",
    url: "https://frozi.lol",
    type: "website",
    siteName: "frozi.lol",
  },
  twitter: {
    card: "summary_large_image",
    site: "@frozi",
    creator: "@frozi",
    title: "frozi.lol – Your Biolink",
    description:
      "frozi.lol is your essential platform for creating modern, customizable bio-pages to meet all your digital needs.",
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
