import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, integrate with email service (e.g., Formspree, EmailJS)
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={`${t('contact.title')} - WorkMoney Tools`}
                description={t('contact.subtitle')}
                keywords="contact workmoney tools, feedback, support, calculator help"
                canonicalUrl="/contact"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: t('contact.title') }]} />

                <div className="max-w-4xl mx-auto py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                            <Mail className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h1>
                        <p className="text-xl text-gray-600">
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center space-x-3 mb-3">
                                    <MessageSquare className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-bold text-gray-900">{t('contact.feedback')}</h3>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    {t('contact.feedbackDesc')}
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center space-x-3 mb-3">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-bold text-gray-900">{t('contact.email')}</h3>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    support@workmoneytools.com
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="md:col-span-2">
                            {isSubmitted ? (
                                <div className="bg-green-50 rounded-2xl p-8 text-center">
                                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.messageSent')}</h3>
                                    <p className="text-gray-600 mb-6">
                                        {t('contact.thankYou')}
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        {t('contact.sendAnother')}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('contact.yourName')}
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('contact.emailAddress')}
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.subject')}
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">{t('contact.selectSubject')}</option>
                                            <option value="feedback">{t('contact.generalFeedback')}</option>
                                            <option value="bug">{t('contact.reportBug')}</option>
                                            <option value="feature">{t('contact.featureRequest')}</option>
                                            <option value="question">{t('contact.question')}</option>
                                            <option value="other">{t('contact.other')}</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('contact.message')}
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder={t('contact.messagePlaceholder')}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Send className="h-5 w-5" />
                                        <span>{t('contact.sendMessage')}</span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
