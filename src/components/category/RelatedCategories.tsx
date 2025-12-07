import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface RelatedCategoriesProps {
    currentCategory: string;
}

// Category data with translation keys
const relatedCategoriesData = [
    { nameKey: 'footer.salaryTax', link: '/category/salary-tax' },
    { nameKey: 'footer.investment', link: '/category/investment' },
    { nameKey: 'footer.loansDebt', link: '/category/loans-debt' },
    { nameKey: 'cat.health', link: '/category/health' },
    { nameKey: 'cat.math', link: '/category/math' },
    { nameKey: 'cat.conversion', link: '/category/conversion' },
];

export const RelatedCategories: React.FC<RelatedCategoriesProps> = ({ currentCategory }) => {
    const { t } = useLanguage();
    
    // Filter out the current category
    const related = relatedCategoriesData.filter(c => {
        const translatedName = t(c.nameKey);
        return translatedName !== currentCategory;
    }).slice(0, 4);

    return (
        <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('related.title')}</h3>
            <div className="flex flex-wrap gap-3">
                {related.map((cat) => (
                    <Link
                        key={cat.link}
                        to={cat.link}
                        className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        {t(cat.nameKey)}
                    </Link>
                ))}
            </div>
        </div>
    );
};
