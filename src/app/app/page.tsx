import React from "react";
// auth
import getUser from "@/auth/get-user";
// components
import Page500 from "../Page500";
import Page403 from "../Page403";
import IconHelper from "@/utils/IconHelper";
import ProfileIcon from "@/components/icons/ProfileIcon";

export default async function Home() {
  const user = await getUser();
  if (!user) return <Page403 />;

  const profileIconB64 = await new IconHelper("profile-icon.png").getIcon64();
  if (!profileIconB64) return <Page500 />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4>Welcome, </h4>
        <div>
          <ProfileIcon b64={profileIconB64} />
        </div>
      </div>
      <h1 className="break-words">{user.dbUser.name}</h1>
    </div>
  );
}
