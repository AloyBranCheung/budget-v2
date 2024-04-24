"use client";
import React from "react";
import { useRouter } from "next/navigation";
// auth
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface LoginButtonProps {
  session: Session | null;
}

export default function LoginButton({ session }: LoginButtonProps) {
  const router = useRouter();

  return session ? (
    <>
      <button onClick={() => router.push("/app")}>Go to app</button>
      <button
        onClick={() =>
          signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
        }
      >
        Sign Out
      </button>
    </>
  ) : (
    <button
      onClick={() =>
        signIn("auth0", {
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/app`,
        })
      }
    >
      LoginButton
    </button>
  );
}
