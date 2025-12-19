import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { articles } from '../data/articles';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
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

            <div className="container mx-auto px-4 py-12">
                <Breadcrumbs items={[
                    { label: 'Blog', href: '/blog' },
                    { label: article.category }
                ]} />

                <div className="max-w-3xl mx-auto mt-12">
                    <Link to="/blog" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 mb-10 transition-all group">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Learning Center
                    </Link>

                    <header className="mb-12">
                        <div className="inline-block bg-blue-600/10 text-blue-600 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                            {article.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-sm text-gray-400 gap-y-4 gap-x-8 pb-10 border-b border-gray-100">
                            <div className="flex items-center group">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3 shadow-md group-hover:scale-110 transition-transform">
                                    {article.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Written by</p>
                                    <p className="font-bold text-gray-900 leading-tight">{article.author}</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 whitespace-nowrap">Published on</p>
                                <p className="font-bold text-gray-700 leading-tight flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> {article.date}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 whitespace-nowrap">Reading time</p>
                                <p className="font-bold text-gray-700 leading-tight flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> {article.readingTime}</p>
                            </div>
                            <button className="flex items-center ml-auto bg-gray-50 hover:bg-blue-50 text-gray-900 hover:text-blue-600 font-bold py-2 px-5 rounded-xl transition-all border border-gray-100 shadow-sm whitespace-nowrap">
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </button>
                        </div>
                    </header>

                    <div className="relative aspect-video w-full mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        />
                    </div>

                    <article className="prose prose-blue prose-xl max-w-none 
                        prose-headings:font-heading prose-headings:font-extrabold prose-headings:text-gray-900 prose-headings:tracking-tight
                        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg
                        prose-strong:text-gray-900 prose-strong:font-bold
                        prose-li:text-gray-600 prose-li:text-lg
                        prose-img:rounded-3xl prose-img:shadow-lg
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-blue-900 prose-blockquote:not-italic
                        ">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </article>

                    <div className="mt-20 pt-10 border-t border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-heading">Topics Covered</h3>
                        <div className="flex flex-wrap gap-3">
                            {article.tags.map(tag => (
                                <span key={tag} className="bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-600 px-5 py-2 rounded-xl text-sm font-bold transition-all border border-gray-100 cursor-default">
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
