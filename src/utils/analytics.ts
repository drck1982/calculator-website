type AnalyticsValue = string | number | boolean;

type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

type TrackableWindow = Window & {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
};

const cleanParams = (params: AnalyticsParams = {}) =>
    Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined)
    ) as Record<string, AnalyticsValue>;

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
    if (typeof window === 'undefined') return;

    const w = window as TrackableWindow;
    const payload = cleanParams(params);

    if (typeof w.gtag === 'function') {
        w.gtag('event', eventName, payload);
    }

    if (typeof w.clarity === 'function') {
        try {
            w.clarity('event', eventName);
        } catch {
            // no-op
        }
    }
};
