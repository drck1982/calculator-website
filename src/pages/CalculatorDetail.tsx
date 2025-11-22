import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CalculatorForm } from '../components/calculator/CalculatorForm';
import { ResultPanel } from '../components/calculator/ResultPanel';
import { ContentSection } from '../components/calculator/ContentSection';
import { FAQSection } from '../components/calculator/FAQSection';
import { AdSlot } from '../components/common/AdSlot';
import { RelatedCategories } from '../components/category/RelatedCategories';
import { Printer, Calculator as CalcIcon, Calendar, Baby } from 'lucide-react';

// Tool Configuration Types
interface ToolConfig {
    title: string;
    description: string;
    category: string;
    categoryLink: string;
    formTitle: string;
    resultTitle: string;
    content: {
        what: React.ReactNode;
        how: React.ReactNode;
        formula: React.ReactNode;
    };
    faq: { question: string; answer: string }[];
}

const US_STATES = [
    { code: 'AL', name: 'Alabama', taxRate: 0.04 },
    { code: 'AK', name: 'Alaska', taxRate: 0.00 },
    { code: 'AZ', name: 'Arizona', taxRate: 0.025 },
    { code: 'AR', name: 'Arkansas', taxRate: 0.049 },
    { code: 'CA', name: 'California', taxRate: 0.093 },
    { code: 'CO', name: 'Colorado', taxRate: 0.044 },
    { code: 'CT', name: 'Connecticut', taxRate: 0.0699 },
    { code: 'DE', name: 'Delaware', taxRate: 0.066 },
    { code: 'DC', name: 'District of Columbia', taxRate: 0.085 },
    { code: 'FL', name: 'Florida', taxRate: 0.00 },
    { code: 'GA', name: 'Georgia', taxRate: 0.0575 },
    { code: 'HI', name: 'Hawaii', taxRate: 0.11 },
    { code: 'ID', name: 'Idaho', taxRate: 0.058 },
    { code: 'IL', name: 'Illinois', taxRate: 0.0495 },
    { code: 'IN', name: 'Indiana', taxRate: 0.0323 },
    { code: 'IA', name: 'Iowa', taxRate: 0.06 },
    { code: 'KS', name: 'Kansas', taxRate: 0.057 },
    { code: 'KY', name: 'Kentucky', taxRate: 0.045 },
    { code: 'LA', name: 'Louisiana', taxRate: 0.0425 },
    { code: 'ME', name: 'Maine', taxRate: 0.0715 },
    { code: 'MD', name: 'Maryland', taxRate: 0.0575 },
    { code: 'MA', name: 'Massachusetts', taxRate: 0.05 },
    { code: 'MI', name: 'Michigan', taxRate: 0.0425 },
    { code: 'MN', name: 'Minnesota', taxRate: 0.0985 },
    { code: 'MS', name: 'Mississippi', taxRate: 0.05 },
    { code: 'MO', name: 'Missouri', taxRate: 0.054 },
    { code: 'MT', name: 'Montana', taxRate: 0.0675 },
    { code: 'NE', name: 'Nebraska', taxRate: 0.0684 },
    { code: 'NV', name: 'Nevada', taxRate: 0.00 },
    { code: 'NH', name: 'New Hampshire', taxRate: 0.00 },
    { code: 'NJ', name: 'New Jersey', taxRate: 0.1075 },
    { code: 'NM', name: 'New Mexico', taxRate: 0.059 },
    { code: 'NY', name: 'New York', taxRate: 0.0882 },
    { code: 'NC', name: 'North Carolina', taxRate: 0.0475 },
    { code: 'ND', name: 'North Dakota', taxRate: 0.029 },
    { code: 'OH', name: 'Ohio', taxRate: 0.0399 },
    { code: 'OK', name: 'Oklahoma', taxRate: 0.0475 },
    { code: 'OR', name: 'Oregon', taxRate: 0.099 },
    { code: 'PA', name: 'Pennsylvania', taxRate: 0.0307 },
    { code: 'RI', name: 'Rhode Island', taxRate: 0.0599 },
    { code: 'SC', name: 'South Carolina', taxRate: 0.07 },
    { code: 'SD', name: 'South Dakota', taxRate: 0.00 },
    { code: 'TN', name: 'Tennessee', taxRate: 0.00 },
    { code: 'TX', name: 'Texas', taxRate: 0.00 },
    { code: 'UT', name: 'Utah', taxRate: 0.0485 },
    { code: 'VT', name: 'Vermont', taxRate: 0.0875 },
    { code: 'VA', name: 'Virginia', taxRate: 0.0575 },
    { code: 'WA', name: 'Washington', taxRate: 0.00 },
    { code: 'WV', name: 'West Virginia', taxRate: 0.065 },
    { code: 'WI', name: 'Wisconsin', taxRate: 0.0765 },
    { code: 'WY', name: 'Wyoming', taxRate: 0.00 }
];

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
    { code: 'ZAR', name: 'South African Rand' },
];

