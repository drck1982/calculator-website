import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FAQItemProps {
    question: string;
    answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-gray-900">{question}</span>
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-600 prose prose-sm max-w-none">
                    {answer}
                </div>
            )}
        </div>
    );
};

interface FAQSectionProps {
    items: { question: string; answer: React.ReactNode }[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ items }) => {
    const { t } = useLanguage();
    
    return (
        <section className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('calc.faq')}</h2>
            <div>
                {items.map((item, index) => (
                    <FAQItem key={index} {...item} />
                ))}
            </div>
        </section>
    );
};
