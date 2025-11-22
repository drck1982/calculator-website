import React from 'react';
import {
    FinanceAIIcon, HealthAIIcon, MathAIIcon, ConversionAIIcon,
    BiologyAIIcon, ChemistryAIIcon, ConstructionAIIcon, EcologyAIIcon,
    EverydayLifeAIIcon, FoodAIIcon, PhysicsAIIcon, SportsAIIcon,
    StatisticsAIIcon, OtherAIIcon
} from '../components/icons/CategoryIcons';

const icons = [
    { name: 'Finance', Icon: FinanceAIIcon, desc: 'Dollar coin', color: 'blue' },
    { name: 'Health', Icon: HealthAIIcon, desc: 'Heart + cross', color: 'pink' },
    { name: 'Math', Icon: MathAIIcon, desc: 'Pi symbol', color: 'cyan' },
    { name: 'Conversion', Icon: ConversionAIIcon, desc: 'Bidirectional arrows', color: 'gray' },
    { name: 'Biology', Icon: BiologyAIIcon, desc: 'DNA helix', color: 'teal' },
    { name: 'Chemistry', Icon: ChemistryAIIcon, desc: 'Flask', color: 'purple' },
    { name: 'Construction', Icon: ConstructionAIIcon, desc: 'Ruler / measure', color: 'orange' },
    { name: 'Ecology', Icon: EcologyAIIcon, desc: 'Earth + recycle', color: 'green' },
    { name: 'Everyday Life', Icon: EverydayLifeAIIcon, desc: 'Clock', color: 'yellow' },
    { name: 'Food', Icon: FoodAIIcon, desc: 'Chef hat', color: 'red' },
    { name: 'Physics', Icon: PhysicsAIIcon, desc: 'Lightning bolt', color: 'violet' },
    { name: 'Sports', Icon: SportsAIIcon, desc: 'Running figure', color: 'emerald' },
    { name: 'Statistics', Icon: StatisticsAIIcon, desc: 'Bar chart', color: 'slate' },
    { name: 'Other', Icon: OtherAIIcon, desc: 'Sparkle', color: 'pink' }
];

const colorMap: Record<string, string> = {
    blue: 'bg-blue-100',
    pink: 'bg-pink-100',
    cyan: 'bg-cyan-100',
    gray: 'bg-gray-100',
    teal: 'bg-teal-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    violet: 'bg-violet-100',
    emerald: 'bg-emerald-100',
    slate: 'bg-slate-100'
};

export const IconDemo: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">AI-Themed Icon Library</h1>
                    <p className="text-gray-600 mb-2">Clean, Simple, and Precise</p>
                    <div className="flex flex-wrap justify-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">✓ Bold 3px strokes</span>
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">✓ Clear meanings</span>
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full">✓ AI sparkles</span>
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full">✓ Minimal design</span>
                    </div>
                </div>

                {/* All Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-12 max-w-7xl mx-auto">
                    {icons.map(({ name, Icon, desc, color }) => (
                        <div key={name} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
                            <div className="flex justify-center mb-3 group">
                                <div className="relative">
                                    <div className={`absolute inset-0 ${colorMap[color]} rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                                    <Icon size={64} className="relative z-10 group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                            <h3 className="font-bold text-center text-sm mb-1">{name}</h3>
                            <p className="text-xs text-gray-500 text-center">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Comparison: 48px vs 64px */}
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto mb-8">
                    <h2 className="text-2xl font-bold mb-6">Standard Sizes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <FinanceAIIcon size={32} />
                            </div>
                            <p className="text-sm text-gray-600">32px - Small</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <FinanceAIIcon size={48} />
                            </div>
                            <p className="text-sm text-gray-600 font-semibold">48px - Default</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <FinanceAIIcon size={64} />
                            </div>
                            <p className="text-sm text-gray-600">64px - Large</p>
                        </div>
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <FinanceAIIcon size={96} />
                            </div>
                            <p className="text-sm text-gray-600">96px - XL</p>
                        </div>
                    </div>
                </div>

                {/* Improvements */}
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Design Improvements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
                                <span className="text-2xl font-bold text-blue-600">3px</span>
                            </div>
                            <h3 className="font-bold mb-2">Bolder Strokes</h3>
                            <p className="text-sm text-gray-600">Increased from 2px to 3px for better clarity and visibility at all sizes</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h3 className="font-bold mb-2">Clear Symbols</h3>
                            <p className="text-sm text-gray-600">Intuitive icons: dollar for finance, heart for health, flask for chemistry</p>
                        </div>
                        <div>
                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="font-bold mb-2">Minimal Design</h3>
                            <p className="text-sm text-gray-600">Removed complex neural patterns, kept simple AI sparkle accents</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
