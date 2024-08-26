import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface CardProps {
  className?: ClassNameValue;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={twMerge("bg-secondary rounded-2xl p-4 shadow-md", className)}
    >
      {children}
    </div>
  ),
);

// https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
Card.displayName = "Card";

export default Card;
