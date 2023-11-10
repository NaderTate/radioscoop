import "./globals.css";
import type { Metadata } from "next";
import { Changa } from "next/font/google";
import SessionProv from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-porvider";
import NextUIProvider from "@/components/NextUIProvider";
import { Session } from "next-auth";
const changa = Changa({ subsets: ["arabic"] });
export const metadata = {
  metadataBase: new URL("https://www.radio-scoop.com/"),
  title: { default: "راديو سكووب", template: "%s | راديو سكووب" },
  description: "اذاعة بطعم السعادة",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.radio-scoop.com/",
    siteName: "راديو سكووب",
    images: [
      {
        url: "/favicon.png",
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

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="ar">
      <SessionProv session={session}>
        <body dir="rtl" className={changa.className}>
          <NextUIProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </NextUIProvider>
        </body>
      </SessionProv>
    </html>
  );
}
