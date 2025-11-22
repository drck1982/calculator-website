import React from 'react';
import { cn } from '../../utils/cn';
import {
    DollarSign,      // Finance
    HeartPulse,      // Health  
    Calculator,      // Math
    ArrowLeftRight,  // Conversion
    Dna,             // Biology
    FlaskConical,    // Chemistry
    Ruler,           // Construction
    Recycle,         // Ecology
    Clock,           // Everyday Life
    ChefHat,         // Food
    Zap,             // Physics
    PersonStanding,  // Sports
    BarChart3,       // Statistics
    Sparkles         // Other
} from 'lucide-react';

interface AIIconProps {
    className?: string;
    size?: number;
}

// Wrapper component to add AI styling
const AIIconWrapper: React.FC<{ children: React.ReactNode; gradient: string; className?: string }> = ({ children, gradient, className }) => (
    <div className={cn("relative inline-flex", className)}>
        <div className={`absolute inset-0 ${gradient} opacity-10 rounded-full blur-xl`}></div>
        <div className="relative">
            {children}
        </div>
    </div>
);

export const FinanceAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-blue-400 to-purple-500" className={className}>
        <DollarSign size={size} className="text-blue-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const HealthAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-rose-400 to-pink-500" className={className}>
        <HeartPulse size={size} className="text-rose-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const MathAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-cyan-400 to-teal-500" className={className}>
        <Calculator size={size} className="text-cyan-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const ConversionAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-gray-400 to-slate-500" className={className}>
        <ArrowLeftRight size={size} className="text-gray-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const BiologyAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-green-400 to-teal-500" className={className}>
        <Dna size={size} className="text-teal-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const ChemistryAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-purple-400 to-pink-500" className={className}>
        <FlaskConical size={size} className="text-purple-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const ConstructionAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-orange-400 to-red-500" className={className}>
        <Ruler size={size} className="text-orange-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const EcologyAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-green-400 to-lime-500" className={className}>
        <Recycle size={size} className="text-green-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const EverydayLifeAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-yellow-400 to-amber-500" className={className}>
        <Clock size={size} className="text-yellow-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const FoodAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-red-400 to-orange-500" className={className}>
        <ChefHat size={size} className="text-red-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const PhysicsAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-violet-400 to-purple-500" className={className}>
        <Zap size={size} className="text-violet-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const SportsAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-emerald-400 to-green-500" className={className}>
        <PersonStanding size={size} className="text-emerald-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const StatisticsAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-slate-400 to-gray-500" className={className}>
        <BarChart3 size={size} className="text-slate-600" strokeWidth={2.5} />
    </AIIconWrapper>
);

export const OtherAIIcon: React.FC<AIIconProps> = ({ className, size = 48 }) => (
    <AIIconWrapper gradient="bg-gradient-to-br from-pink-400 to-rose-500" className={className}>
        <Sparkles size={size} className="text-pink-600" strokeWidth={2.5} />
    </AIIconWrapper>
);
