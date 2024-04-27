"use client";
import React, { useState } from "react";
// components
import AddPaycheckModalContent from "../home-page/AddPaycheckModalContent";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface PromptPaycheckInputProps {
  closeIconb64: string;
}

export default function PromptPaycheckInput({
  closeIconb64,
}: PromptPaycheckInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickClose = () => setIsOpen(false);

  return (
    <div>
      <Card className="flex items-center justify-center flex-col gap-4">
        <p>Get started by adding your first paycheck</p>
        <Button onClick={() => setIsOpen(true)} className="bg-tertiary py-2">
          Get Started
        </Button>
      </Card>
      <Modal
        isOpen={isOpen}
        modalTitle="Add Paycheck"
        onClose={handleClickClose}
        closeIcon={closeIconb64}
      >
        <AddPaycheckModalContent onSuccess={handleClickClose} />
      </Modal>
    </div>
  );
}
