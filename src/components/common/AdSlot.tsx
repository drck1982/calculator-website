import React from 'react';
import { cn } from '../../utils/cn';

interface AdSlotProps {
    id: string;
    className?: string;
    label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ id, className, label = 'Advertisement' }) => {
    return (
        <div className={cn("w-full my-6 flex flex-col items-center justify-center", className)}>
            <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{label}</div>
            <div
                id={id}
                className="w-full max-w-[728px] h-[90px] bg-gray-100 border border-gray-200 border-dashed rounded-md flex items-center justify-center text-gray-400 text-sm"
            >
                Ad Space ({id})
            </div>
        </div>
    );
};
