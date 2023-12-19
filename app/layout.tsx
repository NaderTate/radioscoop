import "./globals.css";

import type { Metadata } from "next";
import { Changa } from "next/font/google";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import ClientProviders from "@/components/ClientProviders";

const changa = Changa({ subsets: ["arabic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.radio-scoop.com/"),
  title: { default: "راديو سكووب", template: "%s | راديو سكووب" },
  description: "اذاعة بطعم السعادة",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://www.radio-scoop.com/",
    siteName: "راديو سكووب",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "راديو سكووب",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@radio-scoop",
    title: "راديو سكووب",
    description: "اذاعة بطعم السعادة",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ar">
      <body dir="rtl" className={changa.className}>
        <ClientProviders session={session}>{children}</ClientProviders>
      </body>
    </html>
  );
}
