import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { articles } from '../data/articles';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

export const Blog: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <SEO
                title="Learning Center - Financial & Health Guides | WorkMoney Tools"
                description="Educational articles and guides to help you understand your finances, health, and more. Expert insights combined with our powerful tools."
                keywords="financial guides, health articles, mortgage education, tax tips, compound interest guide"
                canonicalUrl="/blog"
            />

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[{ label: 'Blog' }]} />

                <div className="text-center py-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Center</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        In-depth guides and expert insights to help you make smarter decisions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {articles.map((article) => (
                        <Link
                            key={article.id}
                            to={`/blog/${article.slug}`}
                            className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                                    <span className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" /> {article.date}
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1" /> {article.readingTime}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center text-blue-600 font-semibold text-sm">
                                    Read Full Article <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