const LENGTH_UNITS = [
    { name: 'Meters', factor: 1 },
    { name: 'Kilometers', factor: 1000 },
    { name: 'Centimeters', factor: 0.01 },
    { name: 'Millimeters', factor: 0.001 },
    { name: 'Miles', factor: 1609.344 },
    { name: 'Yards', factor: 0.9144 },
    { name: 'Feet', factor: 0.3048 },
    { name: 'Inches', factor: 0.0254 },
];

// Mock Data Configuration
const toolConfigs: Record<string, ToolConfig> = {
    'us-salary-tax-calculator': {
        title: 'US Salary Tax Calculator 2025',
        description: 'Estimate your 2025 take-home pay after federal, state, and local taxes.',
        category: 'Salary & Tax',
        categoryLink: '/category/salary-tax',
        formTitle: 'Enter your salary details',
        resultTitle: 'Your estimated take-home pay',
        content: {
            what: <p>This Salary Tax Calculator helps you estimate your actual take-home pay. It calculates how much of your gross income will go towards federal, state, and local taxes.</p>,
            how: <ol><li>Enter your Gross Pay</li><li>Select Pay Frequency</li><li>Choose Filing Status</li><li>Select State</li></ol>,
            formula: <p>Net Pay = Gross Pay - Federal Tax - State Tax - Local Tax - FICA Tax</p>
        },
        faq: [
            { question: "Does this include 401(k)?", answer: "Not yet, coming soon." },
            { question: "Are rates current?", answer: "Yes, updated for 2025." }
        ]
    },
    'ny-salary-tax-calculator': {
        title: 'US New York Salary Tax Calculator 2025',
        description: 'Estimate your 2025 take-home pay in New York after federal, state, and city taxes.',
        category: 'Salary & Tax',
        categoryLink: '/category/salary-tax',
        formTitle: 'Enter your salary details',
        resultTitle: 'Your estimated take-home pay',
        content: {
            what: <p>This New York Salary Tax Calculator helps you estimate your actual take-home pay. It calculates how much of your gross income will go towards federal, state, and local taxes.</p>,
            how: <ol><li>Enter your Gross Pay</li><li>Select Pay Frequency</li><li>Choose Filing Status</li><li>Select State</li></ol>,
            formula: <p>Net Pay = Gross Pay - Federal Tax - State Tax - Local Tax - FICA Tax</p>
        },
        faq: [
            { question: "Does this include 401(k)?", answer: "Not yet, coming soon." },
            { question: "Are rates current?", answer: "Yes, updated for 2025." }
        ]
    },
    'hourly-to-salary': {
        title: 'Hourly to Salary Converter',
        description: 'Convert your hourly wage to an equivalent annual salary.',
        category: 'Salary & Tax',
        categoryLink: '/category/salary-tax',
        formTitle: 'Enter wage details',
        resultTitle: 'Annual Salary Equivalent',
        content: {
            what: <p>Easily convert hourly wages to yearly salary, monthly pay, and weekly checks.</p>,
            how: <ol><li>Enter Hourly Wage</li><li>Enter Hours per Week</li><li>Click Calculate</li></ol>,
            formula: <p>Annual = Hourly Rate * Hours/Week * 52</p>
        },
        faq: []
    },
    'mortgage-calculator': {
        title: 'Mortgage Payment Calculator',
        description: 'Calculate your monthly mortgage payments including principal, interest, taxes, and insurance.',
        category: 'Loans & Debt',
        categoryLink: '/category/loans-debt',
        formTitle: 'Enter loan details',
        resultTitle: 'Monthly Payment Breakdown',
        content: {
            what: <p>Use this calculator to estimate your monthly mortgage payment. It factors in the loan amount, interest rate, and loan term to give you a clear picture of your housing costs.</p>,
            how: <ol><li>Enter Home Price</li><li>Enter Down Payment</li><li>Set Interest Rate</li><li>Choose Loan Term</li></ol>,
            formula: <p>M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]</p>
        },
        faq: [
            { question: "What is PMI?", answer: "Private Mortgage Insurance, usually required if down payment is less than 20%." },
            { question: "Does this include property tax?", answer: "Yes, if you enter the estimated tax rate." }
        ]
    },
    'auto-loan-calculator': {
        title: 'Auto Loan Calculator',
        description: 'Estimate your monthly car loan payments and total interest cost.',
        category: 'Loans & Debt',
        categoryLink: '/category/loans-debt',
        formTitle: 'Enter car loan details',
        resultTitle: 'Monthly Car Payment',
        content: {
            what: <p>Find out how much that new car will really cost you per month. This tool helps you compare loan offers and terms.</p>,
            how: <ol><li>Enter Car Price</li><li>Enter Down Payment / Trade-in</li><li>Set Interest Rate</li><li>Choose Loan Term (months)</li></ol>,
            formula: <p>Standard amortization formula applied to monthly periods.</p>
        },
        faq: [
            { question: "Should I take a longer loan term?", answer: "Longer terms lower monthly payments but increase total interest paid." }
        ]
    },
    'compound-interest-calculator': {
        title: 'Compound Interest Calculator',
        description: 'See how your investments grow over time with the power of compound interest.',
        category: 'Investment',
        categoryLink: '/category/investment',
        formTitle: 'Enter investment details',
        resultTitle: 'Future Value Projection',
        content: {
            what: <p>Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest. This calculator shows how money grows over time.</p>,
            how: <ol><li>Enter Initial Investment</li><li>Enter Monthly Contribution</li><li>Set Interest Rate</li><li>Choose Time Period</li></ol>,
            formula: <p>A = P(1 + r/n)^(nt)</p>
        },
        faq: [
            { question: "What is a good interest rate?", answer: "The S&P 500 historically returns about 7-10% annually adjusted for inflation." }
        ]
    },
    'bmi-calculator': {
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index (BMI) to check if you are at a healthy weight.',
        category: 'Health',
        categoryLink: '/category/life-health',
        formTitle: 'Enter your height and weight',
        resultTitle: 'Your BMI Score',
        content: {
            what: <p>Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.</p>,
            how: <ol><li>Enter Height (ft/in or cm)</li><li>Enter Weight (lbs or kg)</li><li>Click Calculate</li></ol>,
            formula: <p>BMI = kg/m²</p>
        },
        faq: [
            { question: "Is BMI accurate for athletes?", answer: "BMI may overestimate body fat in athletes and others who have a muscular build." }
        ]
    },
    'calorie-calculator': {
        title: 'Calorie Calculator',
        description: 'Estimate the number of calories you need to eat daily to maintain, lose, or gain weight.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Enter your details',
        resultTitle: 'Daily Calorie Needs',
        content: {
            what: <p>This calculator uses the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR) and daily calorie needs based on your activity level.</p>,
            how: <ol><li>Enter Age, Gender, Height, Weight</li><li>Select Activity Level</li><li>Click Calculate</li></ol>,
            formula: <p>BMR = 10W + 6.25H - 5A + 5 (Men) / -161 (Women)</p>
        },
        faq: []
    },
    'pregnancy-calculator': {
        title: 'Pregnancy Calculator',
        description: 'Estimate your due date based on your last menstrual period.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Enter dates',
        resultTitle: 'Estimated Due Date',
        content: {
            what: <p>This calculator estimates your due date based on the date of your last menstrual period (LMP) and the average length of your cycle.</p>,
            how: <ol><li>Select First Day of Last Period</li><li>Enter Cycle Length (days)</li><li>Click Calculate</li></ol>,
            formula: <p>Naegele's Rule: LMP + 7 days - 3 months + 1 year</p>
        },
        faq: []
    },
    'inflation-calculator': {
        title: 'Inflation Calculator',
        description: 'Calculate the changing value of money over time due to inflation.',
        category: 'Finance',
        categoryLink: '/category/investment',
        formTitle: 'Enter inflation details',
        resultTitle: 'Purchasing Power Result',
        content: {
            what: <p>This calculator measures the buying power of the dollar over time. Enter a start year and amount to see what it's worth in today's dollars.</p>,
            how: <ol><li>Enter Amount</li><li>Enter Start Year</li><li>Enter End Year</li></ol>,
            formula: <p>Based on CPI (Consumer Price Index) data.</p>
        },
        faq: [
            { question: "What data source is used?", answer: "We use historical CPI data from the Bureau of Labor Statistics." }
        ]
    },
    'currency-converter': {
        title: 'Currency Converter',
        description: 'Convert between different currencies using real-time exchange rates.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Enter amount and currencies',
        resultTitle: 'Conversion Result',
        content: {
            what: <p>This tool allows you to convert between major world currencies. It uses up-to-date exchange rates to provide accurate conversions.</p>,
            how: <ol><li>Enter Amount</li><li>Select From Currency</li><li>Select To Currency</li><li>Click Calculate</li></ol>,
            formula: <p>Result = Amount * Exchange Rate</p>
        },
        faq: [
            { question: "How often are rates updated?", answer: "Rates are updated daily based on market closing prices." }
        ]
    },
    'length-converter': {
        title: 'Length Converter',
        description: 'Convert between different units of length (meters, feet, inches, etc.).',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Enter length details',
        resultTitle: 'Converted Length',
        content: {
            what: <p>Easily convert between metric and imperial length units. Useful for construction, education, and daily tasks.</p>,
            how: <ol><li>Enter Length Value</li><li>Select From Unit</li><li>Select To Unit</li></ol>,
            formula: <p>1 meter = 3.28084 feet</p>
        },
        faq: []
    },
    'age-calculator': {
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days from your date of birth.',
        category: 'Everyday Life',
        categoryLink: '/category/everyday-life',
        formTitle: 'Enter your date of birth',
        resultTitle: 'Your Exact Age',
        content: {
            what: <p>Find out exactly how old you are in years, months, and days. It also calculates the days until your next birthday.</p>,
            how: <ol><li>Select Date of Birth</li><li>Click Calculate</li></ol>,
            formula: <p>Current Date - Birth Date</p>
        },
        faq: []
    },
    'date-calculator': {
        title: 'Date Calculator',
        description: 'Calculate the number of days between two dates.',
        category: 'Everyday Life',
        categoryLink: '/category/everyday-life',
        formTitle: 'Enter dates',
        resultTitle: 'Time Difference',
        content: {
            what: <p>Calculate the duration between two dates in years, months, and days.</p>,
            how: <ol><li>Select Start Date</li><li>Select End Date</li><li>Click Calculate</li></ol>,
            formula: <p>End Date - Start Date</p>
        },
        faq: []
    },
    'tip-calculator': {
        title: 'Tip Calculator',
        description: 'Calculate the tip amount and total bill, including splitting between people.',
        category: 'Everyday Life',
        categoryLink: '/category/everyday-life',
        formTitle: 'Enter bill details',
        resultTitle: 'Tip & Total',
        content: {
            what: <p>Quickly calculate how much to tip your server and how to split the bill among friends.</p>,
            how: <ol><li>Enter Bill Amount</li><li>Select Tip Percentage</li><li>Enter Number of People</li></ol>,
            formula: <p>Tip = Bill * %; Total = Bill + Tip</p>
        },
        faq: []
    },
    'percentage-calculator': {
        title: 'Percentage Calculator',
        description: 'Calculate percentages, percentage increase/decrease, and more.',
        category: 'Math',
        categoryLink: '/category/math',
        formTitle: 'Enter values',
        resultTitle: 'Result',
        content: {
            what: <p>Solve common percentage problems like "What is X% of Y?" or "X is what % of Y?".</p>,
            how: <ol><li>Enter Value X</li><li>Enter Value Y</li><li>Select Operation</li></ol>,
            formula: <p>X% of Y = (X/100) * Y</p>
        },
        faq: []
    },
    'concrete-calculator': {
        title: 'Concrete Calculator',
        description: 'Estimate the number of concrete bags needed for a slab or footing.',
        category: 'Construction',
        categoryLink: '/category/construction',
        formTitle: 'Enter dimensions',
        resultTitle: 'Concrete Needed',
        content: {
            what: <p>Calculate the volume of concrete required for your project and estimate the number of 60lb or 80lb bags needed.</p>,
            how: <ol><li>Enter Length (ft)</li><li>Enter Width (ft)</li><li>Enter Depth (in)</li></ol>,
            formula: <p>Volume = L * W * (D/12) cubic feet</p>
        },
        faq: []
    },
    'random-number': {
        title: 'Random Number Generator',
        description: 'Generate a random number within a specified range.',
        category: 'Other',
        categoryLink: '/category/other',
        formTitle: 'Enter range',
        resultTitle: 'Random Number',
        content: {
            what: <p>Generate a random integer between a minimum and maximum value. Useful for games, lotteries, and decision making.</p>,
            how: <ol><li>Enter Minimum Value</li><li>Enter Maximum Value</li><li>Click Generate</li></ol>,
            formula: <p>Math.random() * (Max - Min) + Min</p>
        },
        faq: []
    },
    // Default fallback
    'default': {
        title: 'Calculator Tool',
        description: 'A useful financial calculator.',
        category: 'Tools',
        categoryLink: '/all-tools',
        formTitle: 'Enter details',
        resultTitle: 'Results',
        content: {
            what: <p>This is a placeholder for a generic calculator tool.</p>,
            how: <p>Enter the required values and click Calculate.</p>,
            formula: <p>Calculation logic varies by tool.</p>
        },
        faq: []
    }
};

export const CalculatorDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const config = toolConfigs[id || ''] || toolConfigs['default'];

    // Generic State
    const [salaryInput, setSalaryInput] = useState<number>(100000);
    const [selectedState, setSelectedState] = useState<string>('NY');

    // Converter State
    const [amount, setAmount] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState<string>('USD');
    const [toUnit, setToUnit] = useState<string>('EUR');

    // Generic Inputs
    const [input1, setInput1] = useState<number | string>('');
    const [input2, setInput2] = useState<number | string>('');
    const [input3, setInput3] = useState<number | string>('');

    // Results State
    const [results, setResults] = useState([
        { label: 'Result', value: '-' },
        { label: 'Total', value: '-', isTotal: true },
    ]);

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
                            {US_STATES.map(state => (
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
            <div className="container mx-auto px-4 py-8">
                <Breadcrumbs items={[
                    { label: 'Categories', href: '/all-tools' },
                    { label: config.category, href: config.categoryLink },
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
