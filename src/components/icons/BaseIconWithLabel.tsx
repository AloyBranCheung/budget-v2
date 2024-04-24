"use client";
import React from "react";
import Image from "next/image";
import { AnimationProps, motion } from "framer-motion";
import classNames from "classnames";

interface BaseIconWithLabelProps {
  b64Str: string;
  label?: string;
  width?: number;
  height?: number;
  isFocused?: boolean;
}

export default function BaseIconWithLabel({
  isFocused,
  label,
  b64Str,
  width = 30,
  height = 30,
}: BaseIconWithLabelProps) {
  const variants: AnimationProps["variants"] = {
    initial: {
      padding: "4px 12px",
      borderRadius: "16px",
    },
    animate: {
      backgroundColor: "#F3D0D7",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <motion.div
        whileTap={{ scale: 0.95 }}
        variants={variants}
        initial="initial"
        animate={isFocused && "animate"}
        transition={{
          duration: 0.3,
        }}
      >
        <Image
          src={b64Str}
          alt={`${label}-icon`}
          width={width}
          height={height}
        ></Image>
      </motion.div>
      <p
        className={classNames("text-body3", {
          "font-semibold": isFocused,
        })}
      >
        {label}
      </p>
    </div>
  );
}
