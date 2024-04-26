import React from "react";
import ProfileIcon from "@/components/icons/ProfileIcon";

interface WelcomeTextProps {
  profileIconB64: string;
  name: string;
}

export default function WelcomeText({
  profileIconB64,
  name,
}: WelcomeTextProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4>Welcome, </h4>
        <div>
          <ProfileIcon b64={profileIconB64} />
        </div>
      </div>
      <h1 className="break-words">{name}</h1>
    </div>
  );
}
