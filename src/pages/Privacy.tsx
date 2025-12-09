import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Privacy: React.FC = () => {
    const { t } = useLanguage();
    
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={`${t('privacy.title')} - WorkMoney Tools`}
                description={t('privacy.summary')}
                keywords="privacy policy, data protection, workmoney tools, calculator privacy"
                canonicalUrl="/privacy"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: t('privacy.title') }]} />

                <div className="max-w-3xl mx-auto py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                            <Shield className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('privacy.title')}</h1>
                        <p className="text-gray-600">{t('privacy.lastUpdated')}</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                            <p className="text-blue-800 font-medium">
                                <strong>{t('privacy.summary')}</strong>
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. {t('privacy.infoCollect')}</h2>
                            <p className="text-gray-700 mb-4">
                                <strong>{t('privacy.calcData')}:</strong> {t('privacy.calcDataDesc')}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>{t('privacy.analyticsData')}:</strong> {t('privacy.analyticsDataDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>{t('privacy.pagesVisited')}</li>
                                <li>{t('privacy.browserType')}</li>
                                <li>{t('privacy.deviceType')}</li>
                                <li>{t('privacy.geoLocation')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. {t('privacy.howUse')}</h2>
                            <p className="text-gray-700 mb-4">
                                {t('privacy.howUseDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>{t('privacy.improveCalc')}</li>
                                <li>{t('privacy.popularTools')}</li>
                                <li>{t('privacy.fixIssues')}</li>
                                <li>{t('privacy.newFeatures')}</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. {t('privacy.cookies')}</h2>
                            <p className="text-gray-700 mb-4">
                                {t('privacy.cookiesDesc1')}
                            </p>
                            <p className="text-gray-700">
                                {t('privacy.cookiesDesc2')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. {t('privacy.thirdParty')}</h2>
                            <p className="text-gray-700 mb-4">
                                {t('privacy.thirdPartyDesc')}
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li><strong>{t('privacy.vercel')}:</strong> {t('privacy.vercelDesc')}</li>
                                <li><strong>{t('privacy.adsense')}:</strong> {t('privacy.adsenseDesc')}</li>
                            </ul>
                            <p className="text-gray-700 mt-4">
                                {t('privacy.thirdPartyNote')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. {t('privacy.dataSecurity')}</h2>
                            <p className="text-gray-700">
                                {t('privacy.dataSecurityDesc')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. {t('privacy.yourRights')}</h2>
                            <p className="text-gray-700">
                                {t('privacy.yourRightsDesc')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. {t('privacy.childrenPrivacy')}</h2>
                            <p className="text-gray-700">
                                {t('privacy.childrenPrivacyDesc')}
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. {t('privacy.changes')}</h2>
                            <p className="text-gray-700">
                                {t('privacy.changesDesc')}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. {t('privacy.contact')}</h2>
                            <p className="text-gray-700">
                                {t('privacy.contactDesc')}{' '}
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
