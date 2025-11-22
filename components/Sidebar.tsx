"use client";
import Link from "next/link";
import { Home, Search, Heart, ListMusic, User } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="p-6 space-y-6 hidden md:block">
      <Link href="/" className="flex items-center gap-2">
        <Home /> Home
      </Link>

      <Link href="/search" className="flex items-center gap-2">
        <Search /> Search
      </Link>

      <Link href="/playlists" className="flex items-center gap-2">
        <ListMusic /> Playlists
      </Link>

      <Link href="/liked" className="flex items-center gap-2">
        <Heart /> Liked
      </Link>

      <Link href="/profile" className="flex items-center gap-2">
        <User /> Profile
      </Link>
    </div>
  );
}
