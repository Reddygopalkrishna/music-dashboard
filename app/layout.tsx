import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "@/lib/providers/ReduxProvider";
import QueryProvider from "@/lib/providers/QueryProvider";
import NextAuthProvider from "@/lib/providers/SessionProvider";
import Navbar from "@/components/Navbar";
import Player from "@/components/Player";
import PlaylistHydrator from "@/components/PlaylistHydrator";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Music Dashboard",
  description: "Streaming dashboard app for assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NextAuthProvider>
            <ReduxProvider>
              <QueryProvider>
                <PlaylistHydrator />
                <Navbar />

                <div className="flex">
                  {/* Desktop sidebar */}
                  <div className="lg:hidden">
  <Sidebar />
</div>

<main className="pt-10 px-1 pb-32">{children}</main>

                </div>

                {/* Mobile bottom nav */}
                <MobileNav />

                {/* Player always bottom */}
                <Player />
              </QueryProvider>
            </ReduxProvider>
          </NextAuthProvider>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
