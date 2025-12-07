import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
    FinanceAIIcon, HealthAIIcon, MathAIIcon, ConversionAIIcon,
    BiologyAIIcon, ChemistryAIIcon, ConstructionAIIcon, EcologyAIIcon,
    EverydayLifeAIIcon, FoodAIIcon, PhysicsAIIcon, SportsAIIcon,
    StatisticsAIIcon, OtherAIIcon
} from '../icons/CategoryIcons';

const categories = [
    {
        id: 'salary-tax',
        name: 'Finance',
        icon: FinanceAIIcon,
        description: 'Salary, tax, investments, and retirement planning.',
        color: 'bg-blue-100 text-blue-600',
        tools: ['Salary Calculator', 'Mortgage Calc', 'Investment Return'],
        link: '/category/salary-tax'
    },
    {
        id: 'finance',
        name: 'Business',
        icon: FinanceAIIcon,
        description: 'ROI, margin, break-even, and business calculators.',
        color: 'bg-indigo-100 text-indigo-600',
        tools: ['ROI Calculator', 'Margin Calc', 'Break-Even'],
        link: '/category/finance'
    },
    {
        id: 'loans-debt',
        name: 'Loans & Debt',
        icon: FinanceAIIcon,
        description: 'Mortgage, auto loans, and amortization calculators.',
        color: 'bg-orange-100 text-orange-600',
        tools: ['Mortgage Calc', 'Auto Loan', 'Amortization'],
        link: '/category/loans-debt'
    },
    {
        id: 'investment',
        name: 'Investment',
        icon: FinanceAIIcon,
        description: 'Compound interest, 401k, and inflation calculators.',
        color: 'bg-emerald-100 text-emerald-600',
        tools: ['Compound Interest', '401k Calc', 'Inflation'],
        link: '/category/investment'
    },
    {
        id: 'health',
        name: 'Health',
        icon: HealthAIIcon,
        description: 'BMI, BMR, pregnancy, and fitness trackers.',
        color: 'bg-rose-100 text-rose-600',
        tools: ['BMI Calculator', 'Calorie Calc', 'Due Date'],
        link: '/category/health'
    },
    {
        id: 'math',
        name: 'Math',
        icon: MathAIIcon,
        description: 'Algebra, geometry, statistics, and matrices.',
        color: 'bg-cyan-100 text-cyan-600',
        tools: ['Percentage Calc', 'Binary Calc', 'Prime Numbers'],
        link: '/category/math'
    },
    {
        id: 'geometry',
        name: 'Geometry',
        icon: MathAIIcon,
        description: 'Calculate areas, volumes, and construction needs.',
        color: 'bg-teal-100 text-teal-600',
        tools: ['Circle Calc', 'Triangle Calc', 'Paint Calculator'],
        link: '/category/geometry'
    },
    {
        id: 'conversion',
        name: 'Conversion',
        icon: ConversionAIIcon,
        description: 'Convert length, weight, volume, temperature, and more.',
        color: 'bg-gray-100 text-gray-600',
        tools: ['Length Converter', 'Weight Converter', 'Currency'],
        link: '/category/conversion'
    },
    {
        id: 'everyday-life',
        name: 'Everyday Life',
        icon: EverydayLifeAIIcon,
        description: 'Time, date, shopping, and daily utilities.',
        color: 'bg-yellow-100 text-yellow-600',
        tools: ['Age Calculator', 'Date Difference', 'Tip Calculator'],
        link: '/category/everyday-life'
    },
    {
        id: 'biology',
        name: 'Biology',
        icon: BiologyAIIcon,
        description: 'Genetics, cell biology, and evolution calculators.',
        color: 'bg-green-100 text-green-600',
        tools: ['DNA Replication', 'Allele Frequency'],
        link: '/category/biology'
    },
    {
        id: 'chemistry',
        name: 'Chemistry',
        icon: ChemistryAIIcon,
        description: 'Molarity, pH, periodic table, and reactions.',
        color: 'bg-purple-100 text-purple-600',
        tools: ['Molarity Calc', 'pH Calculator'],
        link: '/category/chemistry'
    },
    {
        id: 'physics',
        name: 'Physics',
        icon: PhysicsAIIcon,
        description: 'Mechanics, thermodynamics, electricity, and waves.',
        color: 'bg-violet-100 text-violet-600',
        tools: ['Velocity Calc', 'Force Calc'],
        link: '/category/physics'
    },
    {
        id: 'sports',
        name: 'Sports',
        icon: SportsAIIcon,
        description: 'Running pace, cycling power, and scoreboards.',
        color: 'bg-lime-100 text-lime-600',
        tools: ['Pace Calculator', 'Race Time'],
        link: '/category/sports'
    },
    {
        id: 'statistics',
        name: 'Statistics',
        icon: StatisticsAIIcon,
        description: 'Probability, distributions, and data analysis.',
        color: 'bg-slate-100 text-slate-600',
        tools: ['Standard Deviation', 'Probability'],
        link: '/category/statistics'
    },
    {
        id: 'other',
        name: 'Other',
        icon: OtherAIIcon,
        description: 'Miscellaneous tools and fun calculators.',
        color: 'bg-pink-100 text-pink-600',
        tools: ['Random Number', 'Password Gen'],
        link: '/category/other'
    }
];

export const CategoryGrid: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Category</h2>
                    <Link to="/all-tools" className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                        View all <ArrowRight className="ml-1 h-4 w-4" />
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
                                {category.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                {category.description}
                            </p>
                            <ul className="space-y-1">
                                {category.tools.map((tool, index) => (
                                    <li key={index} className="text-sm text-gray-400 flex items-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
                                        {tool}
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
