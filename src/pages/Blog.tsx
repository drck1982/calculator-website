import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { articles } from '../data/articles';

export const Blog: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Learning Center - Financial & Health Guides | WorkMoney Tools"
                description="Educational articles and guides to help you understand your finances, health, and more. Expert insights combined with our powerful tools."
                keywords="financial guides, health articles, mortgage education, tax tips, compound interest guide"
                canonicalUrl="/blog"
            />

            <div className="container mx-auto px-4 py-20 lg:py-32">
                <Breadcrumbs items={[{ label: 'Blog' }]} />

                <div className="mt-16 mb-24 max-w-2xl">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                        Learning Center
                    </h1>
                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                        Insightful guides on financial health and smart decision-making. Simple. Direct. Effective.
                    </p>
                </div>

                {/* Featured Post */}
                {articles.length > 0 && (
                    <div className="mb-32">
                        <Link
                            to={`/blog/${articles[0].slug}`}
                            className="group flex flex-col md:flex-row items-center gap-12 lg:gap-20"
                        >
                            <div className="md:w-3/5 aspect-[16/9] rounded-2xl overflow-hidden bg-gray-50">
                                <img
                                    src={articles[0].image}
                                    alt={articles[0].title}
                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                                />
                            </div>
                            <div className="md:w-2/5">
                                <div className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                                    Recommended
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                                    {articles[0].title}
                                </h2>
                                <p className="text-gray-500 text-lg mb-8 line-clamp-2 leading-relaxed">
                                    {articles[0].excerpt}
                                </p>
                                <div className="flex items-center text-gray-400 text-[11px] font-bold uppercase tracking-widest gap-4">
                                    <span>{articles[0].date}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                    <span>{articles[0].readingTime}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {articles.slice(1).map((article) => (
                        <Link
                            key={article.id}
                            to={`/blog/${article.slug}`}
                            className="group flex flex-col"
                        >
                            <div className="aspect-[1.5] rounded-xl overflow-hidden mb-8 bg-gray-50">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                                />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-3">
                                    <span>{article.date}</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
                                    <span>{article.readingTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
