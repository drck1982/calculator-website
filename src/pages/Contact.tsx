import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send this to a backend
        console.log('Form submitted:', formData);
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
                title="Contact Us - WorkMoney Tools"
                description="Get in touch with the WorkMoney Tools team. We'd love to hear your feedback, suggestions, or questions about our free online calculators."
                keywords="contact workmoney tools, feedback, support, calculator help"
                canonicalUrl="/contact"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: 'Contact Us' }]} />

                <div className="max-w-4xl mx-auto py-12">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                            <Mail className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                        <p className="text-xl text-gray-600">
                            Have a question, suggestion, or found a bug? We'd love to hear from you!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center space-x-3 mb-3">
                                    <MessageSquare className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-bold text-gray-900">Feedback</h3>
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Help us improve! Share your ideas for new calculators or features.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center space-x-3 mb-3">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-bold text-gray-900">Email</h3>
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for reaching out. We'll get back to you as soon as possible.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Name
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
                                                Email Address
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
                                            Subject
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="feedback">General Feedback</option>
                                            <option value="bug">Report a Bug</option>
                                            <option value="feature">Feature Request</option>
                                            <option value="question">Question</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Tell us what's on your mind..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <Send className="h-5 w-5" />
                                        <span>Send Message</span>
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

