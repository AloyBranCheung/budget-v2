'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardClickWrapperProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLDivElement>
    isOn?: boolean;
}

export default function CardClickWrapper({ children, onClick, isOn = true }: CardClickWrapperProps) {
    return (
        <motion.div
            onClick={isOn ? onClick : undefined}
            whileHover={isOn ? { scale: 1.01 } : undefined}
            whileTap={isOn ? { scale: 0.95 } : undefined}
            className={isOn ? 'cursor-pointer' : undefined}
        >
            {children}
        </motion.div>
    )
}
