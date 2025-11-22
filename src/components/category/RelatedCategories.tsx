import React from 'react';
import { Link } from 'react-router-dom';

interface RelatedCategoriesProps {
    currentCategory: string;
}

export const RelatedCategories: React.FC<RelatedCategoriesProps> = ({ currentCategory }) => {
    // Mock data - in real app this would filter out current category
    const related = [
        { name: 'Salary & Tax', link: '/category/salary-tax' },
        { name: 'Investment', link: '/category/investment' },
        { name: 'Retirement', link: '/category/retirement' },
        { name: 'Business', link: '/category/business' },
    ].filter(c => c.name !== currentCategory);

    return (
        <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Related Categories</h3>
            <div className="flex flex-wrap gap-3">
                {related.map((cat) => (
                    <Link
                        key={cat.name}
                        to={cat.link}
                        className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
