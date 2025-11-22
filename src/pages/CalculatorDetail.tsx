import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CalculatorForm } from '../components/calculator/CalculatorForm';
import { ResultPanel } from '../components/calculator/ResultPanel';
import { ContentSection } from '../components/calculator/ContentSection';
import { FAQSection } from '../components/calculator/FAQSection';
import { AdSlot } from '../components/common/AdSlot';
import { RelatedCategories } from '../components/category/RelatedCategories';
import {
    Calculator as CalcIcon,
    Baby,
    Calendar,
    Printer
} from 'lucide-react';
import { toolConfigs } from '../data/tools';
import { US_STATES } from '../data/us_states';
import { SEO } from '../components/common/SEO';
import { Helmet } from 'react-helmet-async';

const CURRENCIES = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'ZAR', name: 'South African Rand' }
];

const LENGTH_UNITS = [
    { name: 'Meters', factor: 1 },
    { name: 'Feet', factor: 0.3048 },
    { name: 'Inches', factor: 0.0254 },
    { name: 'Centimeters', factor: 0.01 },
    { name: 'Kilometers', factor: 1000 },
    { name: 'Miles', factor: 1609.34 },
    { name: 'Yards', factor: 0.9144 }
];

export const CalculatorDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const config = toolConfigs[id || ''] || toolConfigs['default'];

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": config.title,
        "applicationCategory": config.category,
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": config.description
    };

    // Generic State
    const [salaryInput, setSalaryInput] = useState<number>(100000);
    const [selectedState, setSelectedState] = useState<string>('NY');

    // Converter State
    const [amount, setAmount] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState<string>('USD');
    const [toUnit, setToUnit] = useState<string>('EUR');

    // Generic Inputs
    const [input1, setInput1] = useState<string | number>('');
    const [input2, setInput2] = useState<string | number>('');
    const [input3, setInput3] = useState<string | number>('');

    const [results, setResults] = useState<any[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);

    // Effect to reset state when tool changes
    useEffect(() => {
        setResults([
            { label: 'Result', value: '-' },
            { label: 'Total', value: '-', isTotal: true },
        ]);
        // Reset defaults
        if (id === 'length-converter') {
            setFromUnit('Meters');
            setToUnit('Feet');
        } else if (id === 'currency-converter') {
            setFromUnit('USD');
            setToUnit('EUR');
        } else if (id === 'age-calculator' || id === 'date-calculator' || id === 'pregnancy-calculator') {
            // Date inputs
            setInput1('');
            setInput2('');
        } else {
            setInput1('');
            setInput2('');
            setInput3('');
        }
    }, [id]);

    const handleCalculate = () => {
        setIsCalculating(true);

        // Simulate calculation delay
        setTimeout(() => {
            if (id === 'currency-converter') {
                // Mock rates relative to USD
                const rates: Record<string, number> = {
                    'USD': 1,
                    'EUR': 0.95,
                    'GBP': 0.79,
                    'JPY': 154.0,
                    'CNY': 7.24,
                    'CAD': 1.40,
                    'AUD': 1.54,
                    'CHF': 0.89,
                    'HKD': 7.78,
                    'NZD': 1.71,
                    'SGD': 1.34,
                    'INR': 84.4,
                    'KRW': 1400,
                    'MXN': 20.4,
                    'BRL': 5.8,
                    'RUB': 100.0,
                    'ZAR': 18.1
                };
                const rate = (rates[toUnit] || 1) / (rates[fromUnit] || 1);
                const result = Number(amount) * rate;
                setResults([
                    { label: 'Exchange Rate', value: `1 ${fromUnit} = ${rate.toFixed(4)} ${toUnit}` },
                    { label: 'Converted Amount', value: `${result.toFixed(2)} ${toUnit}`, isTotal: true },
                ]);
            } else if (id === 'length-converter') {
                // Use LENGTH_UNITS for conversion
                const fromFactor = LENGTH_UNITS.find(u => u.name === fromUnit)?.factor || 1;
                const toFactor = LENGTH_UNITS.find(u => u.name === toUnit)?.factor || 1;

                // Convert to base (meters) then to target
                const valInMeters = Number(amount) * fromFactor;
                const result = valInMeters / toFactor;

                setResults([
                    { label: 'Input', value: `${amount} ${fromUnit}` },
                    { label: 'Result', value: `${result.toFixed(4)} ${toUnit}`, isTotal: true },
                ]);
            } else if (id === 'age-calculator') {
                const birth = new Date(input1 as string);
                const now = new Date();
                const diff = now.getTime() - birth.getTime();
                const ageDate = new Date(diff);
                const years = Math.abs(ageDate.getUTCFullYear() - 1970);
                setResults([
                    { label: 'Age', value: `${years} Years`, isTotal: true },
                    { label: 'Next Birthday', value: 'In 4 months' },
                ]);
            } else if (id === 'date-calculator') {
                const start = new Date(input1 as string);
                const end = new Date(input2 as string);
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setResults([
                    { label: 'Start Date', value: input1 as string },
                    { label: 'End Date', value: input2 as string },
                    { label: 'Difference', value: `${diffDays} Days`, isTotal: true },
                ]);
            } else if (id === 'pregnancy-calculator') {
                const lmp = new Date(input1 as string);
                const dueDate = new Date(lmp);
                dueDate.setDate(lmp.getDate() + 280); // + 280 days
                setResults([
                    { label: 'Last Period', value: input1 as string },
                    { label: 'Estimated Due Date', value: dueDate.toLocaleDateString(), isTotal: true },
                ]);
            } else if (id === 'tip-calculator') {
                const bill = Number(input1) || 100;
                const tipPercent = Number(input2) || 15;
                const tip = bill * (tipPercent / 100);
                const total = bill + tip;
                setResults([
                    { label: 'Bill Amount', value: `$${bill.toFixed(2)}` },
                    { label: 'Tip Amount', value: `$${tip.toFixed(2)}` },
                    { label: 'Total to Pay', value: `$${total.toFixed(2)}`, isTotal: true },
                ]);
            } else if (id === 'percentage-calculator') {
                const val = Number(input1) || 50;
                const total = Number(input2) || 200;
                const pct = (val / total) * 100;
                setResults([
                    { label: 'Calculation', value: `${val} is what % of ${total}?` },
                    { label: 'Result', value: `${pct.toFixed(2)}%`, isTotal: true },
                ]);
            } else if (id === 'concrete-calculator') {
                const l = Number(input1) || 10;
                const w = Number(input2) || 10;
                const d = Number(input3) || 4;
                const vol = l * w * (d / 12);
                const bags = Math.ceil(vol / 0.6);
                setResults([
                    { label: 'Volume', value: `${vol.toFixed(2)} cu. ft.` },
                    { label: '80lb Bags Needed', value: `${bags}`, isTotal: true },
                ]);
            } else if (id === 'hourly-to-salary') {
                const hourly = Number(input1) || 25;
                const hours = Number(input2) || 40;
                const weekly = hourly * hours;
                const annual = weekly * 52;
                setResults([
                    { label: 'Weekly Pay', value: `$${weekly.toLocaleString()}` },
                    { label: 'Monthly Pay', value: `$${(annual / 12).toLocaleString()}` },
                    { label: 'Annual Salary', value: `$${annual.toLocaleString()}`, isTotal: true },
                ]);
            } else if (id === 'calorie-calculator') {
                setResults([
                    { label: 'BMR', value: '1,650 kcal' },
                    { label: 'Maintenance', value: '2,200 kcal', isTotal: true },
                    { label: 'Weight Loss', value: '1,700 kcal' },
                ]);
            } else if (id === 'random-number') {
                const min = Number(input1) || 1;
                const max = Number(input2) || 100;
                const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
                setResults([
                    { label: 'Range', value: `${min} - ${max}` },
                    { label: 'Random Number', value: `${rnd}`, isTotal: true },
                ]);
            } else if (id === 'mortgage-calculator') {
                setResults([
                    { label: 'Principal & Interest', value: '$2,100' },
                    { label: 'Property Tax', value: '$400' },
                    { label: 'Home Insurance', value: '$100' },
                    { label: 'Total Monthly', value: '$2,600', isTotal: true },
                ]);
            } else if (id === 'auto-loan-calculator') {
                setResults([
                    { label: 'Monthly Payment', value: '$550', isTotal: true },
                    { label: 'Total Interest', value: '$3,200' },
                    { label: 'Total Cost', value: '$38,200' },
                ]);
            } else if (id === 'compound-interest-calculator') {
                setResults([
                    { label: 'Total Principal', value: '$12,000' },
                    { label: 'Total Interest', value: '$3,450' },
                    { label: 'Future Value', value: '$15,450', isTotal: true },
                ]);
            } else if (id === 'bmi-calculator') {
                setResults([
                    { label: 'BMI Score', value: '22.5', isTotal: true },
                    { label: 'Category', value: 'Normal Weight' },
                ]);
            } else if (id === 'inflation-calculator') {
                setResults([
                    { label: 'Value Then', value: '$100.00' },
                    { label: 'Value Now', value: '$154.32', isTotal: true },
                    { label: 'Cumulative Inflation', value: '54.3%' },
                ]);
            } else if (id?.includes('salary')) {
                const stateData = US_STATES.find(s => s.code === selectedState) || US_STATES[0];
                const fedTax = salaryInput * 0.1426;
                const ficaTax = salaryInput * 0.0765;
                const stateTax = salaryInput * stateData.taxRate;
                const netPay = salaryInput - fedTax - ficaTax - stateTax;

                setResults([
                    { label: 'Federal Tax', value: `$${fedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'FICA Tax', value: `$${ficaTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: `State Tax (${stateData.code})`, value: `$${stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Net Pay', value: `$${netPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
                ]);
            } else {
                setResults([
                    { label: 'Result', value: '100' },
                    { label: 'Total', value: '100', isTotal: true },
                ]);
            }
            setIsCalculating(false);
        }, 600);
    };

    // Render different forms based on ID
    const renderForm = () => {
        if (id === 'currency-converter') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                                {CURRENCIES.map(c => (
                                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                                {CURRENCIES.map(c => (
                                    <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else if (id === 'length-converter') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Length</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                                {LENGTH_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                                {LENGTH_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else if (id === 'age-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label><input type="date" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(e.target.value)} /></div>
                </div>
            );
        } else if (id === 'date-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input type="date" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(e.target.value)} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">End Date</label><input type="date" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(e.target.value)} /></div>
                </div>
            );
        } else if (id === 'pregnancy-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">First Day of Last Period</label><input type="date" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(e.target.value)} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Cycle Length (Days)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="28" /></div>
                </div>
            );
        } else if (id === 'tip-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Tip Percentage (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="15" /></div>
                </div>
            );
        } else if (id === 'percentage-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Value (X)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="50" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Total (Y)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="200" /></div>
                </div>
            );
        } else if (id === 'concrete-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Length (ft)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="10" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Width (ft)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="10" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Depth (in)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="4" /></div>
                </div>
            );
        } else if (id === 'hourly-to-salary') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Hourly Wage ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="25" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Hours per Week</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="40" /></div>
                </div>
            );
        } else if (id === 'calorie-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Age</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={30} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Gender</label><select className="block w-full p-2 border border-gray-300 rounded-md"><option>Male</option><option>Female</option></select></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={175} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={75} /></div>
                </div>
            );
        } else if (id === 'random-number') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Min Value</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="1" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Max Value</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="100" /></div>
                </div>
            );
        } else if (id === 'mortgage-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Home Price</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={300000} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={60000} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={6.5} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label><select className="block w-full p-2 border border-gray-300 rounded-md"><option>30</option><option>15</option></select></div>
                </div>
            );
        } else if (id === 'auto-loan-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Price</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={35000} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={5000} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={5.9} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Term (Months)</label><select className="block w-full p-2 border border-gray-300 rounded-md"><option>60</option><option>48</option><option>72</option></select></div>
                </div>
            );
        } else if (id === 'compound-interest-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={5000} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={500} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={7} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Years to Grow</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={10} /></div>
                </div>
            );
        } else if (id === 'bmi-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={175} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={70} /></div>
                </div>
            );
        } else if (id === 'inflation-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={100} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={2000} /></div>
                </div>
            );
        } else if (id?.includes('salary')) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gross Pay</label>
                        <input
                            type="number"
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            value={salaryInput}
                            onChange={(e) => setSalaryInput(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pay Frequency</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md">
                            <option>Yearly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <select
                            className="block w-full p-2 border border-gray-300 rounded-md"
                            value={selectedState}
                            onChange={(e) => setSelectedState(e.target.value)}
                        >
                            {US_STATES.map((state: { code: string; name: string; taxRate: number }) => (
                                <option key={state.code} value={state.code}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="p-4 text-gray-500 bg-gray-50 rounded-lg text-center">
                    <p className="mb-2">Generic Calculator Form</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Input 1</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={0} /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Input 2</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={0} /></div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={`${config.title} - Free Online Calculator`}
                description={config.description}
                keywords={`${config.title.toLowerCase()}, free calculator, online tool, ${config.category.toLowerCase()}`}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[
                    { label: 'Categories', href: '/all-tools' },
                    { label: config.category },
                    { label: config.title }
                ]} />

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{config.title}</h1>
                    <p className="text-lg text-gray-600">{config.description}</p>
                </div>

                <AdSlot id="calc-top-banner" className="mb-8" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <CalculatorForm title={config.formTitle} onCalculate={handleCalculate}>
                            {renderForm()}
                        </CalculatorForm>

                        <div className="mt-12">
                            <ContentSection id="what-it-does" title="What this calculator does">
                                {config.content.what}
                            </ContentSection>

                            <AdSlot id="in-content-1" />

                            <ContentSection id="how-to-use" title="How to use the calculator">
                                {config.content.how}
                            </ContentSection>

                            <ContentSection id="formula" title="Formula & Methodology">
                                {config.content.formula}
                            </ContentSection>

                            <AdSlot id="in-content-2" />

                            <FAQSection items={config.faq} />
                        </div>
                    </div>

                    {/* Right Column: Results & Ads */}
                    <div className="lg:col-span-1">
                        <div className={`transition-opacity duration-200 ${isCalculating ? 'opacity-50' : 'opacity-100'}`}>
                            <ResultPanel title={config.resultTitle} results={results} />
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                    <Printer className="w-4 h-4 mr-1" /> Print Results
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <CalcIcon className="w-5 h-5 mr-2 text-blue-600" />
                                Popular Calculators
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/tools/pregnancy-calculator" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <Baby className="w-4 h-4 mr-2 text-pink-400" /> Pregnancy Calculator
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tools/date-calculator" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <Calendar className="w-4 h-4 mr-2 text-indigo-400" /> Date Calculator
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tools/bmi-calculator" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold mr-2">B</div>
                                        BMI Calculator
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tools/mortgage-calculator" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-2">$</div>
                                        Mortgage Calculator
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8">
                            <AdSlot id="sidebar-ad" className="h-[600px]" label="Advertisement" />
                        </div>
                    </div>
                </div>

                <RelatedCategories currentCategory={config.category} />
            </div>
        </div>
    );
};
