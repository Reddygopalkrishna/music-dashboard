"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, ListMusic, User } from "lucide-react";

export default function MobileNav() {
  const path = usePathname();

  return (
    <div className="
      md:hidden fixed bottom-0 left-0 right-0
      bg-background border-t flex justify-around
      py-3 z-40
    ">
      <Link href="/" className="flex flex-col items-center text-xs">
        <Home size={20} className={path === "/" ? "text-primary" : ""} />
        Home
      </Link>

      <Link href="/search" className="flex flex-col items-center text-xs">
        <Search size={20} className={path === "/search" ? "text-primary" : ""} />
        Search
      </Link>

      <Link href="/playlists" className="flex flex-col items-center text-xs">
        <ListMusic size={20} className={path === "/playlists" ? "text-primary" : ""} />
        Playlists
      </Link>

      <Link href="/liked" className="flex flex-col items-center text-xs">
        <Heart size={20} className={path === "/liked" ? "text-primary" : ""} />
        Liked
      </Link>

      <Link href="/profile" className="flex flex-col items-center text-xs">
        <User size={20} className={path === "/profile" ? "text-primary" : ""} />
        Profile
      </Link>
    </div>
  );
}
