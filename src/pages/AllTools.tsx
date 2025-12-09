import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator, ArrowRight, Filter } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdSlot } from '../components/common/AdSlot';
import { toolsByCategory, getAllTools } from '../data/tools';
import { useLanguage } from '../contexts/LanguageContext';

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

// Tool translation key mapping (same as ToolList.tsx)
const toolTranslationKeys: Record<string, { nameKey: string; descKey: string }> = {
    'paycheck-calculator': { nameKey: 'tool.paycheckCalculator', descKey: 'tool.paycheckCalculator.desc' },
    'federal-tax-calculator': { nameKey: 'tool.federalTaxCalculator', descKey: 'tool.federalTaxCalculator.desc' },
    'bonus-tax-calculator': { nameKey: 'tool.bonusTaxCalculator', descKey: 'tool.bonusTaxCalculator.desc' },
    'hourly-to-salary': { nameKey: 'tool.hourlyToSalary', descKey: 'tool.hourlyToSalary.desc' },
    'ny-salary-tax-calculator': { nameKey: 'tool.nySalaryTaxCalculator', descKey: 'tool.nySalaryTaxCalculator.desc' },
    'mortgage-calculator': { nameKey: 'tool.mortgageCalculator', descKey: 'tool.mortgageCalculator.desc' },
    'student-loan-calculator': { nameKey: 'tool.studentLoanCalculator', descKey: 'tool.studentLoanCalculator.desc' },
    'auto-loan-calculator': { nameKey: 'tool.autoLoanCalculator', descKey: 'tool.autoLoanCalculator.desc' },
    'credit-card-payoff': { nameKey: 'tool.creditCardPayoff', descKey: 'tool.creditCardPayoff.desc' },
    'debt-payoff-calculator': { nameKey: 'tool.debtPayoffCalculator', descKey: 'tool.debtPayoffCalculator.desc' },
    'refinance-calculator': { nameKey: 'tool.refinanceCalculator', descKey: 'tool.refinanceCalculator.desc' },
    'lease-vs-buy-car': { nameKey: 'tool.leaseVsBuyCar', descKey: 'tool.leaseVsBuyCar.desc' },
    'amortization-calculator': { nameKey: 'tool.amortizationCalculator', descKey: 'tool.amortizationCalculator.desc' },
    'compound-interest-calculator': { nameKey: 'tool.compoundInterestCalculator', descKey: 'tool.compoundInterestCalculator.desc' },
    '401k-calculator': { nameKey: 'tool.401kCalculator', descKey: 'tool.401kCalculator.desc' },
    'inflation-calculator': { nameKey: 'tool.inflationCalculator', descKey: 'tool.inflationCalculator.desc' },
    'bmi-calculator': { nameKey: 'tool.bmiCalculator', descKey: 'tool.bmiCalculator.desc' },
    'calorie-calculator': { nameKey: 'tool.calorieCalculator', descKey: 'tool.calorieCalculator.desc' },
    'body-fat-calculator': { nameKey: 'tool.bodyFatCalculator', descKey: 'tool.bodyFatCalculator.desc' },
    'sleep-calculator': { nameKey: 'tool.sleepCalculator', descKey: 'tool.sleepCalculator.desc' },
    'pregnancy-calculator': { nameKey: 'tool.pregnancyCalculator', descKey: 'tool.pregnancyCalculator.desc' },
    'ideal-weight-calculator': { nameKey: 'tool.idealWeightCalculator', descKey: 'tool.idealWeightCalculator.desc' },
    'tdee-calculator': { nameKey: 'tool.tdeeCalculator', descKey: 'tool.tdeeCalculator.desc' },
    'water-intake-calculator': { nameKey: 'tool.waterIntakeCalculator', descKey: 'tool.waterIntakeCalculator.desc' },
    'macro-calculator': { nameKey: 'tool.macroCalculator', descKey: 'tool.macroCalculator.desc' },
    'one-rep-max-calculator': { nameKey: 'tool.oneRepMaxCalculator', descKey: 'tool.oneRepMaxCalculator.desc' },
    'bac-calculator': { nameKey: 'tool.bacCalculator', descKey: 'tool.bacCalculator.desc' },
    'smoking-cost-calculator': { nameKey: 'tool.smokingCostCalculator', descKey: 'tool.smokingCostCalculator.desc' },
    'age-calculator': { nameKey: 'tool.ageCalculator', descKey: 'tool.ageCalculator.desc' },
    'percentage-calculator': { nameKey: 'tool.percentageCalculator', descKey: 'tool.percentageCalculator.desc' },
    'binary-calculator': { nameKey: 'tool.binaryCalculator', descKey: 'tool.binaryCalculator.desc' },
    'hex-calculator': { nameKey: 'tool.hexCalculator', descKey: 'tool.hexCalculator.desc' },
    'prime-calculator': { nameKey: 'tool.primeCalculator', descKey: 'tool.primeCalculator.desc' },
    'gcf-lcm-calculator': { nameKey: 'tool.gcfLcmCalculator', descKey: 'tool.gcfLcmCalculator.desc' },
    'slope-calculator': { nameKey: 'tool.slopeCalculator', descKey: 'tool.slopeCalculator.desc' },
    'circle-calculator': { nameKey: 'tool.circleCalculator', descKey: 'tool.circleCalculator.desc' },
    'triangle-calculator': { nameKey: 'tool.triangleCalculator', descKey: 'tool.triangleCalculator.desc' },
    'pythagorean-calculator': { nameKey: 'tool.pythagoreanCalculator', descKey: 'tool.pythagoreanCalculator.desc' },
    'tile-calculator': { nameKey: 'tool.tileCalculator', descKey: 'tool.tileCalculator.desc' },
    'paint-calculator': { nameKey: 'tool.paintCalculator', descKey: 'tool.paintCalculator.desc' },
    'wallpaper-calculator': { nameKey: 'tool.wallpaperCalculator', descKey: 'tool.wallpaperCalculator.desc' },
    'concrete-calculator': { nameKey: 'tool.concreteCalculator', descKey: 'tool.concreteCalculator.desc' },
    'currency-converter': { nameKey: 'tool.currencyConverter', descKey: 'tool.currencyConverter.desc' },
    'length-converter': { nameKey: 'tool.lengthConverter', descKey: 'tool.lengthConverter.desc' },
    'weight-converter': { nameKey: 'tool.weightConverter', descKey: 'tool.weightConverter.desc' },
    'temperature-converter': { nameKey: 'tool.temperatureConverter', descKey: 'tool.temperatureConverter.desc' },
    'speed-converter': { nameKey: 'tool.speedConverter', descKey: 'tool.speedConverter.desc' },
    'volume-converter': { nameKey: 'tool.volumeConverter', descKey: 'tool.volumeConverter.desc' },
    'area-converter': { nameKey: 'tool.areaConverter', descKey: 'tool.areaConverter.desc' },
    'date-calculator': { nameKey: 'tool.dateCalculator', descKey: 'tool.dateCalculator.desc' },
    'tip-calculator': { nameKey: 'tool.tipCalculator', descKey: 'tool.tipCalculator.desc' },
    'gas-mileage-calculator': { nameKey: 'tool.gasMileageCalculator', descKey: 'tool.gasMileageCalculator.desc' },
    'travel-time-calculator': { nameKey: 'tool.travelTimeCalculator', descKey: 'tool.travelTimeCalculator.desc' },
    'time-zone-converter': { nameKey: 'tool.timeZoneConverter', descKey: 'tool.timeZoneConverter.desc' },
    'grade-calculator': { nameKey: 'tool.gradeCalculator', descKey: 'tool.gradeCalculator.desc' },
    'gpa-calculator': { nameKey: 'tool.gpaCalculator', descKey: 'tool.gpaCalculator.desc' },
    'password-generator': { nameKey: 'tool.passwordGenerator', descKey: 'tool.passwordGenerator.desc' },
    'qr-code-generator': { nameKey: 'tool.qrCodeGenerator', descKey: 'tool.qrCodeGenerator.desc' },
    'word-counter': { nameKey: 'tool.wordCounter', descKey: 'tool.wordCounter.desc' },
    'unit-price-calculator': { nameKey: 'tool.unitPriceCalculator', descKey: 'tool.unitPriceCalculator.desc' },
    'random-number': { nameKey: 'tool.randomNumber', descKey: 'tool.randomNumber.desc' },
    'home-affordability': { nameKey: 'tool.homeAffordability', descKey: 'tool.homeAffordability.desc' },
    'net-worth-calculator': { nameKey: 'tool.netWorthCalculator', descKey: 'tool.netWorthCalculator.desc' },
    'rent-vs-buy-calculator': { nameKey: 'tool.rentVsBuyCalculator', descKey: 'tool.rentVsBuyCalculator.desc' },
    'savings-goal-calculator': { nameKey: 'tool.savingsGoalCalculator', descKey: 'tool.savingsGoalCalculator.desc' },
    'emergency-fund-calculator': { nameKey: 'tool.emergencyFundCalculator', descKey: 'tool.emergencyFundCalculator.desc' },
    'roi-calculator': { nameKey: 'tool.roiCalculator', descKey: 'tool.roiCalculator.desc' },
    'down-payment-calculator': { nameKey: 'tool.downPaymentCalculator', descKey: 'tool.downPaymentCalculator.desc' },
    'simple-interest-calculator': { nameKey: 'tool.simpleInterestCalculator', descKey: 'tool.simpleInterestCalculator.desc' },
    'apy-calculator': { nameKey: 'tool.apyCalculator', descKey: 'tool.apyCalculator.desc' },
    'margin-calculator': { nameKey: 'tool.marginCalculator', descKey: 'tool.marginCalculator.desc' },
    'break-even-calculator': { nameKey: 'tool.breakEvenCalculator', descKey: 'tool.breakEvenCalculator.desc' },
    'vat-calculator': { nameKey: 'tool.vatCalculator', descKey: 'tool.vatCalculator.desc' },
    'dna-replication': { nameKey: 'tool.dnaReplication', descKey: 'tool.dnaReplication.desc' },
    'allele-frequency': { nameKey: 'tool.alleleFrequency', descKey: 'tool.alleleFrequency.desc' },
    'molarity-calculator': { nameKey: 'tool.molarityCalculator', descKey: 'tool.molarityCalculator.desc' },
    'ph-calculator': { nameKey: 'tool.phCalculator', descKey: 'tool.phCalculator.desc' },
    'velocity-calculator': { nameKey: 'tool.velocityCalculator', descKey: 'tool.velocityCalculator.desc' },
    'pace-calculator': { nameKey: 'tool.paceCalculator', descKey: 'tool.paceCalculator.desc' },
    'standard-deviation': { nameKey: 'tool.standardDeviation', descKey: 'tool.standardDeviation.desc' },
};

