"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Navbar() {
  const { data: session } = useSession();
  const likedCount = useSelector((state: RootState) => state.liked.liked.length);

  return (
    <nav className="
  flex items-center justify-between
  px-6 py-4 border-b bg-background
  fixed top-0 left-0 w-full z-50
">
  {/* Logo */}
  <Link href="/" className="text-xl font-bold">
    Music Dashboard
  </Link>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-6">
    
    {/* Theme toggle always visible */}
    <ThemeToggle />

    {/* Desktop-only links */}
    <div className="hidden md:flex items-center gap-6">
      <Link href="/search">Search</Link>
      <Link href="/playlists">Playlists</Link>
      <Link href="/liked">Liked ({likedCount})</Link>

      {session ? (
        <>
          <Link href="/profile">Profile</Link>
          <Button variant="outline" onClick={() => signOut()}>
            Logout
          </Button>
        </>
      ) : (
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  </div>
</nav>

  );
}
