import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Terms: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={`${t('terms.title')} - WorkMoney Tools`}
                description={t('terms.important')}
                keywords="terms of service, terms and conditions, workmoney tools, calculator terms"
                canonicalUrl="/terms"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: t('terms.title') }]} />

                <div className="max-w-3xl mx-auto py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                            <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('terms.title')}</h1>
                        <p className="text-gray-600">{t('terms.lastUpdated')}</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-yellow-50 rounded-2xl p-6 mb-8">
                            <p className="text-yellow-800 font-medium">
                                <strong>{t('terms.important')}</strong>
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. {t('terms.acceptance')}</h2>
                            <p className="text-gray-700">
                                {t('terms.acceptanceDesc')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. {t('terms.description')}</h2>
                            <p className="text-gray-700">
                                {t('terms.descriptionText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. {t('terms.disclaimer')}</h2>
                            <p className="text-gray-700 mb-4">
                                {t('terms.disclaimerText1')}
                            </p>
                            <p className="text-gray-700 mb-4">
                                {t('terms.disclaimerText2')}
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>{t('terms.errorFree')}</li>
                                <li>{t('terms.uninterrupted')}</li>
                                <li>{t('terms.suitability')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. {t('terms.notAdvice')}</h2>
                            <p className="text-gray-700 mb-4">
                                {t('terms.notAdviceText')}
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>{t('terms.taxAdvice')}</li>
                                <li>{t('terms.legalAdvice')}</li>
                                <li>{t('terms.financialAdvice')}</li>
                                <li>{t('terms.medicalAdvice')}</li>
                                <li>{t('terms.otherAdvice')}</li>
                            </ul>
                            <p className="text-gray-700 mt-4">
                                {t('terms.consultPro')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. {t('terms.liability')}</h2>
                            <p className="text-gray-700">
                                {t('terms.liabilityText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. {t('terms.accuracy')}</h2>
                            <p className="text-gray-700">
                                {t('terms.accuracyText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. {t('terms.userResp')}</h2>
                            <p className="text-gray-700 mb-4">
                                {t('terms.userRespText')}
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>{t('terms.lawfulUse')}</li>
                                <li>{t('terms.noDisrupt')}</li>
                                <li>{t('terms.noAutomation')}</li>
                                <li>{t('terms.verify')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. {t('terms.ip')}</h2>
                            <p className="text-gray-700">
                                {t('terms.ipText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. {t('terms.modifications')}</h2>
                            <p className="text-gray-700">
                                {t('terms.modificationsText')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. {t('terms.governing')}</h2>
                            <p className="text-gray-700">
                                {t('terms.governingText')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. {t('terms.contactInfo')}</h2>
                            <p className="text-gray-700">
                                {t('terms.contactInfoText')}{' '}
                                <a href="mailto:support@workmoneytools.com" className="text-blue-600 hover:underline">
                                    support@workmoneytools.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
