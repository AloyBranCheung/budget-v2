"use client";
import React from "react";
import Image from "next/image";
// components
import BaseIconButton from "../BaseIconButton";

interface ProfileIconProps {
  b64: string;
}

export default function ProfileIcon({ b64 }: ProfileIconProps) {
  return (
    <BaseIconButton onClick={() => {}}>
      <Image src={b64} width={30} height={30} alt="profile-icon" />
    </BaseIconButton>
  );
}
