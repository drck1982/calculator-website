import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calculator, Home, TrendingUp, Activity, Moon, Lock, Utensils, GraduationCap, ArrowRight, DollarSign, Scale, Calendar } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

// Ordered by search volume (highest first)
const popularTools = [
    {
        nameKey: 'popular.paycheck',
        descKey: 'popular.paycheck.desc',
        categoryKey: 'popular.cat.salary',
        icon: DollarSign,
        color: 'text-green-600 bg-green-50',
        link: '/tools/paycheck-calculator'
    },
    {
        nameKey: 'popular.mortgage',
        descKey: 'popular.mortgage.desc',
        categoryKey: 'popular.cat.loans',
        icon: Home,
        color: 'text-indigo-600 bg-indigo-50',
        link: '/tools/mortgage-calculator'
    },
    {
        nameKey: 'popular.bmi',
        descKey: 'popular.bmi.desc',
        categoryKey: 'popular.cat.health',
        icon: Scale,
        color: 'text-rose-600 bg-rose-50',
        link: '/tools/bmi-calculator'
    },
    {
        nameKey: 'popular.tip',
        descKey: 'popular.tip.desc',
        categoryKey: 'popular.cat.everyday',
        icon: Utensils,
        color: 'text-orange-600 bg-orange-50',
        link: '/tools/tip-calculator'
    },
    {
        nameKey: 'popular.gpa',
        descKey: 'popular.gpa.desc',
        categoryKey: 'popular.cat.education',
        icon: GraduationCap,
        color: 'text-purple-600 bg-purple-50',
        link: '/tools/gpa-calculator'
    },
    {
        nameKey: 'popular.age',
        descKey: 'popular.age.desc',
        categoryKey: 'popular.cat.tools',
        icon: Calendar,
        color: 'text-cyan-600 bg-cyan-50',
        link: '/tools/age-calculator'
    },
    {
        nameKey: 'popular.sleep',
        descKey: 'popular.sleep.desc',
        categoryKey: 'popular.cat.health',
        icon: Moon,
        color: 'text-violet-600 bg-violet-50',
        link: '/tools/sleep-calculator'
    },
    {
        nameKey: 'popular.password',
        descKey: 'popular.password.desc',
        categoryKey: 'popular.cat.security',
        icon: Lock,
        color: 'text-red-600 bg-red-50',
        link: '/tools/password-generator'
    },
    {
        nameKey: 'popular.compound',
        descKey: 'popular.compound.desc',
        categoryKey: 'popular.cat.investment',
        icon: TrendingUp,
        color: 'text-emerald-600 bg-emerald-50',
        link: '/tools/compound-interest-calculator'
    },
    {
        nameKey: 'popular.bodyFat',
        descKey: 'popular.bodyFat.desc',
        categoryKey: 'popular.cat.fitness',
        icon: Activity,
        color: 'text-amber-600 bg-amber-50',
        link: '/tools/body-fat-calculator'
    },
    {
        nameKey: 'popular.homeAfford',
        descKey: 'popular.homeAfford.desc',
        categoryKey: 'popular.cat.finance',
        icon: Home,
        color: 'text-blue-600 bg-blue-50',
        link: '/tools/home-affordability'
    },
    {
        nameKey: 'popular.studentLoan',
        descKey: 'popular.studentLoan.desc',
        categoryKey: 'popular.cat.loans',
        icon: Calculator,
        color: 'text-teal-600 bg-teal-50',
        link: '/tools/student-loan-calculator'
    }
];

export const PopularTools: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-3">
                        <div className="bg-yellow-100 p-2.5 rounded-xl shadow-sm rotate-3">
                            <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('popular.title')}</h2>
                            <p className="text-gray-500 mt-1">{t('popular.subtitle')}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularTools.map((tool, index) => (
                        <Link
                            key={index}
                            to={tool.link}
                            className="group relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-xl ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <tool.icon className="h-6 w-6" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            {t(tool.categoryKey)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {t(tool.nameKey)}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {t(tool.descKey)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
