import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { PopularTools } from '../components/home/PopularTools';
import { LatestArticles } from '../components/home/LatestArticles';
import { SeoTextBlock } from '../components/home/SeoTextBlock';
import { AdSlot } from '../components/common/AdSlot';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE_NAME, SITE_URL } from '../config/site';

export const Home: React.FC = () => {
    const { t } = useLanguage();
    const homeStructuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: `${SITE_URL}/`,
            potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_URL}/all-tools?search={search_term_string}`,
                'query-input': 'required name=search_term_string'
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: `${SITE_URL}/`
        }
    ];

    return (
        <div className="flex flex-col">
            <SEO
                title={t('seo.home.title')}
                description={t('seo.home.description')}
                keywords={t('seo.home.keywords')}
                canonicalUrl="/"
                structuredData={homeStructuredData}
            />
            <Hero />

            {/* Ad #1: Top banner - High visibility after hero */}
            <div className="container mx-auto px-4">
                <AdSlot id="home-top-banner" className="my-8" />
            </div>

            <CategoryGrid />

            {/* Ad #2: After categories - Prime position */}
            <div className="container mx-auto px-4">
                <AdSlot id="home-after-categories" className="my-8" />
            </div>

            <PopularTools />

            <LatestArticles />

            {/* Ad #3: After popular tools */}
            <div className="container mx-auto px-4">
                <AdSlot id="home-after-popular" className="my-8" />
            </div>

            <SeoTextBlock />

            {/* Ad #4: Bottom banner - Last impression */}
            <div className="container mx-auto px-4">
                <AdSlot id="home-bottom-banner" className="my-8 mb-12" />
            </div>
        </div>
    );
};
