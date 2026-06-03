import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllTools, type ToolSummary } from '../../data/tools';
import { useLanguage } from '../../contexts/LanguageContext';
import { rankToolsForSearch } from '../../data/searchRanking';
import { trackEvent } from '../../utils/analytics';

export const Hero: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ToolSummary[]>([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLFormElement>(null);

    const allTools = getAllTools();

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = allTools.filter(tool =>
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
        const ranked = rankToolsForSearch(filtered, query).slice(0, 5);

        setResults(ranked);
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;

        trackEvent('hero_search_submit', { query_length: trimmed.length });
        setShowResults(false);
        navigate(`/all-tools?search=${encodeURIComponent(trimmed)}`);
    };

    return (
        <section className="relative overflow-hidden bg-white py-20 md:py-28">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-indigo-50/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100">
                    <span className="text-sm font-semibold text-blue-700 tracking-wide uppercase">{t('hero.badge')}</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                    {t('hero.title1')} <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        {t('hero.title2')}
                    </span>
                </h1>

                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    {t('hero.subtitle')}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                    <Link
                        to="/all-tools"
                        onClick={() => trackEvent('hero_primary_cta_click', { target: 'all_tools' })}
                        className="inline-flex items-center justify-center px-7 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        {t('nav.allTools')}
                    </Link>
                    <Link
                        to="/tools/paycheck-calculator"
                        onClick={() => trackEvent('hero_primary_cta_click', { target: 'paycheck_calculator' })}
                        className="inline-flex items-center justify-center px-7 py-3 bg-white text-blue-700 font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                        Start with Paycheck Calculator
                    </Link>
                </div>

                {/* Search Bar */}
                <form className="max-w-2xl mx-auto relative mb-10" ref={searchRef} onSubmit={handleSearchSubmit}>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                        <div className="relative bg-white rounded-xl shadow-xl ring-1 ring-gray-900/5">
                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                <Search className="h-6 w-6 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-14 pr-4 py-5 bg-transparent border-0 rounded-xl text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                placeholder={t('hero.searchPlaceholder')}
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setShowResults(true);
                                }}
                                onFocus={() => setShowResults(true)}
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-2 my-2 px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Search Results Dropdown */}
                    {showResults && query.trim() !== '' && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left">
                            {results.length > 0 ? (
                                <>
                                    <ul>
                                        {results.map((tool) => (
                                            <li key={tool.id} className="border-b border-gray-50 last:border-0">
                                                <Link
                                                    to={tool.link}
                                                    className="block px-6 py-4 hover:bg-blue-50 transition-colors group"
                                                    onClick={() => {
                                                        trackEvent('hero_search_result_click', { tool_id: tool.id });
                                                        setShowResults(false);
                                                    }}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-700">{tool.name}</h4>
                                                            <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500" />
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="border-t border-gray-100 bg-gray-50/80 px-4 py-3 text-center">
                                        <Link
                                            to={`/all-tools?search=${encodeURIComponent(query.trim())}`}
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                                            onClick={() => {
                                                trackEvent('hero_search_view_all_click', { query_length: query.trim().length });
                                                setShowResults(false);
                                            }}
                                        >
                                            View all matching tools
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="px-6 py-8 text-center text-gray-500 space-y-3">
                                    <p>No calculators found for "{query}"</p>
                                    <Link
                                        to={`/all-tools?search=${encodeURIComponent(query.trim())}`}
                                        className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-800"
                                        onClick={() => {
                                            trackEvent('hero_search_empty_browse_click', { query_length: query.trim().length });
                                            setShowResults(false);
                                        }}
                                    >
                                        Browse all tools with this search
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </form>

                {/* Quick Links - Ordered by search volume */}
                <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
                    <span className="text-sm font-medium text-gray-500 py-2">{t('hero.trending')}</span>
                    <Link to="/tools/paycheck-calculator" onClick={() => trackEvent('hero_trending_tool_click', { tool_id: 'paycheck-calculator' })} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm hover:shadow">
                        Paycheck
                    </Link>
                    <Link to="/tools/mortgage-calculator" onClick={() => trackEvent('hero_trending_tool_click', { tool_id: 'mortgage-calculator' })} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm hover:shadow">
                        Mortgage
                    </Link>
                    <Link to="/tools/tip-calculator" onClick={() => trackEvent('hero_trending_tool_click', { tool_id: 'tip-calculator' })} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm hover:shadow">
                        Tip
                    </Link>
                    <Link to="/tools/bmi-calculator" onClick={() => trackEvent('hero_trending_tool_click', { tool_id: 'bmi-calculator' })} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm hover:shadow">
                        BMI
                    </Link>
                    <Link to="/tools/gpa-calculator" onClick={() => trackEvent('hero_trending_tool_click', { tool_id: 'gpa-calculator' })} className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm hover:shadow">
                        GPA
                    </Link>
                </div>
            </div>
        </section>
    );
};