// Tag translation keys
const tagTranslationKeys: Record<string, string> = {
    'salary': 'popular.cat.salary',
    'paycheck': 'popular.cat.salary',
    'tax': 'tag.tax',
    'loans': 'popular.cat.loans',
    'loan': 'tag.loan',
    'mortgage': 'tag.mortgage',
    'debt': 'tag.debt',
    'student': 'popular.cat.education',
    'health': 'popular.cat.health',
    'fitness': 'popular.cat.fitness',
    'education': 'popular.cat.education',
    'investment': 'popular.cat.investment',
    'finance': 'popular.cat.finance',
    'business': 'cat.business',
    'savings': 'popular.cat.finance',
    'planning': 'popular.cat.finance',
    'wealth': 'popular.cat.finance',
    'math': 'cat.math',
    'geometry': 'cat.geometry',
    'conversion': 'cat.conversion',
    'everyday': 'popular.cat.everyday',
    'security': 'popular.cat.security',
    'tools': 'popular.cat.tools',
    'money': 'popular.cat.finance',
    'real estate': 'cat.finance',
};

export const AllTools: React.FC = () => {
    const { t } = useLanguage();
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

    // Translate tools (name, description, tags) based on current language
    const translatedTools = useMemo(() => {
        return filteredTools.map((tool) => ({
            ...tool,
            translatedName: getToolName(tool.id, tool.name),
            translatedDesc: getToolDesc(tool.id, tool.description),
            translatedTags: tool.tags.map(getTagName),
        }));
    }, [filteredTools, language, t]);

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
        if (keys) {
            const translated = t(keys.nameKey);
            // Always return translation if it exists and is not empty
            if (translated) {
                return translated;
            }
        }
        return originalName;
    };

    // Get translated tool description
    const getToolDesc = (toolId: string, originalDesc: string): string => {
        const keys = toolTranslationKeys[toolId];
        if (keys) {
            const translated = t(keys.descKey);
            // Always return translation if it exists and is not empty
            if (translated) {
                return translated;
            }
        }
        return originalDesc;
    };

    // Get translated tag
    const getTagName = (tag: string): string => {
        const key = tagTranslationKeys[tag.toLowerCase()];
        if (key) {
            const translated = t(key);
            // Always return translation if it exists and is not empty
            if (translated) {
                return translated;
            }
        }
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
