"use client";
import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import BaseIconButton from "./BaseIconButton";

interface ModalProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  children: React.ReactNode;
  closeIcon: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  modalTitle,
  closeIcon,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: document.body.clientHeight / 2 }}
          animate={{ opacity: 1, height: "100%", y: 0 }}
          exit={{ opacity: 0, y: document.body.clientHeight }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-primary p-4 w-full h-full flex flex-col gap-2 shadow-md">
            <BaseIconButton className="self-end" onClick={onClose}>
              <Image src={closeIcon} width={20} height={20} alt="close-icon" />
            </BaseIconButton>
            <h3>{modalTitle}</h3>
            <div>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
