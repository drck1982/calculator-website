import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { articles } from '../data/articles';
import { ArrowLeft, User, Calendar, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const ArticleDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const article = articles.find(a => a.slug === slug);

    if (!article) return <Navigate to="/404" />;

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={`${article.title} | WorkMoney Tools`}
                description={article.excerpt}
                keywords={article.tags.join(', ')}
                canonicalUrl={`/blog/${article.slug}`}
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[
                    { label: 'Blog', href: '/blog' },
                    { label: article.category }
                ]} />

                <div className="max-w-4xl mx-auto mt-8">
                    <Link to="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Learning Center
                    </Link>

                    <div className="mb-8">
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {article.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-6 border-y border-gray-100 py-4">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-600" />
                                <span className="font-medium text-gray-700">{article.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" /> {article.date}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" /> {article.readingTime} read
                            </div>
                            <button className="flex items-center ml-auto text-blue-600 hover:text-blue-800 transition-colors">
                                <Share2 className="w-4 h-4 mr-1" /> Share
                            </button>
                        </div>
                    </div>

                    <div className="relative h-64 md:h-[450px] w-full mb-12 rounded-3xl overflow-hidden shadow-xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="prose prose-blue prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-primary">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-medium">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                        <div className="md:flex items-center justify-between">
                            <div className="mb-6 md:mb-0 md:mr-8 transition-transform">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to calculate?</h2>
                                <p className="text-blue-50 text-lg opacity-90">
                                    Use our free tools to apply what you've learned and gain direct insights into your situation.
                                </p>
                            </div>
                            <Link
                                to="/all-tools"
                                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Browse All Tools
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
