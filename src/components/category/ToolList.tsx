import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator } from 'lucide-react';
import { AdSlot } from '../common/AdSlot';
import { useLanguage } from '../../contexts/LanguageContext';

interface Tool {
    id: string;
    name: string;
    description: string;
    link: string;
    tags: string[];
}

interface ToolListProps {
    tools: Tool[];
    categoryId?: string;
}

// Map tool IDs to translation keys
const toolTranslationKeys: Record<string, { nameKey: string; descKey: string }> = {
    'paycheck-calculator': { nameKey: 'popular.paycheck', descKey: 'popular.paycheck.desc' },
    'mortgage-calculator': { nameKey: 'popular.mortgage', descKey: 'popular.mortgage.desc' },
    'bmi-calculator': { nameKey: 'popular.bmi', descKey: 'popular.bmi.desc' },
    'tip-calculator': { nameKey: 'popular.tip', descKey: 'popular.tip.desc' },
    'gpa-calculator': { nameKey: 'popular.gpa', descKey: 'popular.gpa.desc' },
    'age-calculator': { nameKey: 'popular.age', descKey: 'popular.age.desc' },
    'sleep-calculator': { nameKey: 'popular.sleep', descKey: 'popular.sleep.desc' },
    'password-generator': { nameKey: 'popular.password', descKey: 'popular.password.desc' },
    'compound-interest-calculator': { nameKey: 'popular.compound', descKey: 'popular.compound.desc' },
    'body-fat-calculator': { nameKey: 'popular.bodyFat', descKey: 'popular.bodyFat.desc' },
    'home-affordability': { nameKey: 'popular.homeAfford', descKey: 'popular.homeAfford.desc' },
    'student-loan-calculator': { nameKey: 'popular.studentLoan', descKey: 'popular.studentLoan.desc' },
};

// Map tags to translation keys
const tagTranslationKeys: Record<string, string> = {
    'salary': 'popular.cat.salary',
    'paycheck': 'popular.cat.salary',
    'tax': 'tag.tax',
    'loans': 'popular.cat.loans',
    'mortgage': 'tag.mortgage',
    'health': 'popular.cat.health',
    'fitness': 'popular.cat.fitness',
    'education': 'popular.cat.education',
    'investment': 'popular.cat.investment',
    'finance': 'popular.cat.finance',
    'math': 'cat.math',
    'conversion': 'cat.conversion',
    'everyday': 'popular.cat.everyday',
    'security': 'popular.cat.security',
    'tools': 'popular.cat.tools',
};

export const ToolList: React.FC<ToolListProps> = ({ tools }) => {
    const { t, language } = useLanguage();
    
    const getToolName = (tool: Tool): string => {
        const keys = toolTranslationKeys[tool.id];
        if (keys && language !== 'en') {
            const translated = t(keys.nameKey);
            if (translated !== keys.nameKey) return translated;
        }
        return tool.name;
    };
    
    const getToolDesc = (tool: Tool): string => {
        const keys = toolTranslationKeys[tool.id];
        if (keys && language !== 'en') {
            const translated = t(keys.descKey);
            if (translated !== keys.descKey) return translated;
        }
        return tool.description;
    };
    
    const getTagName = (tag: string): string => {
        const key = tagTranslationKeys[tag.toLowerCase()];
        if (key && language !== 'en') {
            const translated = t(key);
            if (translated !== key) return translated;
        }
        return tag;
    };

    return (
        <div className="space-y-4">
            {tools.map((tool, index) => (
                <React.Fragment key={tool.id}>
                    <Link
                        to={tool.link}
                        className="group block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row md:items-start gap-5">
                            {/* Icon Placeholder */}
                            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                <Calculator className="h-6 w-6" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex gap-2">
                                        {tool.tags.map(tag => (
                                            <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {getTagName(tag)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {getToolName(tool)}
                                </h3>

                                <p className="text-gray-500 leading-relaxed">
                                    {getToolDesc(tool)}
                                </p>
                            </div>

                            <div className="flex items-center self-center md:self-start mt-4 md:mt-0">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Insert Ad after 4th item */}
                    {index === 3 && <AdSlot id="category-list-ad" className="my-8" label="Sponsored" />}
                </React.Fragment>
            ))}
        </div>
    );
};
