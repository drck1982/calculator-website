import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AFFILIATE_DISCLOSURE, type MonetizationOffer as Offer } from '../../config/monetization';
import { trackEvent } from '../../utils/analytics';

interface MonetizationOfferProps {
    offer?: Offer;
    className?: string;
    toolId?: string;
    placement?: string;
}

export const MonetizationOffer: React.FC<MonetizationOfferProps> = ({ offer, className, toolId, placement = 'results_panel' }) => {
    if (!offer?.url) return null;

    const handleClick = () => {
        trackEvent('affiliate_click', {
            tool_id: toolId,
            offer_title: offer.title,
            advertiser: offer.advertiser,
            placement,
        });
    };

    return (
        <aside className={`rounded-xl border border-emerald-200 bg-emerald-50 p-5 ${className || ''}`}>
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                Sponsored resource
            </div>
            <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-700">{offer.description}</p>
            <a
                href={offer.url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                onClick={handleClick}
                className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
            >
                {offer.cta}
                <ExternalLink className="ml-2 h-4 w-4" />
            </a>
            <p className="mt-3 text-xs leading-5 text-emerald-800">
                {offer.advertiser ? `Partner: ${offer.advertiser}. ` : ''}
                {AFFILIATE_DISCLOSURE}
            </p>
        </aside>
    );
};
