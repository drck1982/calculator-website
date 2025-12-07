import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const SeoTextBlock: React.FC = () => {
    const { t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Why use WorkMoney Tools?</h2>
                    <p className="text-gray-600">
                        We provide free, accurate, and easy-to-use calculators to help you make smarter financial decisions.
                    </p>
                </div>

                <div className={`prose prose-blue max-w-none text-gray-600 ${!isExpanded ? 'line-clamp-3 mask-image-gradient' : ''}`}>
                    <p>
                        Whether you are planning for retirement, buying a home, or just trying to figure out your take-home pay,
                        WorkMoney Tools has you covered. Our suite of calculators covers everything from <strong>salary and tax calculations</strong>
                        to <strong>mortgage payments</strong> and <strong>investment growth</strong>.
                    </p>
                    <p>
                        Our tools are designed to be simple yet powerful. We break down complex financial formulas into easy-to-understand
                        inputs and results. You don't need to be a financial expert to understand your money. With our detailed explanations
                        and examples, you'll learn the "why" and "how" behind the numbers.
                    </p>
                    <h3>Salary & Tax Calculators</h3>
                    <p>
                        Understand your paycheck with our precise salary calculators. We factor in federal, state, and local taxes
                        to give you a clear picture of your net income. Perfect for job offers, raises, or moving to a new city.
                    </p>
                    <h3>Loan & Debt Management</h3>
                    <p>
                        Planning to buy a house or car? Use our loan calculators to estimate monthly payments, total interest,
                        and amortization schedules. See how extra payments can shorten your loan term and save you money.
                    </p>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                        {isExpanded ? (
                            <>{t('common.showLess')} <ChevronUp className="ml-1 h-4 w-4" /></>
                        ) : (
                            <>{t('common.readMore')} <ChevronDown className="ml-1 h-4 w-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};
