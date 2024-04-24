import React from "react";
import Image from "next/image";

interface BaseIconWithLabelProps {
  b64Str: string;
  label: string;
}

export default function BaseIconWithLabel({
  label,
  b64Str,
}: BaseIconWithLabelProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={b64Str} alt={`${label}-icon`} width={30} height={30} />
      <p className="text-body3">{label}</p>
    </div>
  );
}
