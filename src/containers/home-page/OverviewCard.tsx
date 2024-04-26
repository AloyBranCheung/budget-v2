"use client";
import React, { useState } from "react";
// components
import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import AddPaycheckModalContent from "./AddPaycheckModalContent";

interface OverviewCardProps {
  totalRemaining: number | null;
  closeIconB64: string;
}

export default function OverviewCard({
  totalRemaining,
  closeIconB64,
}: OverviewCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <h4>Current Paycheck</h4>
      <Card>
        {totalRemaining ? (
          <>
            <h4>Balance</h4>
            <div className="flex gap-2 items-end">
              <h1>${totalRemaining.toFixed(2)}</h1>
              <h4 className="leading-10">Remaining</h4>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <Button
              className="bg-tertiary text-body2 py-2"
              onClick={() => setIsOpen(true)}
            >
              Get Started
            </Button>
          </div>
        )}
      </Card>
      <Modal
        isOpen={isOpen}
        modalTitle="Add Paycheck"
        onClose={() => setIsOpen(false)}
        closeIcon={closeIconB64}
      >
        <AddPaycheckModalContent onSuccess={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}
