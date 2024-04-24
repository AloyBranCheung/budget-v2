import React from "react";
import Image from "next/image";

interface BaseIconWithLabelProps {
  b64Str: string;
  label?: string;
  width?: number;
  height?: number;
}

export default function BaseIconWithLabel({
  label,
  b64Str,
  width = 30,
  height = 30,
}: BaseIconWithLabelProps) {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <Image src={b64Str} alt={`${label}-icon`} width={width} height={height} />
      <p className="text-body3">{label}</p>
    </div>
  );
}
