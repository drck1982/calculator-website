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

            <div className="container mx-auto px-4 py-12">
                <Breadcrumbs items={[{ label: 'Blog' }]} />

                <div className="mt-8 mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Learning <span className="text-blue-600">Center</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Master your finances and health with our expert guides and educational resources.
                    </p>
                </div>

                {/* Featured Post */}
                {articles.length > 0 && (
                    <div className="mb-20">
                        <Link
                            to={`/blog/${articles[0].slug}`}
                            className="group relative flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <div className="lg:w-3/5 h-[300px] lg:h-[450px] overflow-hidden">
                                <img
                                    src={articles[0].image}
                                    alt={articles[0].title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-white">
                                <div className="mb-4">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest bg-blue-600/10 !text-blue-600">
                                        Featured Article
                                    </span>
                                </div>
                                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                                    {articles[0].title}
                                </h2>
                                <p className="text-gray-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                                    {articles[0].excerpt}
                                </p>
                                <div className="flex items-center text-gray-500 text-sm mb-8 gap-6">
                                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-blue-500" /> {articles[0].date}</span>
                                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-blue-500" /> {articles[0].readingTime}</span>
                                </div>
                                <div className="inline-flex items-center text-blue-600 font-bold text-lg group-hover:gap-2 transition-all">
                                    Read Full Story <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-10 pl-2 border-l-4 border-blue-600">Latest Updates</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
                    {articles.slice(1).map((article) => (
                        <Link
                            key={article.id}
                            to={`/blog/${article.slug}`}
                            className="group flex flex-col bg-white border border-gray-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/95 backdrop-blur-sm text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 gap-4">
                                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" /> {article.date}</span>
                                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1.5" /> {article.readingTime}</span>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
                                    {article.title}
                                </h4>
                                <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center text-blue-600 font-bold text-sm">
                                    Keep Reading <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
