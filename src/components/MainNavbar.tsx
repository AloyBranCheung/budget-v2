import React from "react";
// prisma
import prisma from "@/libs/prisma";
import Page500 from "@/app/Page500";
// utils
import BinaryUtil from "@/utils/BinaryUtil";
// components
import BaseIconWithLabel from "./icons/BaseIconWithLabel";

export default async function MainNavbar() {
  // TODO: auth check

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
    <div className="w-full fixed bottom-8 px-8">
      <div className="bg-secondary p-4 rounded-2xl">
        <BaseIconWithLabel b64Str={homeIconBase64} label="Home" />
      </div>
    </div>
  );
}
