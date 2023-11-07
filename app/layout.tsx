import "./globals.css";
import type { Metadata } from "next";
import { Changa } from "next/font/google";
import SessionProv from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-porvider";
import Footer from "@/components/Footer";

const changa = Changa({ subsets: ["arabic"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <SessionProv session={session}>
        <body dir="rtl" className={changa.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
        <Footer />
      </SessionProv>
    </html>
  );
}
