import React from "react";
import { getServerSession } from "next-auth";
// prisma
import prisma from "@/libs/prisma";
// utils
import BinaryUtil from "@/utils/BinaryUtil";
// components
import Page500 from "@/app/Page500";
import Page403 from "@/app/Page403";
import BaseIconWithLabel from "./icons/BaseIconWithLabel";

export default async function MainNavbar() {
  const session = await getServerSession();
  if (!session) return <Page403 />;

  const homeIcon = await prisma.images.findFirst({
    where: {
      name: "home-icon.png",
    },
  });
  if (!homeIcon) {
    return <Page500 />;
  }

  const homeIconBase64 = new BinaryUtil(homeIcon.bytes).pngBinaryToBase64();

  return (
    <div className="w-full fixed bottom-8 px-6 ">
      <div className="bg-secondary p-2 rounded-2xl">
        <BaseIconWithLabel b64Str={homeIconBase64} label="Home" />
      </div>
    </div>
  );
}
