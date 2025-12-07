import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const { t } = useLanguage();
    
    return (
        <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center hover:text-blue-600 transition-colors">
                        <Home className="w-4 h-4 mr-2" />
                        {t('breadcrumb.home')}
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                            {item.href ? (
                                <Link to={item.href} className="hover:text-blue-600 transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-gray-900 font-medium">{item.label}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};
