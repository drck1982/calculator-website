export interface MonetizationOffer {
    title: string;
    description: string;
    cta: string;
    url?: string;
    advertiser?: string;
}

const env = import.meta.env;

export const LAST_REVIEWED = '2026-06-03';

export const AFFILIATE_DISCLOSURE =
    'Some links may be sponsored or affiliate links. We may earn a commission at no extra cost to you.';

export const MONETIZATION_OFFERS: Record<string, MonetizationOffer> = {
    mortgage: {
        title: 'Compare mortgage options',
        description: 'Use your estimate as a starting point, then compare real lender quotes before making a housing decision.',
        cta: 'Compare rates',
        url: env.VITE_AFFILIATE_MORTGAGE_URL,
        advertiser: env.VITE_AFFILIATE_MORTGAGE_NAME,
    },
    refinance: {
        title: 'Check refinance offers',
        description: 'If the calculator shows possible savings, compare refinance offers and closing costs from multiple lenders.',
        cta: 'Check offers',
        url: env.VITE_AFFILIATE_REFINANCE_URL,
        advertiser: env.VITE_AFFILIATE_REFINANCE_NAME,
    },
    debt: {
        title: 'Explore debt payoff options',
        description: 'Compare payoff methods, balance transfer options, or debt tools before committing to a plan.',
        cta: 'Explore options',
        url: env.VITE_AFFILIATE_DEBT_URL,
        advertiser: env.VITE_AFFILIATE_DEBT_NAME,
    },
    savings: {
        title: 'Compare savings accounts',
        description: 'A higher APY can shorten your timeline. Compare current savings options after running the numbers.',
        cta: 'Compare accounts',
        url: env.VITE_AFFILIATE_SAVINGS_URL,
        advertiser: env.VITE_AFFILIATE_SAVINGS_NAME,
    },
    investing: {
        title: 'Review investing platforms',
        description: 'Long-term projections depend on costs, fees, and consistency. Compare platforms before investing.',
        cta: 'Review platforms',
        url: env.VITE_AFFILIATE_INVESTING_URL,
        advertiser: env.VITE_AFFILIATE_INVESTING_NAME,
    },
};

const toolOfferMap: Record<string, keyof typeof MONETIZATION_OFFERS> = {
    'mortgage-calculator': 'mortgage',
    'home-affordability': 'mortgage',
    'down-payment-calculator': 'mortgage',
    'rent-vs-buy-calculator': 'mortgage',
    'refinance-calculator': 'refinance',
    'credit-card-payoff': 'debt',
    'debt-payoff-calculator': 'debt',
    'student-loan-calculator': 'debt',
    'savings-goal-calculator': 'savings',
    'emergency-fund-calculator': 'savings',
    'apy-calculator': 'savings',
    'compound-interest-calculator': 'investing',
    '401k-calculator': 'investing',
    'roi-calculator': 'investing',
};

export const getOfferForTool = (toolId?: string) => {
    if (!toolId) return undefined;
    const offerKey = toolOfferMap[toolId];
    return offerKey ? MONETIZATION_OFFERS[offerKey] : undefined;
};
