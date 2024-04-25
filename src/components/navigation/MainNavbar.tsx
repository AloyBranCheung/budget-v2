import React from "react";
import { getServerSession } from "next-auth";
// utils
import IconHelper from "@/utils/IconHelper";
// components
import Page500 from "@/app/Page500";
import Page403 from "@/app/Page403";
import NavbarIcon from "./NavbarIcon";

export default async function MainNavbar() {
  const session = await getServerSession();
  if (!session) return <Page403 />;

  // this is unnecessary and potentially not performant but just want to try
  // having binary in a bytes column
  const [
    homeIconBase64,
    addIconBase64,
    strategyIconBase64,
    goalIconBase64,
    graphIconBase64,
  ] = await Promise.all([
    new IconHelper("home-icon.png").getIcon64(),
    new IconHelper("add-icon.png").getIcon64(),
    new IconHelper("strategy-icon.png").getIcon64(),
    new IconHelper("goal-icon.png").getIcon64(),
    new IconHelper("graph-icon.png").getIcon64(),
  ]);

  if (
    !homeIconBase64 ||
    !addIconBase64 ||
    !strategyIconBase64 ||
    !goalIconBase64 ||
    !graphIconBase64
  ) {
    return <Page500 />;
  }

  return (
    <div className="w-full fixed bottom-8 px-6 ">
      <div className="bg-secondary py-3 px-6 rounded-2xl flex items-center justify-between shadow-md">
        <NavbarIcon targetPath="/app" b64Str={homeIconBase64} label="Home" />
        <NavbarIcon
          targetPath="/app/planning"
          b64Str={strategyIconBase64}
          label="Planning"
        />
        <NavbarIcon
          targetPath="/app/add"
          b64Str={addIconBase64}
          width={40}
          height={40}
        />
        <NavbarIcon
          targetPath="/app/statistics"
          b64Str={graphIconBase64}
          label="Statistics"
        />
        <NavbarIcon
          targetPath="/app/goals"
          b64Str={goalIconBase64}
          label="Goals"
        />
      </div>
    </div>
  );
}
