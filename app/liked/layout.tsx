"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LikedLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [status]);

  if (status === "loading") {
    return <p className="p-6">Loading...</p>;
  }

  return <>{children}</>;
}
