import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    type?: 'website' | 'article';
    image?: string;
    noindex?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
}

const SITE_NAME = 'WorkMoney Tools';
const SITE_URL = 'https://calculator-website-puce.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    canonicalUrl,
    type = 'website',
    image = DEFAULT_IMAGE,
    noindex = false,
    publishedTime,
    modifiedTime
}) => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const fullCanonicalUrl = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : undefined;
    const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            )}
            
            {/* Canonical URL */}
            {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
            <meta property="og:locale" content="en_US" />
            
            {/* Article specific */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@workmoneytools" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            
            {/* Additional SEO */}
            <meta name="author" content={SITE_NAME} />
            <meta name="publisher" content={SITE_NAME} />
            <meta name="copyright" content={`© ${new Date().getFullYear()} ${SITE_NAME}`} />
            <meta name="language" content="en" />
            <meta name="revisit-after" content="7 days" />
            <meta name="rating" content="general" />
        </Helmet>
    );
};
