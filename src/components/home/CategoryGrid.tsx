import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
    FinanceAIIcon, HealthAIIcon, MathAIIcon, ConversionAIIcon,
    BiologyAIIcon, ChemistryAIIcon, EverydayLifeAIIcon, PhysicsAIIcon,
    SportsAIIcon, StatisticsAIIcon, OtherAIIcon
} from '../icons/CategoryIcons';
import { useLanguage } from '../../contexts/LanguageContext';

const categories = [
    {
        id: 'salary-tax',
        nameKey: 'cat.finance',
        icon: FinanceAIIcon,
        descKey: 'cat.finance.desc',
        color: 'bg-blue-100 text-blue-600',
        toolKeys: ['tool.salaryCalculator', 'tool.mortgageCalc', 'tool.investmentReturn'],
        link: '/category/salary-tax'
    },
    {
        id: 'finance',
        nameKey: 'cat.business',
        icon: FinanceAIIcon,
        descKey: 'cat.business.desc',
        color: 'bg-indigo-100 text-indigo-600',
        toolKeys: ['tool.roiCalculator', 'tool.marginCalc', 'tool.breakEven'],
        link: '/category/finance'
    },
    {
        id: 'loans-debt',
        nameKey: 'cat.loansDebt',
        icon: FinanceAIIcon,
        descKey: 'cat.loansDebt.desc',
        color: 'bg-orange-100 text-orange-600',
        toolKeys: ['tool.mortgageCalc', 'tool.autoLoan', 'tool.amortization'],
        link: '/category/loans-debt'
    },
    {
        id: 'investment',
        nameKey: 'cat.investment',
        icon: FinanceAIIcon,
        descKey: 'cat.investment.desc',
        color: 'bg-emerald-100 text-emerald-600',
        toolKeys: ['tool.compoundInterest', 'tool.401kCalc', 'tool.inflation'],
        link: '/category/investment'
    },
    {
        id: 'health',
        nameKey: 'cat.health',
        icon: HealthAIIcon,
        descKey: 'cat.health.desc',
        color: 'bg-rose-100 text-rose-600',
        toolKeys: ['tool.bmiCalculator', 'tool.calorieCalc', 'tool.dueDate'],
        link: '/category/health'
    },
    {
        id: 'math',
        nameKey: 'cat.math',
        icon: MathAIIcon,
        descKey: 'cat.math.desc',
        color: 'bg-cyan-100 text-cyan-600',
        toolKeys: ['tool.percentageCalc', 'tool.binaryCalc', 'tool.primeNumbers'],
        link: '/category/math'
    },
    {
        id: 'geometry',
        nameKey: 'cat.geometry',
        icon: MathAIIcon,
        descKey: 'cat.geometry.desc',
        color: 'bg-teal-100 text-teal-600',
        toolKeys: ['tool.circleCalc', 'tool.triangleCalc', 'tool.paintCalculator'],
        link: '/category/geometry'
    },
    {
        id: 'conversion',
        nameKey: 'cat.conversion',
        icon: ConversionAIIcon,
        descKey: 'cat.conversion.desc',
        color: 'bg-gray-100 text-gray-600',
        toolKeys: ['tool.lengthConverter', 'tool.weightConverter', 'tool.currency'],
        link: '/category/conversion'
    },
    {
        id: 'everyday-life',
        nameKey: 'cat.everydayLife',
        icon: EverydayLifeAIIcon,
        descKey: 'cat.everydayLife.desc',
        color: 'bg-yellow-100 text-yellow-600',
        toolKeys: ['tool.ageCalculator', 'tool.dateDifference', 'tool.tipCalculator'],
        link: '/category/everyday-life'
    },
    {
        id: 'biology',
        nameKey: 'cat.biology',
        icon: BiologyAIIcon,
        descKey: 'cat.biology.desc',
        color: 'bg-green-100 text-green-600',
        toolKeys: ['tool.dnaReplication', 'tool.alleleFrequency'],
        link: '/category/biology'
    },
    {
        id: 'chemistry',
        nameKey: 'cat.chemistry',
        icon: ChemistryAIIcon,
        descKey: 'cat.chemistry.desc',
        color: 'bg-purple-100 text-purple-600',
        toolKeys: ['tool.molarityCalc', 'tool.phCalculator'],
        link: '/category/chemistry'
    },
    {
        id: 'physics',
        nameKey: 'cat.physics',
        icon: PhysicsAIIcon,
        descKey: 'cat.physics.desc',
        color: 'bg-violet-100 text-violet-600',
        toolKeys: ['tool.velocityCalculator'],
        link: '/category/physics'
    },
    {
        id: 'sports',
        nameKey: 'cat.sports',
        icon: SportsAIIcon,
        descKey: 'cat.sports.desc',
        color: 'bg-lime-100 text-lime-600',
        toolKeys: ['tool.paceCalculator'],
        link: '/category/sports'
    },
    {
        id: 'statistics',
        nameKey: 'cat.statistics',
        icon: StatisticsAIIcon,
        descKey: 'cat.statistics.desc',
        color: 'bg-slate-100 text-slate-600',
        toolKeys: ['tool.standardDeviation'],
        link: '/category/statistics'
    },
    {
        id: 'other',
        nameKey: 'cat.other',
        icon: OtherAIIcon,
        descKey: 'cat.other.desc',
        color: 'bg-pink-100 text-pink-600',
        toolKeys: ['tool.randomNumberGenerator'],
        link: '/category/other'
    }
];

export const CategoryGrid: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('categories.title')}</h2>
                    <Link to="/all-tools" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                        {t('categories.viewAll')} <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.link}
                            className="group block p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                        >
                            <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                                <category.icon size={48} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {t(category.nameKey)}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {t(category.descKey)}
                            </p>
                            <ul className="space-y-1">
                                {category.toolKeys.map((toolKey, index) => (
                                    <li key={index} className="text-sm text-gray-400 flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                                        {t(toolKey)}
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
