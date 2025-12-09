import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { AdSlot } from '../common/AdSlot';
import { useLanguage } from '../../contexts/LanguageContext';

interface Tool {
    id: string;
    name: string;
    description: string;
    link: string;
    tags: string[];
}

interface ToolListProps {
    tools: Tool[];
    categoryId?: string;
}

// Map tool IDs to translation keys
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

// Map tags to translation keys
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
    'bmi': 'tag.bmi',
    'calorie': 'tag.calorie',
    'percentage': 'tag.percentage',
    'binary': 'tag.binary',
};

export const ToolList: React.FC<ToolListProps> = ({ tools }) => {
    const { t, language } = useLanguage();
    
    const getToolName = (tool: Tool): string => {
        const keys = toolTranslationKeys[tool.id];
        if (keys && language !== 'en') {
            const translated = t(keys.nameKey);
            if (translated !== keys.nameKey) return translated;
        }
        return tool.name;
    };
    
    const getToolDesc = (tool: Tool): string => {
        const keys = toolTranslationKeys[tool.id];
        if (keys && language !== 'en') {
            const translated = t(keys.descKey);
            if (translated !== keys.descKey) return translated;
        }
        return tool.description;
    };
    
    const getTagName = (tag: string): string => {
        const key = tagTranslationKeys[tag.toLowerCase()];
        if (key && language !== 'en') {
            const translated = t(key);
            if (translated !== key) return translated;
        }
        return tag;
    };

    return (
        <div className="space-y-4">
            {tools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                    <Link
                        to={tool.link}
                        className="group block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-5">
                            {/* Icon Placeholder */}
                            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                <Calculator className="h-6 w-6" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex gap-2">
                                        {tool.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {getTagName(tag)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {getToolName(tool)}
                                </h3>

                                <p className="text-gray-500 leading-relaxed">
                                    {getToolDesc(tool)}
                                </p>
                            </div>

                            <div className="flex items-center self-center md:self-start mt-4 md:mt-0">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Insert Ad after 4th item */}
                    {index === 3 && <AdSlot id="category-list-ad" className="my-8" label="Sponsored" />}
                </React.Fragment>
            ))}
        </div>
    );
};
