import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Calculator className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-gray-900">WorkMoney Tools</span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Smart calculators for your salary, loans, and investments. Make better financial decisions with our free tools.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">{t('footer.calculators')}</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/category/salary-tax" className="hover:text-blue-600">{t('footer.salaryTax')}</Link></li>
                            <li><Link to="/category/loans-debt" className="hover:text-blue-600">{t('footer.loansDebt')}</Link></li>
                            <li><Link to="/category/investment" className="hover:text-blue-600">{t('footer.investment')}</Link></li>
                            <li><Link to="/all-tools" className="hover:text-blue-600">{t('nav.allTools')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">{t('footer.company')}</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/about" className="hover:text-blue-600">{t('footer.aboutUs')}</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-600">{t('nav.contact')}</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-600">{t('footer.privacy')}</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-600">{t('footer.terms')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Disclaimer</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {t('footer.disclaimer')}
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} WorkMoney Tools. {t('footer.copyright')}
                </div>
            </div>
        </footer>
    );
};
