"use client";
import React from "react";
import Image from "next/image";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

interface BaseIconWithLabelProps {
  b64Str: string;
  label?: string;
  width?: number;
  height?: number;
  isFocused?: boolean;
  targetPath?: string;
}

export default function BaseIconWithLabel({
  isFocused,
  label,
  b64Str,
  width = 30,
  height = 30,
  targetPath,
}: BaseIconWithLabelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const focusState = isFocused || (targetPath && pathname === targetPath);

  console.log(focusState, targetPath);

  const variants: AnimationProps["variants"] = {
    initial: {
      padding: "4px 12px",
      borderRadius: "16px",
      background: "transparent",
    },
    animate: {
      backgroundColor: "#F3D0D7",
      padding: "4px 12px",
      borderRadius: "16px",
    },
  };

  const handleClick = () => {
    if (!targetPath) {
      console.error("No targetPath specified");
      return;
    }
    router.push(targetPath);
  };

  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      <motion.div
        key={`${targetPath}-${pathname}-${Math.random()}`}
        whileHover={{ backgroundColor: "#7c7c7c" }}
        whileTap={{ scale: 0.9 }}
        variants={variants}
        initial="initial"
        animate={focusState && "animate"}
        transition={{
          duration: 5,
        }}
      >
        <Image
          src={b64Str}
          alt={`${label}-icon`}
          width={width}
          height={height}
        ></Image>
      </motion.div>
      <motion.p
        key={`${targetPath}-${pathname}-${Math.random()}`}
        className="text-body3"
        animate={focusState && { fontWeight: 600 }}
        transition={{
          duration: 0.3,
        }}
      >
        {label}
      </motion.p>
    </div>
  );
}
