import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { articles } from '../data/articles';
import { Share2 } from 'lucide-react';
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

            <div className="container mx-auto px-4 py-16 lg:py-24">
                <Breadcrumbs items={[
                    { label: 'Blog', href: '/blog' },
                    { label: article.category }
                ]} />

                <div className="max-w-2xl mx-auto mt-16 lg:mt-24">
                    <header className="mb-16">
                        <div className="flex items-center gap-2 text-blue-600/80 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                            <span>{article.category}</span>
                            <span className="w-1 h-1 rounded-full bg-blue-600/30"></span>
                            <span>{article.readingTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-[1.2] tracking-tight">
                            {article.title}
                        </h1>

                        <div className="flex items-center text-sm text-gray-500 font-medium">
                            <span className="text-gray-900 font-bold">{article.author}</span>
                            <span className="mx-3 text-gray-300">/</span>
                            <span>{article.date}</span>
                            <button className="flex items-center ml-auto text-blue-600 hover:text-blue-800 transition-colors font-bold px-4 py-2 bg-blue-50/50 rounded-xl">
                                <Share2 className="w-4 h-4 mr-2" /> Share
                            </button>
                        </div>
                    </header>

                    <div className="relative aspect-[16/9] w-full mb-20 rounded-3xl overflow-hidden grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <article className="prose prose-blue prose-lg max-w-none 
                        prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                        prose-p:text-gray-600 prose-p:leading-[1.8] prose-p:text-lg lg:prose-p:text-xl
                        prose-strong:text-gray-900 prose-strong:font-bold
                        prose-li:text-gray-600 prose-li:text-lg
                        prose-img:rounded-3xl
                        prose-blockquote:border-l-2 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800
                        ">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </article>

                    <div className="mt-24 pt-12 border-t border-gray-100 flex flex-wrap gap-4 items-center">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Tagged with</span>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map(tag => (
                                <span key={tag} className="text-gray-500 hover:text-blue-600 px-4 py-1.5 rounded-lg text-sm font-bold bg-gray-50 transition-all cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">Ready to calculate?</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                            Use our free tools to apply what you've learned and gain direct insights into your situation.
                        </p>
                        <Link
                            to="/all-tools"
                            className="inline-flex items-center px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200"
                        >
                            Browse All Tools
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
