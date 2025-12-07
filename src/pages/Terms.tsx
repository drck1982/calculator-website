import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FileText } from 'lucide-react';

export const Terms: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Terms of Service - WorkMoney Tools"
                description="Read the terms of service for using WorkMoney Tools free online calculators. Our tools are for informational purposes only."
                keywords="terms of service, terms and conditions, workmoney tools, calculator terms"
                canonicalUrl="/terms"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

                <div className="max-w-3xl mx-auto py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                            <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                        <p className="text-gray-600">Last updated: December 2024</p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-yellow-50 rounded-2xl p-6 mb-8">
                            <p className="text-yellow-800 font-medium">
                                <strong>Important:</strong> By using WorkMoney Tools, you agree to these terms. Our calculators are for informational purposes only and should not be considered professional financial, tax, legal, or medical advice.
                            </p>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700">
                                By accessing and using WorkMoney Tools ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                            <p className="text-gray-700">
                                WorkMoney Tools provides free online calculators for financial, mathematical, health, and other calculations. These tools are designed to help users make estimates and understand concepts, but should not be relied upon for making important decisions without professional consultation.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer of Warranties</h2>
                            <p className="text-gray-700 mb-4">
                                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                            </p>
                            <p className="text-gray-700 mb-4">
                                We do not warrant that:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>The calculators will be error-free or produce accurate results in all circumstances</li>
                                <li>The service will be uninterrupted or available at all times</li>
                                <li>Any results from using our calculators are suitable for any specific purpose</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Not Professional Advice</h2>
                            <p className="text-gray-700 mb-4">
                                The calculators and information provided on this website are for educational and informational purposes only. They are NOT substitutes for:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Professional tax advice from a qualified accountant or tax advisor</li>
                                <li>Legal advice from a licensed attorney</li>
                                <li>Financial advice from a certified financial planner</li>
                                <li>Medical advice from a qualified healthcare provider</li>
                                <li>Any other professional advice</li>
                            </ul>
                            <p className="text-gray-700 mt-4">
                                Always consult with qualified professionals before making important decisions based on calculations from our tools.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
                            <p className="text-gray-700">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WORKMONEY TOOLS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM YOUR USE OF THE SERVICE.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Accuracy of Information</h2>
                            <p className="text-gray-700">
                                While we strive to provide accurate calculations and up-to-date information, we make no guarantees about the accuracy, completeness, or timeliness of any information or calculations. Tax rates, interest rates, and other data may change. Users are responsible for verifying any information before relying on it.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Responsibilities</h2>
                            <p className="text-gray-700 mb-4">
                                By using our service, you agree to:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Use the calculators only for lawful purposes</li>
                                <li>Not attempt to disrupt or damage the service</li>
                                <li>Not use automated systems to access the service in a manner that sends more requests than a human could reasonably produce</li>
                                <li>Verify important calculations with other sources or professionals</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
                            <p className="text-gray-700">
                                All content on WorkMoney Tools, including but not limited to text, graphics, logos, and software, is the property of WorkMoney Tools or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications to Service</h2>
                            <p className="text-gray-700">
                                We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice. We may also update these Terms of Service from time to time. Continued use of the Service after changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
                            <p className="text-gray-700">
                                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                            <p className="text-gray-700">
                                If you have any questions about these Terms of Service, please contact us at{' '}
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

