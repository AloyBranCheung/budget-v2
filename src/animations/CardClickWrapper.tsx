'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardClickWrapperProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export default function CardClickWrapper({ children, onClick }: CardClickWrapperProps) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            className='cursor-pointer'
        >
            {children}
        </motion.div>
    )
}
