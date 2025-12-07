import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Menu, Search, X, ChevronRight } from 'lucide-react';
import { getAllTools, type ToolSummary } from '../../data/tools';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';

export const Header: React.FC = () => {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<ToolSummary[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const allTools = getAllTools();

    // Handle search
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const lowerQuery = searchQuery.toLowerCase();
        const filtered = allTools.filter(tool =>
            tool.name.toLowerCase().includes(lowerQuery) ||
            tool.description.toLowerCase().includes(lowerQuery) ||
            tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        ).slice(0, 5);

        setSearchResults(filtered);
    }, [searchQuery]);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">WorkMoney Tools</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/category/salary-tax" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        {t('footer.salaryTax')}
                    </Link>
                    <Link to="/category/loans-debt" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        {t('footer.loansDebt')}
                    </Link>
                    <Link to="/category/investment" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        {t('footer.investment')}
                    </Link>
                    <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        {t('nav.about')}
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center space-x-1">
                    {/* Language Switcher */}
                    <LanguageSwitcher />
                    
                    {/* Search */}
                    <div className="relative" ref={searchRef}>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Search"
                        >
                            {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                        </button>

                        {/* Search Dropdown */}
                        {isSearchOpen && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                                <div className="p-3 border-b border-gray-100">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={t('nav.search')}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                {searchQuery.trim() !== '' && (
                                    <div className="max-h-64 overflow-y-auto">
                                        {searchResults.length > 0 ? (
                                            <ul>
                                                {searchResults.map((tool) => (
                                                    <li key={tool.id} className="border-b border-gray-50 last:border-0">
                                                        <Link
                                                            to={tool.link}
                                                            className="block px-4 py-3 hover:bg-blue-50 transition-colors"
                                                            onClick={() => {
                                                                setIsSearchOpen(false);
                                                                setSearchQuery('');
                                                            }}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900 text-sm">{tool.name}</h4>
                                                                    <p className="text-xs text-gray-500 mt-0.5">{tool.description}</p>
                                                                </div>
                                                                <ChevronRight className="w-4 h-4 text-gray-300" />
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="px-4 py-6 text-center text-gray-500 text-sm">
                                                {t('common.noResults')}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <nav className="container mx-auto px-4 py-4 space-y-1">
                        <Link
                            to="/category/salary-tax"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('footer.salaryTax')}
                        </Link>
                        <Link
                            to="/category/loans-debt"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('footer.loansDebt')}
                        </Link>
                        <Link
                            to="/category/investment"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('footer.investment')}
                        </Link>
                        <Link
                            to="/category/health"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('cat.health')}
                        </Link>
                        <Link
                            to="/category/math"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('cat.math')}
                        </Link>
                        <Link
                            to="/category/conversion"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('cat.conversion')}
                        </Link>
                        <div className="border-t border-gray-100 my-2"></div>
                        <Link
                            to="/all-tools"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.allTools')}
                        </Link>
                        <Link
                            to="/about"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('footer.aboutUs')}
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t('nav.contact')}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};
