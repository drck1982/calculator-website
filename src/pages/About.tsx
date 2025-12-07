import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Calculator, Users, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={`${t('nav.about')} - WorkMoney Tools`}
                description={t('about.subtitle')}
                keywords="about workmoney tools, free calculators, online tools, calculator website"
                canonicalUrl="/about"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: t('nav.about') }]} />

                {/* Hero Section */}
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
                        <Calculator className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('about.title')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('about.subtitle')}
                    </p>
                </div>

                {/* Mission Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('about.mission')}</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {t('about.missionText')}
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-5xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">{t('about.whyChoose')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                                <Zap className="h-7 w-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('about.fast')}</h3>
                            <p className="text-gray-600">
                                {t('about.fastDesc')}
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-4">
                                <Users className="h-7 w-7 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('about.userFriendly')}</h3>
                            <p className="text-gray-600">
                                {t('about.userFriendlyDesc')}
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-xl mb-4">
                                <Shield className="h-7 w-7 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('about.privacy')}</h3>
                            <p className="text-gray-600">
                                {t('about.privacyDesc')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">80+</div>
                            <div className="text-gray-600 text-sm">{t('about.calculators')}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">15</div>
                            <div className="text-gray-600 text-sm">{t('about.categories')}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                            <div className="text-gray-600 text-sm">{t('about.free')}</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">0</div>
                            <div className="text-gray-600 text-sm">{t('about.dataCollected')}</div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="max-w-3xl mx-auto text-center pb-16">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">{t('about.disclaimer')}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {t('about.disclaimerText')}
                    </p>
                </div>
            </div>
        </div>
    );
};
