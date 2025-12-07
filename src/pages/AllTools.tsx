import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator, ArrowRight, Filter } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { toolsByCategory, getAllTools } from '../data/tools';

export const AllTools: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const allTools = useMemo(() => getAllTools(), []);
    const categories = useMemo(() => Object.keys(toolsByCategory), []);

    const filteredTools = useMemo(() => {
        let tools = allTools;

        // Filter by category
        if (selectedCategory !== 'all') {
            tools = toolsByCategory[selectedCategory]?.tools || [];
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            tools = tools.filter(tool =>
                tool.name.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query) ||
                tool.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return tools;
    }, [allTools, selectedCategory, searchQuery]);

    const getCategoryTitle = (categoryId: string) => {
        return toolsByCategory[categoryId]?.title || categoryId;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <SEO
                title="All Calculators - Browse 50+ Free Online Tools"
                description="Browse our complete collection of 50+ free online calculators. Finance, health, math, conversion tools and more. Find the perfect calculator for your needs."
                keywords="all calculators, free online tools, calculator collection, finance calculator, health calculator, math tools, unit converter"
                canonicalUrl="/all-tools"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: 'All Calculators' }]} />

                {/* Header */}
                <div className="text-center py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        All Calculators
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Browse our complete collection of {allTools.length}+ free calculators
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search calculators..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative md:w-64">
                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{getCategoryTitle(cat)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 text-sm text-gray-500">
                            Showing {filteredTools.length} calculator{filteredTools.length !== 1 ? 's' : ''}
                            {selectedCategory !== 'all' && ` in ${getCategoryTitle(selectedCategory)}`}
                            {searchQuery && ` matching "${searchQuery}"`}
                        </div>
                    </div>
                </div>

                <AdSlot id="all-tools-top" className="mb-8" />

                {/* Tools Grid */}
                <div className="max-w-6xl mx-auto">
                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map((tool, index) => (
                                <React.Fragment key={tool.id}>
                                    <Link
                                        to={tool.link}
                                        className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors shrink-0">
                                                <Calculator className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {tool.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                                    {tool.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                    {tool.description}
                                                </p>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
                                        </div>
                                    </Link>

                                    {/* Insert ad after every 9 items */}
                                    {(index + 1) % 9 === 0 && index !== filteredTools.length - 1 && (
                                        <div className="col-span-full">
                                            <AdSlot id={`all-tools-grid-${index}`} className="my-4" />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                            <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No calculators found</h3>
                            <p className="text-gray-500 mb-6">
                                Try adjusting your search or filter criteria
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Category Quick Links */}
                <div className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setSearchQuery('');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`p-4 rounded-xl border text-left transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                                }`}
                            >
                                <div className="font-medium text-sm truncate">
                                    {getCategoryTitle(cat)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {toolsByCategory[cat]?.tools.length || 0} tools
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <AdSlot id="all-tools-bottom" className="mt-12 mb-8" />
            </div>
        </div>
    );
};

