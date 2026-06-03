import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { articles } from '../data/articles';
import { SITE_URL } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const relatedToolBySlug: Record<string, { title: string; description: string; href: string }> = {
    'mortgage-calculation-basics': {
        title: 'Estimate your mortgage payment',
        description: 'Apply the mortgage concepts from this guide to your own home price, down payment, rate, and term.',
        href: '/tools/mortgage-calculator'
    },
    'mortgage-refinance-break-even': {
        title: 'Calculate your refinance break-even',
        description: 'Compare current loan details, new rate, closing costs, and monthly savings before talking to lenders.',
        href: '/tools/refinance-calculator'
    },
    'apy-vs-interest-rate': {
        title: 'Convert interest rate to APY',
        description: 'Compare savings products with the effective annual yield, not just the stated nominal rate.',
        href: '/tools/apy-calculator'
    },
    'credit-card-payoff-strategy': {
        title: 'Build your payoff timeline',
        description: 'See how monthly payment changes affect debt-free date and total interest.',
        href: '/tools/credit-card-payoff'
    },
    'power-of-compound-interest': {
        title: 'Project compound growth',
        description: 'Estimate long-term growth from starting balance, return assumptions, time, and contributions.',
        href: '/tools/compound-interest-calculator'
    },
    'understand-paycheck-2025': {
        title: 'Estimate your take-home pay',
        description: 'Use your salary, state, and payroll assumptions to estimate net pay.',
        href: '/tools/paycheck-calculator'
    }
};

export const ArticleDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const article = articles.find(a => a.slug === slug);

    if (!article) return <Navigate to="/404" />;

    const relatedTool = relatedToolBySlug[article.slug] || {
        title: 'Ready to calculate?',
        description: "Use our free tools to apply what you've learned and gain direct insights into your situation.",
        href: '/all-tools'
    };

    const handleShare = async () => {
        const articleUrl = `${SITE_URL}/blog/${article.slug}`;
        trackEvent('article_share_click', {
            article_slug: article.slug,
            article_category: article.category
        });

        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.excerpt,
                    url: articleUrl
                });
                return;
            } catch {
                // Fall back to clipboard when native share is cancelled or unavailable.
            }
        }

        try {
            await navigator.clipboard.writeText(articleUrl);
            trackEvent('article_share_link_copy', {
                article_slug: article.slug,
                article_category: article.category
            });
        } catch {
            // no-op
        }
    };

    const handleRelatedToolClick = () => {
        trackEvent('article_tool_cta_click', {
            article_slug: article.slug,
            article_category: article.category,
            destination: relatedTool.href
        });
    };

    const articleStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.image,
        author: {
            '@type': 'Organization',
            name: 'WorkMoney Tools'
        },
        publisher: {
            '@type': 'Organization',
            name: 'WorkMoney Tools'
        },
        datePublished: article.date,
        dateModified: article.updatedAt || article.date,
        mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={`${article.title} | WorkMoney Tools`}
                description={article.excerpt}
                keywords={article.tags.join(', ')}
                canonicalUrl={`/blog/${article.slug}`}
                type="article"
                publishedTime={article.date}
                modifiedTime={article.updatedAt || article.date}
                structuredData={articleStructuredData}
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
                            <button
                                onClick={handleShare}
                                className="flex items-center ml-auto text-blue-600 hover:text-blue-800 transition-colors font-bold px-4 py-2 bg-blue-50/50 rounded-xl"
                            >
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-heading">{relatedTool.title}</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                            {relatedTool.description}
                        </p>
                        <Link
                            to={relatedTool.href}
                            onClick={handleRelatedToolClick}
                            className="inline-flex items-center px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200"
                        >
                            Open Calculator
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
