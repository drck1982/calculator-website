import React from 'react';
import { cn } from '../../utils/cn';

interface AdSlotProps {
    id: string;
    className?: string;
    label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ id, className, label = 'Advertisement' }) => {
    React.useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={cn("w-full my-6 flex flex-col items-center justify-center overflow-hidden", className)}>
            {label && <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{label}</div>}
            <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client="ca-pub-2390350078302655"
                data-ad-slot={id} // Using the ID as the slot ID for now, or generic if not provided. Ideally this should be a real slot ID from AdSense dashboard.
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </div>
    );
};
