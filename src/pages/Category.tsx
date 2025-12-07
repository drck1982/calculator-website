import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CategoryHeader } from '../components/category/CategoryHeader';
import { ToolList } from '../components/category/ToolList';
import { RelatedCategories } from '../components/category/RelatedCategories';
import { AdSlot } from '../components/common/AdSlot';
import { SEO } from '../components/common/SEO';
import { toolsByCategory } from '../data/tools';
import { useLanguage } from '../contexts/LanguageContext';

// Map category IDs to translation keys
const categoryTranslationKeys: Record<string, { titleKey: string; descKey: string }> = {
    'salary-tax': { titleKey: 'cat.finance', descKey: 'cat.finance.desc' },
    'finance': { titleKey: 'cat.business', descKey: 'cat.business.desc' },
    'loans-debt': { titleKey: 'cat.loansDebt', descKey: 'cat.loansDebt.desc' },
    'investment': { titleKey: 'cat.investment', descKey: 'cat.investment.desc' },
    'health': { titleKey: 'cat.health', descKey: 'cat.health.desc' },
    'math': { titleKey: 'cat.math', descKey: 'cat.math.desc' },
    'geometry': { titleKey: 'cat.geometry', descKey: 'cat.geometry.desc' },
    'conversion': { titleKey: 'cat.conversion', descKey: 'cat.conversion.desc' },
    'everyday-life': { titleKey: 'cat.everydayLife', descKey: 'cat.everydayLife.desc' },
    'biology': { titleKey: 'cat.biology', descKey: 'cat.biology.desc' },
    'chemistry': { titleKey: 'cat.chemistry', descKey: 'cat.chemistry.desc' },
    'physics': { titleKey: 'cat.physics', descKey: 'cat.physics.desc' },
    'sports': { titleKey: 'cat.sports', descKey: 'cat.sports.desc' },
    'statistics': { titleKey: 'cat.statistics', descKey: 'cat.statistics.desc' },
    'other': { titleKey: 'cat.other', descKey: 'cat.other.desc' },
};

export const Category: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();
    const data = toolsByCategory[id || 'salary-tax'];
    const translationKeys = categoryTranslationKeys[id || 'salary-tax'];

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <SEO title="Category Not Found" description="The requested category could not be found." />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('common.error')}</h1>
                <Link to="/" className="text-blue-600 hover:underline">{t('nav.home')}</Link>
            </div>
        );
    }

    const displayTitle = translationKeys ? t(translationKeys.titleKey) : data.title;
    const displayDesc = translationKeys ? t(translationKeys.descKey) : data.description;

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={`${displayTitle} ${t('nav.calculators')} - Free Online Tools`}
                description={`Free ${displayTitle.toLowerCase()} calculators and tools. ${displayDesc} Accurate, easy-to-use, no signup required.`}
                keywords={`${displayTitle.toLowerCase()} calculator, ${displayTitle.toLowerCase()} tools, free online calculators`}
                canonicalUrl={`/category/${id}`}
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: t('nav.categories'), href: '/all-tools' }, { label: displayTitle }]} />

                <AdSlot id="category-top-banner" className="mb-8" />

                <CategoryHeader 
                    title={data.title} 
                    description={data.description}
                    titleKey={translationKeys?.titleKey}
                    descKey={translationKeys?.descKey}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {data.tools.length > 0 ? (
                            <ToolList tools={data.tools} categoryId={id || 'salary-tax'} />
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">{t('common.noResults')}</p>
                            </div>
                        )}
                    </div>

                    <div className="hidden lg:block space-y-8">
                        {/* Sidebar Ad */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
                            <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Advertisement</h4>
                            <AdSlot id="sidebar-ad" className="h-[600px]" label="Advertisement" />
                        </div>
                    </div>
                </div>

                <RelatedCategories currentCategory={data.title} />
            </div>
        </div>
    );
};
