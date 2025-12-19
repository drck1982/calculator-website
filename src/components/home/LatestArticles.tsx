import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles';
import { ArrowRight, Clock, User } from 'lucide-react';

export const LatestArticles: React.FC = () => {
    const latestArticles = articles.slice(0, 3); // Get top 3 articles

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl mb-6 md:mb-0">
                        <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-3 block">Learning Center</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-outfit">
                            Master Your Finances & Health
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Expert guides and educational resources to help you make more informed decisions using our tools.
                        </p>
                    </div>
                    <Link
                        to="/blog"
                        className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group"
                    >
                        View All Articles
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestArticles.map((article) => (
                        <Link
                            key={article.id}
                            to={`/blog/${article.slug}`}
                            className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-blue-600 shadow-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-grow flex-col">
                                <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                                    <span className="flex items-center">
                                        <User className="w-3 h-3 mr-1.5" />
                                        {article.author}
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="w-3 h-3 mr-1.5" />
                                        {article.readingTime}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-sm font-bold text-blue-600">
                                    Read Full Guide
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
