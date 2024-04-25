"use client";
import React from "react";
import { motion, AnimationProps } from "framer-motion";

export default function PageTransitionMobile() {
  const NUMBER_OF_RECTANGLES = 5;

  const variants: AnimationProps["variants"] = {
    initial: {
      top: "-100%",
    },
    animate: {
      top: [0, "100%"],
    },
  };
  return (
    <div className="fixed h-screen w-screen pointer-events-none">
      <div className="flex w-screen h-full">
        <motion.div
          className="w-full h-full bg-primary absolute"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.98, 0.0, 1.0, -0.115] }}
        />
        {[...new Array(NUMBER_OF_RECTANGLES)].map((_, i) => (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            transition={{
              duration: 0.8,
              delay: (NUMBER_OF_RECTANGLES - i) * 0.05,
              ease: [0.0, 1.005, 1.0, 0.01],
            }}
            key={`${i}-${Math.random()}`}
            className="bg-tertiary h-full w-full relative z-10"
          />
        ))}
      </div>
    </div>
  );
}
