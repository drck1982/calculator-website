import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Calculator, Users, Shield, Zap } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="About Us - WorkMoney Tools"
                description="Learn about WorkMoney Tools - your trusted source for free, accurate, and easy-to-use online calculators."
                keywords="about workmoney tools, free calculators, online tools"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: 'About Us' }]} />

                {/* Hero Section */}
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6">
                        <Calculator className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About WorkMoney Tools
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We provide free, accurate, and easy-to-use online calculators to help you make better financial decisions and solve everyday problems.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Our mission is to democratize access to financial and mathematical tools. 
                            We believe everyone should have access to accurate calculators without 
                            needing expensive software or professional services. Whether you're 
                            calculating your mortgage payment, planning for retirement, or converting 
                            units, we're here to help.
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="max-w-5xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mb-4">
                                <Zap className="h-7 w-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Fast & Accurate</h3>
                            <p className="text-gray-600">
                                Our calculators use proven formulas and algorithms to deliver instant, accurate results.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mb-4">
                                <Users className="h-7 w-7 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">User-Friendly</h3>
                            <p className="text-gray-600">
                                Clean, intuitive interfaces that make complex calculations simple and accessible.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-xl mb-4">
                                <Shield className="h-7 w-7 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy First</h3>
                            <p className="text-gray-600">
                                All calculations happen in your browser. We never store your personal data.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                            <div className="text-gray-600 text-sm">Calculators</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">15</div>
                            <div className="text-gray-600 text-sm">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">100%</div>
                            <div className="text-gray-600 text-sm">Free</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">0</div>
                            <div className="text-gray-600 text-sm">Data Collected</div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="max-w-3xl mx-auto text-center pb-16">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Disclaimer</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        The calculators provided on this website are for informational purposes only. 
                        They are not intended to provide tax, legal, financial, or investment advice. 
                        Results are estimates and may not reflect actual amounts. Please consult with 
                        a qualified professional for advice specific to your situation.
                    </p>
                </div>
            </div>
        </div>
    );
};

