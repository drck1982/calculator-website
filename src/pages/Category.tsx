import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CategoryHeader } from '../components/category/CategoryHeader';
import { ToolList } from '../components/category/ToolList';
import { RelatedCategories } from '../components/category/RelatedCategories';
import { AdSlot } from '../components/common/AdSlot';
import { SEO } from '../components/common/SEO';
import { toolsByCategory } from '../data/tools';

export const Category: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const data = toolsByCategory[id || 'salary-tax'];

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <SEO title="Category Not Found" description="The requested category could not be found." />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
                <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={`${data.title} Calculators - Free Online Tools`}
                description={`Free ${data.title.toLowerCase()} calculators and tools. ${data.description} Accurate, easy-to-use, no signup required.`}
                keywords={`${data.title.toLowerCase()} calculator, ${data.title.toLowerCase()} tools, free online calculators, ${data.title.toLowerCase()} calculation`}
                canonicalUrl={`/category/${id}`}
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: 'Categories', href: '/all-tools' }, { label: data.title }]} />

                <AdSlot id="category-top-banner" className="mb-8" />

                <CategoryHeader title={data.title} description={data.description} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {data.tools.length > 0 ? (
                            <ToolList tools={data.tools} />
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No tools available in this category yet.</p>
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
