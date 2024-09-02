"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { MenuOptions } from "@/types/menu";

interface SegmentedButtonProps {
  layoutGroupId: string;
  menuItems: MenuOptions[];
  defaultValue?: MenuOptions["value"];
  // eslint-disable-next-line no-unused-vars
  onChange?: (activeItem: number | string) => void;
  name?: string;
  onValueChange?: (value: string | number) => void;
}

const SegmentedButton = forwardRef<HTMLDivElement, SegmentedButtonProps>(
  (
    { menuItems, layoutGroupId, onChange, name, defaultValue, onValueChange },
    ref,
  ) => {
    const [activeItem, setActiveItem] = useState(
      defaultValue ?? menuItems[0].value,
    );

    useEffect(() => {
      if (onChange) {
        onChange(activeItem);
      }
    }, [activeItem, onChange]);

    useEffect(() => {
      if (onValueChange) {
        onValueChange(activeItem);
      }
    }, [activeItem, onValueChange]);

    return (
      <div
        ref={ref}
        className="flex w-full items-center bg-secondary p-2 rounded-2xl shadow-inner"
      >
        <LayoutGroup id={layoutGroupId}>
          {menuItems.map((item) => {
            const isActive = item.value === activeItem;
            return (
              <div
                key={item.value}
                className="w-full flex items-center justify-center"
                onClick={() => {
                  setActiveItem(item.value);
                  if (onChange) {
                    onChange(item.value);
                  }
                }}
              >
                <motion.div
                  className="w-fit p-2 px-6 rounded-2xl cursor-pointer relative z-0"
                  whileHover={{ backgroundColor: "#7c7c7c" }}
                  whileTap={isActive ? { scale: 0.95 } : { opacity: 0.6 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeButton"
                      className="top-0 right-0 left-0 bottom-0  bg-tertiary rounded-2xl shadow-md absolute z-0"
                    />
                  )}
                  <p className="font-semibold text-center relative z-10">
                    {item.label}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </LayoutGroup>
        <input
          className="hidden"
          value={activeItem}
          onChange={() => {}}
          name={name}
        />
      </div>
    );
  },
);

SegmentedButton.displayName = "SegmentedButton";

export default SegmentedButton;
