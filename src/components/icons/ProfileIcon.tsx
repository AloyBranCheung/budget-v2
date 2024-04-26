"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// components
import BaseIconButton from "../BaseIconButton";

interface ProfileIconProps {
  b64: string;
}

export default function ProfileIcon({ b64 }: ProfileIconProps) {
  const router = useRouter();

  return (
    <BaseIconButton onClick={() => router.push("/app/profile")}>
      <Image src={b64} width={30} height={30} alt="profile-icon" />
    </BaseIconButton>
  );
}
