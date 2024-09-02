"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// auth
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

interface LoginButtonProps {
  session: Session | null;
}

export default function LoginButton({ session }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return session ? (
    <>
      <button
        onClick={() => {
          setIsLoading(true);
          router.push("/app");
        }}
      >
        {isLoading ? "Loading..." : "Go to App"}
      </button>
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
      onClick={() => {
        setIsLoading(true);
        signIn("auth0", {
          callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/app`,
        });
      }}
    >
      {isLoading ? "Loading..." : "LoginButton"}
    </button>
  );
}
