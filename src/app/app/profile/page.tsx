"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <p>add back link here, ProfilePage</p>
      <button
        onClick={() =>
          signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
        }
      >
        Logout
      </button>
    </div>
  );
}
