"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import CountUp from "react-countup";
// components
import Card from "@/components/Card";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import AddPaycheckModalContent from "./AddPaycheckModalContent";

interface OverviewCardProps {
  totalRemaining: number | null | undefined;
  closeIconB64: string;
  paycheckDate: Date | undefined;
}

export default function OverviewCard({
  totalRemaining,
  closeIconB64,
  paycheckDate,
}: OverviewCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {paycheckDate && <h4>Current Paycheck</h4>}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Card>
          {totalRemaining ? (
            <>
              <h4>Balance</h4>
              <div className="flex gap-2 items-end">
                <CountUp
                  prefix="$ "
                  className="font-semibold text-heading1"
                  end={totalRemaining}
                  decimals={2}
                />
                <h4 className="leading-10">Remaining</h4>
              </div>
              <p className="text-xs">
                {paycheckDate &&
                  `Since ${dayjs(paycheckDate).format("dddd, MMMM D, YYYY")}`}
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center flex-col gap-4">
              <p>Get started by adding your first paycheck</p>
              <Button
                className="bg-tertiary text-body2 py-2"
                onClick={() => setIsOpen(true)}
              >
                Get Started
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
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
