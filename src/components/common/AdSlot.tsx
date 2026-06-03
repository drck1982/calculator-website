import React from 'react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../contexts/LanguageContext';
import { ADSENSE_CLIENT_ID, getAdSlotId } from '../../config/ads';

interface AdSlotProps {
    id: string;
    className?: string;
    label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ id, className, label }) => {
    const { t } = useLanguage();
    const displayLabel = label || t('common.advertisement');
    const adSlotId = getAdSlotId(id);

    React.useEffect(() => {
        if (!adSlotId || typeof window === 'undefined') return;

        try {
            const adsWindow = window as Window & { adsbygoogle?: Array<Record<string, unknown>> };
            adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
            adsWindow.adsbygoogle.push({});
        } catch {
            // AdSense not loaded or blocked - silently ignore
        }
    }, [adSlotId]);

    if (!adSlotId) {
        if (!import.meta.env.DEV) return null;

        return (
            <div className={cn("w-full my-6 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-center text-xs text-amber-800", className)}>
                Missing AdSense slot for placement: {id}
            </div>
        );
    }

    return (
        <div className={cn("w-full my-6 flex flex-col items-center justify-center overflow-hidden", className)}>
            {displayLabel && <div className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{displayLabel}</div>}
            <ins className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client={ADSENSE_CLIENT_ID}
                data-ad-slot={adSlotId}
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </div>
    );
};
