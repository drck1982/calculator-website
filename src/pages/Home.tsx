import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { PopularTools } from '../components/home/PopularTools';
import { SeoTextBlock } from '../components/home/SeoTextBlock';
import { AdSlot } from '../components/common/AdSlot';

export const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
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
