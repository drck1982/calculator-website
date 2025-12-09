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

import { toolTranslationKeys, tagTranslationKeys } from '../../data/translationKeys';

export const ToolList: React.FC<ToolListProps> = ({ tools }) => {
    const { t } = useLanguage();

    const toCamelKey = (id: string) =>
        id
            .split('-')
            .map((part, idx) => (idx === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
            .join('');

    // Pre-translate tools to ensure re-render on language change
    const translatedTools = tools.map((tool) => {
        const keys = toolTranslationKeys[tool.id];
        const derivedNameKey = `tool.${toCamelKey(tool.id)}`;
        const derivedDescKey = `tool.${toCamelKey(tool.id)}.desc`;

        // Name
        const mappedName = keys ? t(keys.nameKey) : undefined;
        const derivedName = t(derivedNameKey);
        const translatedName =
            (mappedName && mappedName !== keys?.nameKey && mappedName) ||
            (derivedName && derivedName !== derivedNameKey && derivedName) ||
            tool.name;

        // Desc
        const mappedDesc = keys ? t(keys.descKey) : undefined;
        const derivedDesc = t(derivedDescKey);
        const translatedDesc =
            (mappedDesc && mappedDesc !== keys?.descKey && mappedDesc) ||
            (derivedDesc && derivedDesc !== derivedDescKey && derivedDesc) ||
            tool.description;

        const translatedTags = tool.tags.map((tag) => {
            const key = tagTranslationKeys[tag.toLowerCase()];
            const derivedTagKey = `tag.${tag.toLowerCase()}`;

            const mappedTag = key ? t(key) : undefined;
            const derivedTag = t(derivedTagKey);

            return (
                (mappedTag && mappedTag !== key && mappedTag) ||
                (derivedTag && derivedTag !== derivedTagKey && derivedTag) ||
                tag
            );
        });

        return {
            ...tool,
            translatedName,
            translatedDesc,
            translatedTags,
        };
    });

    return (
        <div className="space-y-4">
            {translatedTools.map((tool, index) => (
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
                                        {tool.translatedTags.map(tag => (
                                            <span key={tag} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wide rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {tool.translatedName}
                                </h3>

                                <p className="text-gray-500 leading-relaxed">
                                    {tool.translatedDesc}
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
                    {index === 3 && <AdSlot id="category-list-ad" className="my-8" label={t('common.sponsored')} />}
                </React.Fragment>
            ))}
        </div>
    );
};
