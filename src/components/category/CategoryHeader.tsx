import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface CategoryHeaderProps {
    title: string;
    description: string;
    titleKey?: string;
    descKey?: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, description, titleKey, descKey }) => {
    const { t } = useLanguage();
    
    const displayTitle = titleKey ? t(titleKey) : title;
    const displayDesc = descKey ? t(descKey) : description;
    
    return (
        <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {displayTitle} {t('nav.calculators')}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl">
                {displayDesc}
            </p>

            {/* Category Search */}
            <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base placeholder-gray-400 transition-all"
                    placeholder={`${t('nav.search')}`.replace('...', ` ${displayTitle}...`)}
                />
            </div>
        </div>
    );
};
