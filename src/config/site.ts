const DEFAULT_SITE_URL = 'https://calculator-website-puce.vercel.app';

const rawSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
const fallbackSiteUrl =
    typeof window !== 'undefined' ? window.location.origin : DEFAULT_SITE_URL;

export const SITE_URL = (rawSiteUrl?.trim() || fallbackSiteUrl).replace(/\/+$/, '');
export const SITE_NAME = 'WorkMoney Tools';
