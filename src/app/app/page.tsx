import React from "react";
// auth
import getUser from "@/auth/get-user";
// utils
import IconHelper from "@/utils/IconHelper";
// components
import Page500 from "../error";
import Page403 from "../Page403";
import ProfileIcon from "@/components/icons/ProfileIcon";
import Card from "@/components/Card";

export default async function Home() {
  const user = await getUser();
  if (!user) return <Page403 />;

  const profileIconB64 = await new IconHelper("profile-icon.png").getIcon64();
  if (!profileIconB64) return <Page500 />;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h4>Welcome, </h4>
          <div>
            <ProfileIcon b64={profileIconB64} />
          </div>
        </div>
        <h1 className="break-words">{user.dbUser.name}</h1>
      </div>
      <Card>
        <h4>Balance</h4>
        <div className="flex gap-2 items-end">
          <h1>$Balance</h1>
          <h4 className="leading-10">Remaining</h4>
        </div>
      </Card>
    </div>
  );
}
