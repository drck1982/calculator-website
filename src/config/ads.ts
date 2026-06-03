const rawPublisherId = import.meta.env.VITE_ADSENSE_CLIENT_ID as string | undefined;

export const ADSENSE_CLIENT_ID = (rawPublisherId || 'ca-pub-2390350078302655').trim();

export const AD_SLOT_IDS: Record<string, string | undefined> = {
    'home-top-banner': import.meta.env.VITE_AD_SLOT_HOME_TOP,
    'home-after-categories': import.meta.env.VITE_AD_SLOT_HOME_AFTER_CATEGORIES,
    'home-after-popular': import.meta.env.VITE_AD_SLOT_HOME_AFTER_POPULAR,
    'home-bottom-banner': import.meta.env.VITE_AD_SLOT_HOME_BOTTOM,
    'category-top-banner': import.meta.env.VITE_AD_SLOT_CATEGORY_TOP,
    'category-list-ad': import.meta.env.VITE_AD_SLOT_CATEGORY_LIST,
    'sidebar-ad': import.meta.env.VITE_AD_SLOT_SIDEBAR,
    'calc-top-banner': import.meta.env.VITE_AD_SLOT_CALC_TOP,
    'calc-sidebar': import.meta.env.VITE_AD_SLOT_CALC_SIDEBAR,
    'in-content-1': import.meta.env.VITE_AD_SLOT_IN_CONTENT_1,
    'in-content-2': import.meta.env.VITE_AD_SLOT_IN_CONTENT_2,
    'all-tools-top': import.meta.env.VITE_AD_SLOT_ALL_TOOLS_TOP,
    'all-tools-bottom': import.meta.env.VITE_AD_SLOT_ALL_TOOLS_BOTTOM,
};

export const getAdSlotId = (placementId: string) => {
    if (placementId.startsWith('all-tools-grid-')) {
        return import.meta.env.VITE_AD_SLOT_ALL_TOOLS_GRID;
    }

    return AD_SLOT_IDS[placementId];
};
