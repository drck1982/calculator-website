import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator, ArrowRight, Filter } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { toolsByCategory, getAllTools } from '../data/tools';
import { useLanguage } from '../contexts/LanguageContext';
import { toolTranslationKeys, tagTranslationKeys } from '../data/translationKeys';

// Category translation key mapping
const categoryKeyMap: Record<string, string> = {
    'salary-tax': 'cat.finance',
    'finance': 'cat.business',
    'loans-debt': 'cat.loansDebt',
    'investment': 'cat.investment',
    'health': 'cat.health',
    'math': 'cat.math',
    'geometry': 'cat.geometry',
    'conversion': 'cat.conversion',
    'everyday-life': 'cat.everydayLife',
    'biology': 'cat.biology',
    'chemistry': 'cat.chemistry',
    'physics': 'cat.physics',
    'sports': 'cat.sports',
    'statistics': 'cat.statistics',
    'other': 'cat.other',
};

// Helper: convert kebab-case id to camelCase key (paycheck-calculator -> paycheckCalculator)
const toCamelKey = (id: string) =>
    id
        .split('-')
        .map((part, idx) => (idx === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
        .join('');



export const AllTools: React.FC = () => {
    const { t, language } = useLanguage();

    // Debug logging
    React.useEffect(() => {
        console.log('[AllTools Debug] Language changed to:', language);
    }, [language]);
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

    // Translate tools (name, description, tags) on each render
    const translatedTools = filteredTools.map((tool) => ({
        ...tool,
        translatedName: getToolName(tool.id, tool.name),
        translatedDesc: getToolDesc(tool.id, tool.description),
        translatedTags: tool.tags.map(getTagName),
    }));

    const getCategoryTitle = (categoryId: string) => {
        const key = categoryKeyMap[categoryId];
        if (key) {
            const translated = t(key);
            if (translated) return translated;
        }
        return toolsByCategory[categoryId]?.title || categoryId;
    };

    // Get translated tool name
    const getToolName = (toolId: string, originalName: string): string => {
        const keys = toolTranslationKeys[toolId];
        const derivedKey = `tool.${toCamelKey(toolId)}`;

        // Debug log for specific tool to avoid spamming
        if (toolId === 'paycheck-calculator') {
            console.log(`[AllTools Debug] Translating ${toolId} to ${language}`);
            console.log(`[AllTools Debug] Keys:`, keys);
            console.log(`[AllTools Debug] Derived Key:`, derivedKey);
        }

        // 1) Prefer explicit mapping
        if (keys) {
            const translated = t(keys.nameKey);
            if (toolId === 'paycheck-calculator') console.log(`[AllTools Debug] Explicit translation: ${translated}`);
            if (translated && translated !== keys.nameKey) return translated;
        }

        // 2) Try derived key from tool id
        const derived = t(derivedKey);
        if (toolId === 'paycheck-calculator') console.log(`[AllTools Debug] Derived translation: ${derived}`);
        if (derived && derived !== derivedKey) return derived;

        // 3) Fallback original
        return originalName;
    };

    // Get translated tool description
    const getToolDesc = (toolId: string, originalDesc: string): string => {
        const keys = toolTranslationKeys[toolId];
        const derivedKey = `tool.${toCamelKey(toolId)}.desc`;

        // 1) Prefer explicit mapping
        if (keys) {
            const translated = t(keys.descKey);
            if (translated && translated !== keys.descKey) return translated;
        }

        // 2) Try derived key from tool id
        const derived = t(derivedKey);
        if (derived && derived !== derivedKey) return derived;

        // 3) Fallback original
        return originalDesc;
    };

    // Get translated tag
    const getTagName = (tag: string): string => {
        const key = tagTranslationKeys[tag.toLowerCase()];
        const derivedKey = `tag.${tag.toLowerCase()}`;

        // 1) Prefer explicit mapping
        if (key) {
            const translated = t(key);
            if (translated && translated !== key) return translated;
        }

        // 2) Try derived key
        const derived = t(derivedKey);
        if (derived && derived !== derivedKey) return derived;

        // 3) Fallback original
        return tag;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <SEO
                title={`${t('allTools.title')} - Browse 80+ Free Online Tools`}
                description={t('allTools.subtitle')}
                keywords="all calculators, free online tools, calculator collection, finance calculator, health calculator, math tools, unit converter"
                canonicalUrl="/all-tools"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: t('allTools.title') }]} />

                {/* Header */}
                <div className="text-center py-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {t('allTools.title')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t('allTools.subtitle')} ({allTools.length}+)
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
                                    placeholder={t('allTools.searchPlaceholder')}
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
                                    <option value="all">{t('allTools.allCategories')}</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{getCategoryTitle(cat)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 text-sm text-gray-500">
                            {t('allTools.showing')} {filteredTools.length} {filteredTools.length !== 1 ? t('allTools.calculators') : t('allTools.calculator')}
                            {selectedCategory !== 'all' && ` ${t('allTools.in')} ${getCategoryTitle(selectedCategory)}`}
                            {searchQuery && ` ${t('allTools.matching')} "${searchQuery}"`}
                        </div>
                    </div>
                </div>

                <AdSlot id="all-tools-top" className="mb-8" />

                {/* Tools Grid */}
                <div className="max-w-6xl mx-auto">
                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {translatedTools.map((tool, index) => (
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
                                                    {tool.translatedTags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                                    {tool.translatedName}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                                    {tool.translatedDesc}
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
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('allTools.noFound')}</h3>
                            <p className="text-gray-500 mb-6">
                                {t('allTools.tryAdjusting')}
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {t('allTools.clearFilters')}
                            </button>
                        </div>
                    )}
                </div>

                {/* Category Quick Links */}
                <div className="max-w-6xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('allTools.browseByCategory')}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setSearchQuery('');
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className={`p-4 rounded-xl border text-left transition-all ${selectedCategory === cat
                                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                                        : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                                    }`}
                            >
                                <div className="font-medium text-sm truncate">
                                    {getCategoryTitle(cat)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {toolsByCategory[cat]?.tools.length || 0} {t('allTools.tools')}
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
