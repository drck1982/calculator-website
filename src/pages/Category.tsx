import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CategoryHeader } from '../components/category/CategoryHeader';
import { ToolList } from '../components/category/ToolList';
import { RelatedCategories } from '../components/category/RelatedCategories';
import { AdSlot } from '../components/common/AdSlot';

// Mock data - in a real app this would come from an API or config
import { toolsByCategory as categoryData } from '../data/tools';

export const Category: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const data = categoryData[id || 'salary-tax'] || {
        title: 'Category Not Found',
        description: 'Sorry, we couldn\'t find the category you are looking for.',
        tools: []
    };

    return (
        <div className="bg-white min-h-screen pb-20">
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
                            <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                                Vertical Ad Unit
                            </div>
                        </div>
                    </div>
                </div>

                <RelatedCategories currentCategory={data.title} />
            </div>
        </div>
    );
};
