"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  modalTitle: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  modalTitle,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: document.body.clientHeight / 2 }}
          animate={{ opacity: 1, height: "100%", y: 0 }}
          exit={{ opacity: 0, height: 0, y: document.body.clientHeight / 2 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-primary p-4 w-full h-full flex flex-col gap-2 shadow-md">
            <div onClick={onClose}>flex-end x icon here</div>
            <h3>{modalTitle}</h3>
            <div>{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
