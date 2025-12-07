import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Shield } from 'lucide-react';

export const Privacy: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Privacy Policy - WorkMoney Tools"
                description="Learn how WorkMoney Tools protects your privacy and handles your data."
                keywords="privacy policy, data protection, workmoney tools"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

                <div className="max-w-3xl mx-auto py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                            <Shield className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                        <p className="text-gray-600">Last updated: December 2024</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                            <p className="text-blue-800 font-medium">
                                <strong>Summary:</strong> We respect your privacy. All calculations happen in your browser - we don't store your personal data. We use analytics to improve our service and may show ads to keep our tools free.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                            <p className="text-gray-700 mb-4">
                                <strong>Calculator Data:</strong> All calculations are performed locally in your browser. We do not collect, store, or transmit any of the numbers or information you enter into our calculators.
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Analytics Data:</strong> We use Vercel Analytics to collect anonymous usage data such as:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Pages visited</li>
                                <li>Browser type and version</li>
                                <li>Device type (mobile/desktop)</li>
                                <li>General geographic location (country level)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Information</h2>
                            <p className="text-gray-700 mb-4">
                                We use analytics data to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Improve our calculators and user experience</li>
                                <li>Understand which tools are most popular</li>
                                <li>Identify and fix technical issues</li>
                                <li>Make informed decisions about new features</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookies and Tracking</h2>
                            <p className="text-gray-700 mb-4">
                                We use minimal cookies necessary for the website to function. Third-party services like Google AdSense may use cookies to serve relevant advertisements.
                            </p>
                            <p className="text-gray-700">
                                You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
                            <p className="text-gray-700 mb-4">
                                We use the following third-party services:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li><strong>Vercel:</strong> Website hosting and analytics</li>
                                <li><strong>Google AdSense:</strong> Advertising (helps keep our tools free)</li>
                            </ul>
                            <p className="text-gray-700 mt-4">
                                These services have their own privacy policies governing their data practices.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                            <p className="text-gray-700">
                                Since we don't collect personal calculator data, there's nothing to secure on our end. Your calculations stay in your browser and are never transmitted to our servers.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                            <p className="text-gray-700">
                                You have the right to opt out of analytics tracking by using browser extensions like ad blockers or "Do Not Track" settings. Since we don't collect personal data, there's no personal information to access, modify, or delete.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
                            <p className="text-gray-700">
                                Our website is intended for general audiences and does not knowingly collect information from children under 13.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
                            <p className="text-gray-700">
                                We may update this privacy policy from time to time. We will notify users of any material changes by updating the "Last updated" date at the top of this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                            <p className="text-gray-700">
                                If you have questions about this privacy policy, please contact us at{' '}
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

