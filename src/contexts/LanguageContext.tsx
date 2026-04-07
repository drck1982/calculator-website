import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { en } from '../i18n/en';

export type Language = 'en' | 'zh' | 'es' | 'ja' | 'fr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languageNames: Record<Language, string> = {
    en: 'English',
    zh: '中文',
    es: 'Español',
    ja: '日本語',
    fr: 'Français',
};

export const languageFlags: Record<Language, string> = {
    en: '🇺🇸',
    zh: '🇨🇳',
    es: '🇪🇸',
    ja: '🇯🇵',
    fr: '🇫🇷',
};

interface LanguageProviderProps {
    children: ReactNode;
}

// Initial translations with only English to minimize bundle size
const initialTranslations: Record<string, Record<string, string>> = { en };

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window === 'undefined') return 'en';
        const supportedLanguages: Language[] = ['en', 'zh', 'es', 'ja', 'fr'];

        const urlLang = new URLSearchParams(window.location.search).get('lang') as Language | null;
        if (urlLang && supportedLanguages.includes(urlLang)) {
            return urlLang;
        }

        const saved = localStorage.getItem('language') as Language;
        if (saved) return saved;

        const browserLang = navigator.language.split('-')[0];
        if (supportedLanguages.includes(browserLang as Language)) {
            return browserLang as Language;
        }
        return 'en';
    });

    const [translations, setTranslations] = useState(initialTranslations);
    const [isLoading, setIsLoading] = useState(false);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            if (lang === 'en') {
                url.searchParams.delete('lang');
            } else {
                url.searchParams.set('lang', lang);
            }
            window.history.replaceState({}, '', url.toString());
        }
    };

    // Load translations dynamically
    useEffect(() => {
        document.documentElement.lang = language;

        if (!translations[language]) {
            setIsLoading(true);
            const loadLanguage = async () => {
                try {
                    let module;
                    switch (language) {
                        case 'zh': module = await import('../i18n/zh'); break;
                        case 'es': module = await import('../i18n/es'); break;
                        case 'ja': module = await import('../i18n/ja'); break;
                        case 'fr': module = await import('../i18n/fr'); break;
                        default: return;
                    }
                    setTranslations(prev => ({
                        ...prev,
                        [language]: (module as any)[language]
                    }));
                } catch (error) {
                    console.error(`Failed to load translations for ${language}:`, error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadLanguage();
        }
    }, [language, translations]);

    const t = (key: string): string => {
        const currentTranslations = translations[language] || translations['en'];
        return currentTranslations[key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
            {isLoading && (
                <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-pulse z-50">
                    Loading translations...
                </div>
            )}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
