import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Calculator, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../contexts/LanguageContext';

export const NotFound: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <SEO
                title={`404 - ${t('notFound.title')}`}
                description={t('notFound.message')}
                noindex={true}
            />
            
            <div className="text-center max-w-lg">
                {/* 404 Visual */}
                <div className="relative mb-8">
                    <div className="text-[150px] font-extrabold text-gray-100 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Calculator className="h-20 w-20 text-blue-500 opacity-60" />
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {t('notFound.title')}
                </h1>
                <p className="text-gray-600 mb-8">
                    {t('notFound.message')}
                </p>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <Home className="h-5 w-5 mr-2" />
                        {t('notFound.goHome')}
                    </Link>
                    <Link
                        to="/all-tools"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        <Search className="h-5 w-5 mr-2" />
                        {t('notFound.browseCalc')}
                    </Link>
                </div>
                
                {/* Popular Links */}
                <div className="text-left bg-gray-50 rounded-2xl p-6">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {t('notFound.popularCalc')}
                    </h2>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <Link to="/tools/ny-salary-tax-calculator" className="text-blue-600 hover:underline">
                            {t('footer.salaryTax')}
                        </Link>
                        <Link to="/tools/mortgage-calculator" className="text-blue-600 hover:underline">
                            {t('popular.mortgage')}
                        </Link>
                        <Link to="/tools/compound-interest-calculator" className="text-blue-600 hover:underline">
                            {t('popular.compound')}
                        </Link>
                        <Link to="/tools/bmi-calculator" className="text-blue-600 hover:underline">
                            {t('popular.bmi')}
                        </Link>
                        <Link to="/tools/tip-calculator" className="text-blue-600 hover:underline">
                            {t('popular.tip')}
                        </Link>
                        <Link to="/tools/age-calculator" className="text-blue-600 hover:underline">
                            {t('popular.age')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
