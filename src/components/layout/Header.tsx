import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Menu, Search, Globe } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Calculator className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">WorkMoney Tools</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/category/salary-tax" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Salary & Tax
                    </Link>
                    <Link to="/category/loans-debt" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Loans & Debt
                    </Link>
                    <Link to="/category/investment" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        Investment
                    </Link>
                    <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        About
                    </Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors" aria-label="Search">
                        <Search className="h-5 w-5" />
                    </button>
                    <button className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-900">
                        <Globe className="h-4 w-4" />
                        <span>EN</span>
                    </button>
                    <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};
