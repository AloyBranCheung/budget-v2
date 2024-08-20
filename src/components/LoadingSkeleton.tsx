import React from "react";
import { twMerge, ClassNameValue } from "tailwind-merge";

interface LoadingSkeletonProps {
  className?: ClassNameValue;
}

export default function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={twMerge(
        "w-full h-24 rounded-2xl p-4 animate-pulse bg-loading",
        className
      )}
    />
  );
}
