import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calculator, Home, TrendingUp, Activity, Moon, Lock, Utensils, GraduationCap, ArrowRight, DollarSign, Scale, Calendar } from 'lucide-react';

// Ordered by search volume (highest first)
const popularTools = [
    {
        name: 'Paycheck Calculator',
        description: 'Calculate your take-home pay after taxes for any pay period.',
        category: 'Salary',
        icon: DollarSign,
        color: 'text-green-600 bg-green-50',
        link: '/tools/paycheck-calculator'
    },
    {
        name: 'Mortgage Calculator',
        description: 'Calculate monthly mortgage payments with taxes and insurance.',
        category: 'Loans',
        icon: Home,
        color: 'text-indigo-600 bg-indigo-50',
        link: '/tools/mortgage-calculator'
    },
    {
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index based on height and weight.',
        category: 'Health',
        icon: Scale,
        color: 'text-rose-600 bg-rose-50',
        link: '/tools/bmi-calculator'
    },
    {
        name: 'Tip Calculator',
        description: 'Calculate tip amount and split the bill among friends.',
        category: 'Everyday',
        icon: Utensils,
        color: 'text-orange-600 bg-orange-50',
        link: '/tools/tip-calculator'
    },
    {
        name: 'GPA Calculator',
        description: 'Calculate your Grade Point Average instantly.',
        category: 'Education',
        icon: GraduationCap,
        color: 'text-purple-600 bg-purple-50',
        link: '/tools/gpa-calculator'
    },
    {
        name: 'Age Calculator',
        description: 'Calculate exact age in years, months, and days.',
        category: 'Tools',
        icon: Calendar,
        color: 'text-cyan-600 bg-cyan-50',
        link: '/tools/age-calculator'
    },
    {
        name: 'Sleep Calculator',
        description: 'Find the best time to wake up based on sleep cycles.',
        category: 'Health',
        icon: Moon,
        color: 'text-violet-600 bg-violet-50',
        link: '/tools/sleep-calculator'
    },
    {
        name: 'Password Generator',
        description: 'Create strong, secure passwords instantly.',
        category: 'Security',
        icon: Lock,
        color: 'text-red-600 bg-red-50',
        link: '/tools/password-generator'
    },
    {
        name: 'Compound Interest',
        description: 'See how your investments grow over time.',
        category: 'Investment',
        icon: TrendingUp,
        color: 'text-emerald-600 bg-emerald-50',
        link: '/tools/compound-interest-calculator'
    },
    {
        name: 'Body Fat Calculator',
        description: 'Estimate your body fat percentage with the Navy method.',
        category: 'Fitness',
        icon: Activity,
        color: 'text-amber-600 bg-amber-50',
        link: '/tools/body-fat-calculator'
    },
    {
        name: 'Home Affordability',
        description: 'How much house can you afford based on income?',
        category: 'Finance',
        icon: Home,
        color: 'text-blue-600 bg-blue-50',
        link: '/tools/home-affordability'
    },
    {
        name: 'Student Loan Calculator',
        description: 'Plan your student loan repayment strategy.',
        category: 'Loans',
        icon: Calculator,
        color: 'text-teal-600 bg-teal-50',
        link: '/tools/student-loan-calculator'
    }
];

export const PopularTools: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-3">
                        <div className="bg-yellow-100 p-2.5 rounded-xl shadow-sm rotate-3">
                            <Star className="h-6 w-6 text-yellow-600 fill-yellow-600" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Popular Calculators</h2>
                            <p className="text-gray-500 mt-1">Most used tools by our community</p>
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
                                            {tool.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {tool.name}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {tool.description}
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
