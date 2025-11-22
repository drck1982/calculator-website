import React from 'react';

interface ContentSectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

export const ContentSection: React.FC<ContentSectionProps> = ({ id, title, children }) => {
    return (
        <section id={id} className="mb-12 scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 relative inline-block">
                {title}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-100 -z-10 transform translate-y-1"></span>
            </h2>
            <div className="prose prose-blue max-w-none text-gray-600">
                {children}
            </div>
        </section>
    );
};
