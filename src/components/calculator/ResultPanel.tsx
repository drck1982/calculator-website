import React from 'react';

interface ResultRowProps {
    label: string;
    value: string;
    isTotal?: boolean;
}

const ResultRow: React.FC<ResultRowProps> = ({ label, value, isTotal }) => (
    <div className={`flex justify-between items-center py-3 ${isTotal ? 'border-t-2 border-gray-200 mt-2 pt-4' : 'border-b border-gray-100'}`}>
        <span className={`text-gray-600 ${isTotal ? 'font-bold text-lg' : 'text-sm'}`}>{label}</span>
        <span className={`font-mono ${isTotal ? 'font-bold text-xl text-blue-600' : 'text-gray-900 font-medium'}`}>{value}</span>
    </div>
);

interface ResultPanelProps {
    title: string;
    results: { label: string; value: string; isTotal?: boolean }[];
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ title, results }) => {
    return (
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="space-y-1">
                {results.map((result, index) => (
                    <ResultRow key={index} {...result} />
                ))}
            </div>
        </div>
    );
};
