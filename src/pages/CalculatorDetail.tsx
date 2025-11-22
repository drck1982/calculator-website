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

const WEIGHT_UNITS = [
    { name: 'Kilograms', factor: 1 },
    { name: 'Pounds', factor: 0.453592 },
    { name: 'Ounces', factor: 0.0283495 },
    { name: 'Grams', factor: 0.001 },
    { name: 'Stones', factor: 6.35029 }
];

const TEMPERATURE_UNITS = [
    { name: 'Celsius', type: 'C' },
    { name: 'Fahrenheit', type: 'F' },
    { name: 'Kelvin', type: 'K' }
];

const SPEED_UNITS = [
    { name: 'MPH', factor: 1 },
    { name: 'KPH', factor: 0.621371 },
    { name: 'Knots', factor: 1.15078 },
    { name: 'Meters/Sec', factor: 2.23694 }
];

const VOLUME_UNITS = [
    { name: 'Liters', factor: 1 },
    { name: 'Gallons (US)', factor: 3.78541 },
    { name: 'Cups', factor: 0.236588 },
    { name: 'Milliliters', factor: 0.001 },
    { name: 'Cubic Meters', factor: 1000 }
];

const AREA_UNITS = [
    { name: 'Square Meters', factor: 1 },
    { name: 'Square Feet', factor: 0.092903 },
    { name: 'Acres', factor: 4046.86 },
    { name: 'Hectares', factor: 10000 },
    { name: 'Square Kilometers', factor: 1000000 }
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
        } else if (id === 'weight-converter') {
            setFromUnit('Kilograms');
            setToUnit('Pounds');
        } else if (id === 'temperature-converter') {
            setFromUnit('Celsius');
            setToUnit('Fahrenheit');
        } else if (id === 'speed-converter') {
            setFromUnit('MPH');
            setToUnit('KPH');
        } else if (id === 'volume-converter') {
            setFromUnit('Liters');
            setToUnit('Gallons (US)');
        } else if (id === 'area-converter') {
            setFromUnit('Square Meters');
            setToUnit('Square Feet');
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
            // --- Finance ---
            if (id === 'simple-interest-calculator') {
                const p = Number(input1) || 1000;
                const r = Number(input2) || 5;
                const t = Number(input3) || 1;
                const interest = p * (r / 100) * t;
                setResults([
                    { label: 'Principal', value: `$${p}` },
                    { label: 'Total Interest', value: `$${interest.toFixed(2)}`, isTotal: true },
                    { label: 'Total Amount', value: `$${(p + interest).toFixed(2)}` },
                ]);
            } else if (id === 'apy-calculator') {
                const r = Number(input1) || 5;
                const n = Number(input2) || 12;
                const apy = (Math.pow(1 + (r / 100) / n, n) - 1) * 100;
                setResults([
                    { label: 'Nominal Rate', value: `${r}%` },
                    { label: 'APY', value: `${apy.toFixed(2)}%`, isTotal: true },
                ]);
            } else if (id === 'roi-calculator') {
                const invested = Number(input1) || 1000;
                const returned = Number(input2) || 1200;
                const roi = ((returned - invested) / invested) * 100;
                setResults([
                    { label: 'Net Profit', value: `$${(returned - invested).toFixed(2)}` },
                    { label: 'ROI', value: `${roi.toFixed(2)}%`, isTotal: true },
                ]);
            } else if (id === 'break-even-calculator') {
                const fixed = Number(input1) || 1000;
                const variable = Number(input2) || 10;
                const price = Number(input3) || 20;
                const bep = fixed / (price - variable);
                setResults([
                    { label: 'Contribution Margin', value: `$${(price - variable).toFixed(2)}` },
                    { label: 'Break-Even Units', value: `${Math.ceil(bep)}`, isTotal: true },
                ]);
            } else if (id === 'margin-calculator') {
                const cost = Number(input1) || 50;
                const revenue = Number(input2) || 100;
                const margin = ((revenue - cost) / revenue) * 100;
                const markup = ((revenue - cost) / cost) * 100;
                setResults([
                    { label: 'Profit', value: `$${(revenue - cost).toFixed(2)}` },
                    { label: 'Gross Margin', value: `${margin.toFixed(2)}%`, isTotal: true },
                    { label: 'Markup', value: `${markup.toFixed(2)}%` },
                ]);
            } else if (id === 'vat-calculator') {
                const amount = Number(input1) || 100;
                const rate = Number(input2) || 20;
                const vat = amount * (rate / 100);
                setResults([
                    { label: 'Net Amount', value: `$${amount.toFixed(2)}` },
                    { label: 'VAT Amount', value: `$${vat.toFixed(2)}` },
                    { label: 'Gross Amount', value: `$${(amount + vat).toFixed(2)}`, isTotal: true },
                ]);
            } else if (id === 'down-payment-calculator') {
                const price = Number(input1) || 300000;
                const percent = Number(input2) || 20;
                const down = price * (percent / 100);
                setResults([
                    { label: 'Purchase Price', value: `$${price.toLocaleString()}` },
                    { label: 'Down Payment', value: `$${down.toLocaleString()}`, isTotal: true },
                    { label: 'Loan Amount', value: `$${(price - down).toLocaleString()}` },
                ]);
            }

            // --- Math ---
            else if (id === 'binary-calculator') {
                const num = Number(input1) || 0;
                setResults([
                    { label: 'Decimal', value: num },
                    { label: 'Binary', value: num.toString(2), isTotal: true },
                ]);
            } else if (id === 'hex-calculator') {
                const num = Number(input1) || 0;
                setResults([
                    { label: 'Decimal', value: num },
                    { label: 'Hexadecimal', value: num.toString(16).toUpperCase(), isTotal: true },
                ]);
            } else if (id === 'prime-calculator') {
                const num = Number(input1) || 7;
                let isPrime = true;
                if (num <= 1) isPrime = false;
                for (let i = 2; i <= Math.sqrt(num); i++) {
                    if (num % i === 0) isPrime = false;
                }
                setResults([
                    { label: 'Number', value: num },
                    { label: 'Is Prime?', value: isPrime ? 'Yes' : 'No', isTotal: true },
                ]);
            } else if (id === 'gcf-lcm-calculator') {
                const a = Number(input1) || 12;
                const b = Number(input2) || 18;
                const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
                const lcm = (a * b) / gcd(a, b);
                setResults([
                    { label: 'GCF', value: gcd(a, b) },
                    { label: 'LCM', value: lcm, isTotal: true },
                ]);
            } else if (id === 'slope-calculator') {
                const [x1, y1] = (input1 as string).split(',').map(Number);
                const [x2, y2] = (input2 as string).split(',').map(Number);
                if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
                    const m = (y2 - y1) / (x2 - x1);
                    setResults([
                        { label: 'Slope (m)', value: m.toFixed(2), isTotal: true },
                    ]);
                } else {
                    setResults([{ label: 'Error', value: 'Invalid Format (x,y)' }]);
                }
            }

            // --- Geometry ---
            else if (id === 'circle-calculator') {
                const r = Number(input1) || 5;
                setResults([
                    { label: 'Radius', value: r },
                    { label: 'Area', value: (Math.PI * r * r).toFixed(2) },
                    { label: 'Circumference', value: (2 * Math.PI * r).toFixed(2), isTotal: true },
                ]);
            } else if (id === 'triangle-calculator') {
                const b = Number(input1) || 10;
                const h = Number(input2) || 5;
                setResults([
                    { label: 'Area', value: (0.5 * b * h).toFixed(2), isTotal: true },
                ]);
            } else if (id === 'pythagorean-calculator') {
                const a = Number(input1) || 3;
                const b = Number(input2) || 4;
                const c = Math.sqrt(a * a + b * b);
                setResults([
                    { label: 'Hypotenuse (c)', value: c.toFixed(2), isTotal: true },
                ]);
            } else if (id === 'tile-calculator') {
                const area = Number(input1) || 100;
                const tileArea = Number(input2) || 1; // sq ft
                setResults([
                    { label: 'Room Area', value: `${area} sq ft` },
                    { label: 'Tiles Needed', value: Math.ceil(area / tileArea * 1.1), isTotal: true }, // +10% waste
                ]);
            } else if (id === 'paint-calculator') {
                const area = Number(input1) || 400;
                const coverage = 350; // sq ft per gallon
                setResults([
                    { label: 'Wall Area', value: `${area} sq ft` },
                    { label: 'Gallons Needed', value: Math.ceil(area / coverage), isTotal: true },
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
            } else if (id === 'gas-mileage-calculator') {
                const dist = Number(input1) || 300;
                const gas = Number(input2) || 10;
                setResults([
                    { label: 'MPG', value: (dist / gas).toFixed(1), isTotal: true },
                ]);
            } else if (id === 'travel-time-calculator') {
                const dist = Number(input1) || 100;
                const speed = Number(input2) || 60;
                const time = dist / speed;
                const hours = Math.floor(time);
                const mins = Math.round((time - hours) * 60);
                setResults([
                    { label: 'Time', value: `${hours}h ${mins}m`, isTotal: true },
                ]);
            } else if (id === 'time-zone-converter') {
                const offsets: Record<string, number> = { 'UTC': 0, 'EST': -5, 'CST': -6, 'MST': -7, 'PST': -8, 'GMT': 0, 'CET': 1, 'JST': 9, 'AEST': 10 };
                const fromOffset = offsets[input1 as string] || 0;
                const toOffset = offsets[input2 as string] || 0;
                const diff = toOffset - fromOffset;
                const now = new Date();
                const targetTime = new Date(now.getTime() + diff * 3600000);
                setResults([
                    { label: 'Time Difference', value: `${diff > 0 ? '+' : ''}${diff} hours` },
                    { label: 'Current Time in Target', value: targetTime.toLocaleTimeString(), isTotal: true },
                ]);
            } else if (id === 'grade-calculator') {
                const score = Number(input1) || 85;
                const total = Number(input2) || 100;
                const grade = (score / total) * 100;
                let letter = 'F';
                if (grade >= 90) letter = 'A';
                else if (grade >= 80) letter = 'B';
                else if (grade >= 70) letter = 'C';
                else if (grade >= 60) letter = 'D';
                setResults([
                    { label: 'Percentage', value: `${grade.toFixed(1)}%` },
                    { label: 'Letter Grade', value: letter, isTotal: true },
                ]);
            } else if (id === 'standard-deviation') {
                const nums = (input1 as string).split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
                if (nums.length > 0) {
                    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
                    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
                    const stdDev = Math.sqrt(variance);
                    setResults([
                        { label: 'Mean', value: mean.toFixed(4) },
                        { label: 'Standard Deviation (Population)', value: stdDev.toFixed(4), isTotal: true },
                    ]);
                } else {
                    setResults([{ label: 'Error', value: 'Invalid Input' }]);
                }
            }

            // --- Existing / Default ---
            else if (id === 'currency-converter') {
                // Mock rates relative to USD
                const rates: Record<string, number> = {
                    'USD': 1, 'EUR': 0.95, 'GBP': 0.79, 'JPY': 154.0, 'CNY': 7.24,
                    'CAD': 1.40, 'AUD': 1.54, 'CHF': 0.89, 'HKD': 7.78, 'NZD': 1.71,
                    'SGD': 1.34, 'INR': 84.4, 'KRW': 1400, 'MXN': 20.4, 'BRL': 5.8,
                    'RUB': 100.0, 'ZAR': 18.1
                };
                const rate = (rates[toUnit] || 1) / (rates[fromUnit] || 1);
                const result = Number(amount) * rate;
                setResults([
                    { label: 'Exchange Rate', value: `1 ${fromUnit} = ${rate.toFixed(4)} ${toUnit}` },
                    { label: 'Converted Amount', value: `${result.toFixed(2)} ${toUnit}`, isTotal: true },
                ]);
            } else if (id === 'length-converter') {
                const fromFactor = LENGTH_UNITS.find(u => u.name === fromUnit)?.factor || 1;
                const toFactor = LENGTH_UNITS.find(u => u.name === toUnit)?.factor || 1;
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
        // --- Finance ---
        if (id === 'simple-interest-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Principal ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="1000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Rate (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="5" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Time (Years)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="1" /></div>
                </div>
            );
        } else if (id === 'apy-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Compounding Frequency (per year)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="12" /></div>
                </div>
            );
        } else if (id === 'roi-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount Invested ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="1000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount Returned ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="1200" /></div>
                </div>
            );
        } else if (id === 'break-even-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Fixed Costs ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="1000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Variable Cost per Unit ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="10" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="20" /></div>
                </div>
            );
        } else if (id === 'margin-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="50" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Revenue ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="100" /></div>
                </div>
            );
        } else if (id === 'vat-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Net Amount ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">VAT Rate (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="20" /></div>
                </div>
            );
        } else if (id === 'down-payment-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="300000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="20" /></div>
                </div>
            );
        }

        // --- Math ---
        else if (id === 'binary-calculator' || id === 'hex-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Decimal Number</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="10" /></div>
                </div>
            );
        } else if (id === 'prime-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Number to Check</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="7" /></div>
                </div>
            );
        } else if (id === 'gcf-lcm-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Number A</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="12" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Number B</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="18" /></div>
                </div>
            );
        } else if (id === 'slope-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Point 1 (x1,y1)</label><input type="text" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="1,2" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Point 2 (x2,y2)</label><input type="text" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="3,4" /></div>
                </div>
            );
        }

        // --- Geometry ---
        else if (id === 'circle-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Radius</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5" /></div>
                </div>
            );
        } else if (id === 'triangle-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Base</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="10" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Height</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="5" /></div>
                </div>
            );
        } else if (id === 'pythagorean-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Side A</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="3" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Side B</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="4" /></div>
                </div>
            );
        } else if (id === 'tile-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Room Area (sq ft)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Tile Area (sq ft)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="1" /></div>
                </div>
            );
        } else if (id === 'paint-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Wall Area (sq ft)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="400" /></div>
                </div>
            );
        }

        // --- Everyday ---
        else if (id === 'gas-mileage-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Distance Driven (miles)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="300" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Gas Used (gallons)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="10" /></div>
                </div>
            );
        } else if (id === 'travel-time-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Distance (miles)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Speed (mph)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="60" /></div>
                </div>
            );
        } else if (id === 'grade-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Score</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="85" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Possible</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="100" /></div>
                </div>
            );
        }

        // --- Science & Others ---
        else if (id === 'dna-replication') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">DNA Sequence (ATCG)</label><input type="text" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="ATCG..." /></div>
                </div>
            );
        } else if (id === 'allele-frequency') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">AA Count</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="10" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Aa Count</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="20" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">aa Count</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="5" /></div>
                </div>
            );
        } else if (id === 'molarity-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Moles of Solute</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="1" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Volume of Solution (L)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="1" /></div>
                </div>
            );
        } else if (id === 'ph-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">H+ Concentration (M)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="0.0000001" /></div>
                </div>
            );
        } else if (id === 'velocity-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Distance (m)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Time (s)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="10" /></div>
                </div>
            );
        } else if (id === 'pace-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Time (min)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="30" /></div>
                </div>
            );
        } else if (id === 'wallpaper-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Wall Height (ft)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="8" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Wall Width (ft)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="10" /></div>
                </div>
            );
        } else if (id === 'time-zone-converter') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Time Zone</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input1 as string} onChange={(e) => setInput1(e.target.value)}>
                            <option>UTC</option><option>EST</option><option>CST</option><option>MST</option><option>PST</option><option>GMT</option><option>CET</option><option>JST</option><option>AEST</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Time Zone</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)}>
                            <option>UTC</option><option>EST</option><option>CST</option><option>MST</option><option>PST</option><option>GMT</option><option>CET</option><option>JST</option><option>AEST</option>
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'standard-deviation') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Numbers (comma-separated)</label><input type="text" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="1, 2, 3, 4, 5" /></div>
                </div>
            );
        }

        // --- Conversion ---
        else if (id === 'weight-converter') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                                {WEIGHT_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                                {WEIGHT_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else if (id === 'temperature-converter') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                                {TEMPERATURE_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                                {TEMPERATURE_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else if (id === 'speed-converter') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Speed</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                                {SPEED_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                                {SPEED_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else if (id === 'volume-converter') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Volume</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                                {VOLUME_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                                {VOLUME_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        } else if (id === 'area-converter') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Area</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
                                {AREA_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
                                {AREA_UNITS.map(u => (
                                    <option key={u.name} value={u.name}>{u.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            );
        }

        // --- Existing ---
        else if (id === 'currency-converter') {
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
