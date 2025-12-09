import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SeoTextBlock: React.FC = () => {
    const { t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('seo.whyUse')}</h2>
                    <p className="text-gray-600">
                        {t('seo.whyUseDesc')}
                    </p>
                </div>

                <div className={`prose prose-blue max-w-none text-gray-600 ${!isExpanded ? 'line-clamp-3 mask-image-gradient' : ''}`}>
                    <p>
                        {t('seo.intro')}
                    </p>
                    <p>
                        {t('seo.simple')}
                    </p>
                    <h3>{t('seo.salaryTaxTitle')}</h3>
                    <p>
                        {t('seo.salaryTaxDesc')}
                    </p>
                    <h3>{t('seo.loanTitle')}</h3>
                    <p>
                        {t('seo.loanDesc')}
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                        {isExpanded ? (
                            <>{t('common.showLess')} <ChevronUp className="ml-1 h-4 w-4" /></>
                        ) : (
                            <>{t('common.readMore')} <ChevronDown className="ml-1 h-4 w-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};
