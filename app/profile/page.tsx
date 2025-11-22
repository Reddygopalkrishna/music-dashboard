"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <main className="p-6 pt-24 space-y-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>

      <div className="bg-card p-6 rounded-lg max-w-sm space-y-4">
        <img
          src={session?.user?.image || "/default-avatar.png"}
          alt="Avatar"
          className="w-20 h-20 rounded-full mx-auto"
        />

        <div className="space-y-1 text-center">
          <p className="font-semibold text-lg">{session?.user?.name}</p>
          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </div>
    </main>
  );
}
