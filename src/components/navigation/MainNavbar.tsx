"use client";
import React from "react";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
// components
import NavbarIcon from "./NavbarIcon";

interface MainNavbarProps {
  homeIconBase64: string;
  strategyIconBase64: string;
  addIconBase64: string;
  graphIconBase64: string;
  goalIconBase64: string;
}

export default function MainNavbar({
  homeIconBase64,
  strategyIconBase64,
  addIconBase64,
  graphIconBase64,
  goalIconBase64,
}: MainNavbarProps) {
  const variants: AnimationProps["variants"] = {
    initial: {
      bottom: "32px",
    },
    animate: {
      bottom: ["32px", "-120px", "32px"],
    },
  };

  return (
    <motion.div
      key="mainnavbar"
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      className="w-full fixed px-6 z-50"
    >
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
    </motion.div>
  );
}
