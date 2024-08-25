import React from 'react'
import Image from 'next/image'

interface H4WithH6IconProps {
    icon: string;
    iconAltText: string;
    h4Text: string;
    h6Text: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function H4WithH6Icon({ icon, onClick, iconAltText, h4Text, h6Text }: H4WithH6IconProps) {
    return (
        <div className='flex justify-between items-center'>
            <h4>{h4Text}</h4>
            <div
                className="cursor-pointer flex items-center gap-1"
                onClick={onClick}
            >
                <h6>{h6Text}</h6>
                <Image
                    src={icon}
                    alt={iconAltText}
                    width={20}
                    height={20}
                />
            </div>
        </div>
    )
}
