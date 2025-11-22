import React from 'react';

interface CalculatorFormProps {
    title: string;
    children: React.ReactNode;
    onCalculate: () => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ title, children, onCalculate }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="space-y-6">
                {children}
                <button
                    onClick={onCalculate}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg transform active:scale-[0.98]"
                >
                    Calculate
                </button>
            </div>
        </div>
    );
};
