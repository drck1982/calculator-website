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

    const [results, setResults] = useState<{ label: string; value: string | number; isTotal?: boolean }[]>([]);
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

            // --- Science Calculators ---
            else if (id === 'dna-replication') {
                const sequence = (input1 as string).toUpperCase().replace(/[^ATCG]/g, '');
                if (sequence.length > 0) {
                    const complement = sequence.split('').map(base => {
                        switch (base) {
                            case 'A': return 'T';
                            case 'T': return 'A';
                            case 'C': return 'G';
                            case 'G': return 'C';
                            default: return '';
                        }
                    }).join('');
                    setResults([
                        { label: 'Original Strand', value: sequence.slice(0, 30) + (sequence.length > 30 ? '...' : '') },
                        { label: 'Complementary Strand', value: complement.slice(0, 30) + (complement.length > 30 ? '...' : ''), isTotal: true },
                        { label: 'Length', value: `${sequence.length} bases` },
                    ]);
                } else {
                    setResults([{ label: 'Error', value: 'Enter valid DNA sequence (A, T, C, G)' }]);
                }
            } else if (id === 'allele-frequency') {
                const AA = Number(input1) || 0;
                const Aa = Number(input2) || 0;
                const aa = Number(input3) || 0;
                const total = AA + Aa + aa;
                if (total > 0) {
                    const pA = (2 * AA + Aa) / (2 * total);
                    const pa = (2 * aa + Aa) / (2 * total);
                    setResults([
                        { label: 'Total Population', value: `${total}` },
                        { label: 'Frequency of A (p)', value: pA.toFixed(4), isTotal: true },
                        { label: 'Frequency of a (q)', value: pa.toFixed(4) },
                        { label: 'p + q', value: (pA + pa).toFixed(4) },
                    ]);
                } else {
                    setResults([{ label: 'Error', value: 'Enter genotype counts' }]);
                }
            } else if (id === 'molarity-calculator') {
                const moles = Number(input1) || 1;
                const liters = Number(input2) || 1;
                const molarity = moles / liters;
                setResults([
                    { label: 'Moles of Solute', value: `${moles} mol` },
                    { label: 'Volume', value: `${liters} L` },
                    { label: 'Molarity', value: `${molarity.toFixed(4)} M`, isTotal: true },
                ]);
            } else if (id === 'ph-calculator') {
                const hConc = Number(input1) || 0.0000001;
                const pH = -Math.log10(hConc);
                let acidity = 'Neutral';
                if (pH < 7) acidity = 'Acidic';
                else if (pH > 7) acidity = 'Basic (Alkaline)';
                setResults([
                    { label: '[H+] Concentration', value: `${hConc.toExponential(2)} M` },
                    { label: 'pH Level', value: pH.toFixed(2), isTotal: true },
                    { label: 'Nature', value: acidity },
                ]);
            } else if (id === 'velocity-calculator') {
                const distance = Number(input1) || 100;
                const time = Number(input2) || 10;
                const velocity = distance / time;
                setResults([
                    { label: 'Distance', value: `${distance} m` },
                    { label: 'Time', value: `${time} s` },
                    { label: 'Velocity', value: `${velocity.toFixed(2)} m/s`, isTotal: true },
                ]);
            } else if (id === 'pace-calculator') {
                const distance = Number(input1) || 5;
                const timeMin = Number(input2) || 30;
                const pace = timeMin / distance;
                const speed = distance / (timeMin / 60);
                setResults([
                    { label: 'Distance', value: `${distance} km` },
                    { label: 'Time', value: `${timeMin} min` },
                    { label: 'Pace', value: `${pace.toFixed(2)} min/km`, isTotal: true },
                    { label: 'Speed', value: `${speed.toFixed(2)} km/h` },
                ]);
            } else if (id === 'wallpaper-calculator') {
                const height = Number(input1) || 8;
                const width = Number(input2) || 10;
                const wallArea = height * width;
                const rollCoverage = 30; // typical roll covers ~30 sq ft
                const rollsNeeded = Math.ceil((wallArea * 1.15) / rollCoverage); // 15% waste
                setResults([
                    { label: 'Wall Area', value: `${wallArea} sq ft` },
                    { label: 'Rolls Needed (with 15% waste)', value: `${rollsNeeded}`, isTotal: true },
                ]);
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
            } else if (id === 'weight-converter') {
                const fromFactor = WEIGHT_UNITS.find(u => u.name === fromUnit)?.factor || 1;
                const toFactor = WEIGHT_UNITS.find(u => u.name === toUnit)?.factor || 1;
                const valInKg = Number(amount) * fromFactor;
                const result = valInKg / toFactor;
                setResults([
                    { label: 'Input', value: `${amount} ${fromUnit}` },
                    { label: 'Result', value: `${result.toFixed(4)} ${toUnit}`, isTotal: true },
                ]);
            } else if (id === 'temperature-converter') {
                let result = 0;
                const temp = Number(amount);
                const from = TEMPERATURE_UNITS.find(u => u.name === fromUnit)?.type || 'C';
                const to = TEMPERATURE_UNITS.find(u => u.name === toUnit)?.type || 'F';
                
                // Convert to Celsius first
                let celsius = temp;
                if (from === 'F') celsius = (temp - 32) * 5/9;
                else if (from === 'K') celsius = temp - 273.15;
                
                // Convert from Celsius to target
                if (to === 'C') result = celsius;
                else if (to === 'F') result = (celsius * 9/5) + 32;
                else if (to === 'K') result = celsius + 273.15;
                
                setResults([
                    { label: 'Input', value: `${amount}° ${fromUnit}` },
                    { label: 'Result', value: `${result.toFixed(2)}° ${toUnit}`, isTotal: true },
                ]);
            } else if (id === 'speed-converter') {
                const fromFactor = SPEED_UNITS.find(u => u.name === fromUnit)?.factor || 1;
                const toFactor = SPEED_UNITS.find(u => u.name === toUnit)?.factor || 1;
                const valInMph = Number(amount) / fromFactor;
                const result = valInMph * toFactor;
                setResults([
                    { label: 'Input', value: `${amount} ${fromUnit}` },
                    { label: 'Result', value: `${result.toFixed(4)} ${toUnit}`, isTotal: true },
                ]);
            } else if (id === 'volume-converter') {
                const fromFactor = VOLUME_UNITS.find(u => u.name === fromUnit)?.factor || 1;
                const toFactor = VOLUME_UNITS.find(u => u.name === toUnit)?.factor || 1;
                const valInLiters = Number(amount) * fromFactor;
                const result = valInLiters / toFactor;
                setResults([
                    { label: 'Input', value: `${amount} ${fromUnit}` },
                    { label: 'Result', value: `${result.toFixed(4)} ${toUnit}`, isTotal: true },
                ]);
            } else if (id === 'area-converter') {
                const fromFactor = AREA_UNITS.find(u => u.name === fromUnit)?.factor || 1;
                const toFactor = AREA_UNITS.find(u => u.name === toUnit)?.factor || 1;
                const valInSqMeters = Number(amount) * fromFactor;
                const result = valInSqMeters / toFactor;
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
                const age = Number(input1) || 30;
                const heightCm = Number(input2) || 175;
                const weightKg = Number(input3) || 75;
                // Mifflin-St Jeor Equation for Male (default)
                const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
                const sedentary = bmr * 1.2;
                const moderate = bmr * 1.55;
                const active = bmr * 1.725;
                setResults([
                    { label: 'BMR (Basal)', value: `${Math.round(bmr)} kcal` },
                    { label: 'Sedentary', value: `${Math.round(sedentary)} kcal` },
                    { label: 'Moderate Activity', value: `${Math.round(moderate)} kcal`, isTotal: true },
                    { label: 'Very Active', value: `${Math.round(active)} kcal` },
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
                const homePrice = Number(input1) || 300000;
                const downPayment = Number(input2) || 60000;
                const rate = Number(input3) || 6.5;
                const years = 30;
                const principal = homePrice - downPayment;
                const monthlyRate = (rate / 100) / 12;
                const numPayments = years * 12;
                const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
                const totalPaid = monthlyPayment * numPayments;
                const totalInterest = totalPaid - principal;
                setResults([
                    { label: 'Loan Amount', value: `$${principal.toLocaleString()}` },
                    { label: 'Monthly Payment', value: `$${monthlyPayment.toFixed(2)}`, isTotal: true },
                    { label: 'Total Interest', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Total Cost', value: `$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                ]);
            } else if (id === 'auto-loan-calculator') {
                const carPrice = Number(input1) || 35000;
                const downPayment = Number(input2) || 5000;
                const rate = Number(input3) || 5.9;
                const months = 60;
                const principal = carPrice - downPayment;
                const monthlyRate = (rate / 100) / 12;
                const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
                const totalPaid = monthlyPayment * months;
                const totalInterest = totalPaid - principal;
                setResults([
                    { label: 'Loan Amount', value: `$${principal.toLocaleString()}` },
                    { label: 'Monthly Payment', value: `$${monthlyPayment.toFixed(2)}`, isTotal: true },
                    { label: 'Total Interest', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Total Cost', value: `$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                ]);
            } else if (id === 'compound-interest-calculator') {
                const principal = Number(input1) || 5000;
                const monthlyContrib = Number(input2) || 500;
                const rate = Number(input3) || 7;
                const years = 10;
                const monthlyRate = (rate / 100) / 12;
                const months = years * 12;
                // Future value of initial principal
                const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);
                // Future value of monthly contributions (annuity)
                const fvContribs = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
                const totalFV = fvPrincipal + fvContribs;
                const totalContributed = principal + (monthlyContrib * months);
                const totalInterest = totalFV - totalContributed;
                setResults([
                    { label: 'Initial Investment', value: `$${principal.toLocaleString()}` },
                    { label: 'Total Contributions', value: `$${totalContributed.toLocaleString()}` },
                    { label: 'Total Interest Earned', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Future Value', value: `$${totalFV.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
                ]);
            } else if (id === 'bmi-calculator') {
                const heightCm = Number(input1) || 175;
                const weightKg = Number(input2) || 70;
                const heightM = heightCm / 100;
                const bmi = weightKg / (heightM * heightM);
                let category = 'Underweight';
                if (bmi >= 18.5 && bmi < 25) category = 'Normal Weight';
                else if (bmi >= 25 && bmi < 30) category = 'Overweight';
                else if (bmi >= 30) category = 'Obese';
                setResults([
                    { label: 'Height', value: `${heightCm} cm` },
                    { label: 'Weight', value: `${weightKg} kg` },
                    { label: 'BMI Score', value: bmi.toFixed(1), isTotal: true },
                    { label: 'Category', value: category },
                ]);
            } else if (id === 'inflation-calculator') {
                const amount = Number(input1) || 100;
                const startYear = Number(input2) || 2000;
                const currentYear = new Date().getFullYear();
                const years = currentYear - startYear;
                // Average US inflation ~3% per year
                const avgInflation = 0.03;
                const adjustedValue = amount * Math.pow(1 + avgInflation, years);
                const cumulativeInflation = ((adjustedValue - amount) / amount) * 100;
                setResults([
                    { label: 'Original Value', value: `$${amount.toFixed(2)}` },
                    { label: 'Years', value: `${years}` },
                    { label: 'Adjusted Value', value: `$${adjustedValue.toFixed(2)}`, isTotal: true },
                    { label: 'Cumulative Inflation', value: `${cumulativeInflation.toFixed(1)}%` },
                ]);
            }
            // --- Additional Finance Calculators ---
            else if (id === 'bonus-tax-calculator') {
                const bonus = Number(input1) || 5000;
                const stateCode = (input2 as string) || 'NY';
                const stateData = US_STATES.find(s => s.code === stateCode) || US_STATES.find(s => s.code === 'NY')!;
                const fedRate = 0.22; // Federal supplemental wage rate
                const fedTax = bonus * fedRate;
                const stateTaxRate = stateData.incomeTaxRate || 0;
                const stTax = bonus * stateTaxRate;
                const socialSecurity = Math.min(bonus, 176100) * 0.062; // 2025 SS wage base
                const medicare = bonus * 0.0145;
                const fica = socialSecurity + medicare;
                const totalTax = fedTax + stTax + fica;
                const netBonus = bonus - totalTax;
                const effectiveRate = (totalTax / bonus) * 100;
                setResults([
                    { label: 'Gross Bonus', value: `$${bonus.toLocaleString()}` },
                    { label: 'Federal Tax (22%)', value: `$${fedTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                    { label: `State Tax (${stateData.code} ${(stateTaxRate * 100).toFixed(2)}%)`, value: stateTaxRate === 0 ? '$0.00 (No State Tax)' : `$${stTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                    { label: 'Social Security (6.2%)', value: `$${socialSecurity.toFixed(2)}` },
                    { label: 'Medicare (1.45%)', value: `$${medicare.toFixed(2)}` },
                    { label: 'Total Taxes', value: `$${totalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}` },
                    { label: 'Effective Tax Rate', value: `${effectiveRate.toFixed(1)}%` },
                    { label: 'Net Bonus (Take Home)', value: `$${netBonus.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, isTotal: true },
                ]);
            } else if (id === 'federal-tax-calculator') {
                const income = Number(input1) || 75000;
                // 2025 Federal Income Tax Brackets (Single Filer)
                let tax = 0;
                let bracket = '10%';
                if (income <= 11925) {
                    tax = income * 0.10;
                    bracket = '10%';
                } else if (income <= 48475) {
                    tax = 1192.50 + (income - 11925) * 0.12;
                    bracket = '12%';
                } else if (income <= 103350) {
                    tax = 5570.50 + (income - 48475) * 0.22;
                    bracket = '22%';
                } else if (income <= 197300) {
                    tax = 17633.50 + (income - 103350) * 0.24;
                    bracket = '24%';
                } else if (income <= 250500) {
                    tax = 40180.50 + (income - 197300) * 0.32;
                    bracket = '32%';
                } else if (income <= 626350) {
                    tax = 57204.50 + (income - 250500) * 0.35;
                    bracket = '35%';
                } else {
                    tax = 188752 + (income - 626350) * 0.37;
                    bracket = '37%';
                }
                const effectiveRate = (tax / income) * 100;
                setResults([
                    { label: 'Taxable Income', value: `$${income.toLocaleString()}` },
                    { label: 'Tax Bracket (2025)', value: bracket },
                    { label: 'Federal Tax', value: `$${tax.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
                    { label: 'Effective Tax Rate', value: `${effectiveRate.toFixed(2)}%` },
                    { label: 'After-Tax Income', value: `$${(income - tax).toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                ]);
            } else if (id === 'rent-vs-buy-calculator') {
                const rent = Number(input1) || 2000;
                const homePrice = Number(input2) || 400000;
                const years = Number(input3) || 5;
                const downPayment = homePrice * 0.2;
                const loanAmount = homePrice - downPayment;
                const monthlyRate = 0.065 / 12;
                const numPayments = 30 * 12;
                const mortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
                const propertyTax = homePrice * 0.012 / 12;
                const insurance = 150;
                const maintenance = homePrice * 0.01 / 12;
                const totalMonthlyBuy = mortgagePayment + propertyTax + insurance + maintenance;
                const totalRent = rent * 12 * years;
                const totalBuy = totalMonthlyBuy * 12 * years + downPayment;
                const savings = totalRent - totalBuy;
                setResults([
                    { label: 'Monthly Rent', value: `$${rent.toLocaleString()}` },
                    { label: 'Monthly Mortgage + Costs', value: `$${totalMonthlyBuy.toFixed(0)}` },
                    { label: `Total Rent (${years} yrs)`, value: `$${totalRent.toLocaleString()}` },
                    { label: `Total Buy Cost (${years} yrs)`, value: `$${totalBuy.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Recommendation', value: savings > 0 ? 'Buying may be better' : 'Renting may be better', isTotal: true },
                ]);
            } else if (id === 'amortization-calculator') {
                const principal = Number(input1) || 200000;
                const rate = Number(input2) || 6.5;
                const years = Number(input3) || 30;
                const monthlyRate = (rate / 100) / 12;
                const numPayments = years * 12;
                const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
                const totalPaid = monthlyPayment * numPayments;
                const totalInterest = totalPaid - principal;
                // First year breakdown
                let balance = principal;
                let firstYearPrincipal = 0;
                let firstYearInterest = 0;
                for (let i = 0; i < 12; i++) {
                    const interestPayment = balance * monthlyRate;
                    const principalPayment = monthlyPayment - interestPayment;
                    firstYearInterest += interestPayment;
                    firstYearPrincipal += principalPayment;
                    balance -= principalPayment;
                }
                setResults([
                    { label: 'Monthly Payment', value: `$${monthlyPayment.toFixed(2)}`, isTotal: true },
                    { label: 'Total Interest', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Total Cost', value: `$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'First Year Interest', value: `$${firstYearInterest.toFixed(0)}` },
                    { label: 'First Year Principal', value: `$${firstYearPrincipal.toFixed(0)}` },
                ]);
            } else if (id === '401k-calculator') {
                const salary = Number(input1) || 75000;
                const contribution = Number(input2) || 10;
                const employerMatch = Number(input3) || 50; // 50% match
                const years = 30;
                const rate = 0.07;
                const annualContrib = salary * (contribution / 100);
                const matchLimit = salary * 0.06; // Typical 6% match limit
                const employerContrib = Math.min(annualContrib, matchLimit) * (employerMatch / 100);
                const totalAnnual = annualContrib + employerContrib;
                // Future value with annual contributions
                const fv = totalAnnual * ((Math.pow(1 + rate, years) - 1) / rate) * (1 + rate);
                const totalContributed = (annualContrib + employerContrib) * years;
                const growth = fv - totalContributed;
                setResults([
                    { label: 'Your Annual Contribution', value: `$${annualContrib.toLocaleString()}` },
                    { label: 'Employer Match', value: `$${employerContrib.toLocaleString()}` },
                    { label: `Total Contributed (${years} yrs)`, value: `$${totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Investment Growth', value: `$${growth.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Projected Balance', value: `$${fv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
                ]);
            }
            // --- Health Calculators ---
            else if (id === 'tdee-calculator') {
                const age = Number(input1) || 30;
                const heightCm = Number(input2) || 175;
                const weightKg = Number(input3) || 75;
                // Mifflin-St Jeor for male
                const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
                const sedentary = bmr * 1.2;
                const light = bmr * 1.375;
                const moderate = bmr * 1.55;
                const active = bmr * 1.725;
                const veryActive = bmr * 1.9;
                setResults([
                    { label: 'BMR', value: `${Math.round(bmr)} kcal` },
                    { label: 'Sedentary (office job)', value: `${Math.round(sedentary)} kcal` },
                    { label: 'Light Exercise (1-3 days)', value: `${Math.round(light)} kcal` },
                    { label: 'Moderate (3-5 days)', value: `${Math.round(moderate)} kcal`, isTotal: true },
                    { label: 'Active (6-7 days)', value: `${Math.round(active)} kcal` },
                    { label: 'Very Active (athlete)', value: `${Math.round(veryActive)} kcal` },
                ]);
            } else if (id === 'macro-calculator') {
                const calories = Number(input1) || 2000;
                const goal = (input2 as string) || 'maintain';
                // Default balanced split
                let proteinPct = 0.30, carbPct = 0.40, fatPct = 0.30;
                if (goal === 'lose') { proteinPct = 0.40; carbPct = 0.30; fatPct = 0.30; }
                else if (goal === 'gain') { proteinPct = 0.25; carbPct = 0.50; fatPct = 0.25; }
                const proteinCal = calories * proteinPct;
                const carbCal = calories * carbPct;
                const fatCal = calories * fatPct;
                setResults([
                    { label: 'Daily Calories', value: `${calories} kcal` },
                    { label: 'Protein', value: `${Math.round(proteinCal / 4)}g (${Math.round(proteinPct * 100)}%)`, isTotal: true },
                    { label: 'Carbohydrates', value: `${Math.round(carbCal / 4)}g (${Math.round(carbPct * 100)}%)` },
                    { label: 'Fat', value: `${Math.round(fatCal / 9)}g (${Math.round(fatPct * 100)}%)` },
                ]);
            } else if (id === 'one-rep-max-calculator') {
                const weight = Number(input1) || 100;
                const reps = Number(input2) || 8;
                // Epley formula
                const oneRM = weight * (1 + reps / 30);
                setResults([
                    { label: 'Weight Lifted', value: `${weight} lbs` },
                    { label: 'Reps Performed', value: `${reps}` },
                    { label: 'Estimated 1RM', value: `${Math.round(oneRM)} lbs`, isTotal: true },
                    { label: '90% (Heavy Single)', value: `${Math.round(oneRM * 0.9)} lbs` },
                    { label: '80% (Working Weight)', value: `${Math.round(oneRM * 0.8)} lbs` },
                    { label: '70% (Volume Training)', value: `${Math.round(oneRM * 0.7)} lbs` },
                ]);
            } else if (id === 'bac-calculator') {
                const weight = Number(input1) || 160; // lbs
                const drinks = Number(input2) || 3;
                const hours = Number(input3) || 2;
                // Widmark formula (male r=0.73)
                const alcoholGrams = drinks * 14;
                const bodyWater = weight * 453.592 * 0.73;
                const bac = (alcoholGrams / bodyWater) * 100 - (0.015 * hours);
                const finalBAC = Math.max(0, bac);
                let status = 'Sober';
                if (finalBAC > 0.08) status = 'Legally Impaired';
                else if (finalBAC > 0.05) status = 'Buzzed';
                else if (finalBAC > 0) status = 'Mild Effect';
                setResults([
                    { label: 'Drinks Consumed', value: `${drinks}` },
                    { label: 'Time Drinking', value: `${hours} hours` },
                    { label: 'Estimated BAC', value: `${finalBAC.toFixed(3)}%`, isTotal: true },
                    { label: 'Status', value: status },
                    { label: 'Legal Limit (US)', value: '0.08%' },
                ]);
            } else if (id === 'smoking-cost-calculator') {
                const packsPerDay = Number(input1) || 1;
                const pricePerPack = Number(input2) || 8;
                const years = Number(input3) || 10;
                const daily = packsPerDay * pricePerPack;
                const weekly = daily * 7;
                const monthly = daily * 30;
                const yearly = daily * 365;
                const total = yearly * years;
                // Investment alternative at 7%
                const invested = yearly * ((Math.pow(1.07, years) - 1) / 0.07);
                setResults([
                    { label: 'Daily Cost', value: `$${daily.toFixed(2)}` },
                    { label: 'Weekly Cost', value: `$${weekly.toFixed(2)}` },
                    { label: 'Monthly Cost', value: `$${monthly.toFixed(2)}` },
                    { label: 'Yearly Cost', value: `$${yearly.toLocaleString()}` },
                    { label: `${years}-Year Total`, value: `$${total.toLocaleString()}`, isTotal: true },
                    { label: 'If Invested Instead', value: `$${invested.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                ]);
            } else if (id?.includes('salary')) {
                const stateData = US_STATES.find(s => s.code === selectedState) || US_STATES[0];
                const salary = salaryInput;
                
                // 2025 Federal Income Tax (simplified progressive brackets for single filer)
                let fedTax = 0;
                if (salary <= 11925) fedTax = salary * 0.10;
                else if (salary <= 48475) fedTax = 1192.50 + (salary - 11925) * 0.12;
                else if (salary <= 103350) fedTax = 5570.50 + (salary - 48475) * 0.22;
                else if (salary <= 197300) fedTax = 17633.50 + (salary - 103350) * 0.24;
                else if (salary <= 250500) fedTax = 40180.50 + (salary - 197300) * 0.32;
                else if (salary <= 626350) fedTax = 57204.50 + (salary - 250500) * 0.35;
                else fedTax = 188752 + (salary - 626350) * 0.37;
                
                // FICA (2025): SS 6.2% up to $176,100 + Medicare 1.45%
                const socialSecurity = Math.min(salary, 176100) * 0.062;
                const medicare = salary * 0.0145;
                const ficaTax = socialSecurity + medicare;
                
                // State Income Tax (2025 rates)
                const stateTaxRate = stateData.incomeTaxRate || 0;
                const stateTax = salary * stateTaxRate;
                
                const totalTax = fedTax + ficaTax + stateTax;
                const netPay = salary - totalTax;
                const effectiveRate = (totalTax / salary) * 100;

                setResults([
                    { label: 'Gross Salary', value: `$${salary.toLocaleString()}` },
                    { label: 'Federal Tax', value: `$${fedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Social Security (6.2%)', value: `$${socialSecurity.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Medicare (1.45%)', value: `$${medicare.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: `State Tax (${stateData.code} ${(stateTaxRate * 100).toFixed(2)}%)`, value: stateTaxRate === 0 ? '$0 (No State Tax)' : `$${stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Total Taxes', value: `$${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    { label: 'Effective Tax Rate', value: `${effectiveRate.toFixed(1)}%` },
                    { label: 'Net Pay (Take Home)', value: `$${netPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
                ]);
            } else {
                setResults([
                    { label: 'Result', value: '100' },
                    { label: 'Total', value: '100', isTotal: true },
                ]);
            }
            setIsCalculating(false);

            // Auto-scroll to results on mobile devices
            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                setTimeout(() => {
                    const resultsPanel = document.getElementById('results-panel');
                    if (resultsPanel) {
                        resultsPanel.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });
                    }
                }, 100);
            }
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
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Age</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="30" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="175" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="75" /></div>
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
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="300000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="60000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="6.5" /></div>
                </div>
            );
        } else if (id === 'auto-loan-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Price ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="35000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="5000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="5.9" /></div>
                </div>
            );
        } else if (id === 'compound-interest-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Initial Investment ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Contribution ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="500" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="7" /></div>
                </div>
            );
        } else if (id === 'bmi-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="175" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="70" /></div>
                </div>
            );
        } else if (id === 'inflation-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="2000" /></div>
                </div>
            );
        }
        // --- Additional Finance Calculators ---
        else if (id === 'bonus-tax-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Bonus Amount ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5000" /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <select 
                            className="block w-full p-2 border border-gray-300 rounded-md" 
                            value={(input2 as string) || 'NY'} 
                            onChange={(e) => setInput2(e.target.value)}
                        >
                            {US_STATES.map((state) => (
                                <option key={state.code} value={state.code}>
                                    {state.name} {state.incomeTaxRate === 0 ? '(No State Tax)' : `(${(state.incomeTaxRate * 100).toFixed(2)}%)`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'federal-tax-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Taxable Income ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="75000" /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)}>
                            <option value="single">Single</option>
                            <option value="married">Married Filing Jointly</option>
                            <option value="head">Head of Household</option>
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'rent-vs-buy-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="2000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Home Price ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="400000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Years to Compare</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="5" /></div>
                </div>
            );
        } else if (id === 'amortization-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="200000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="6.5" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="30" /></div>
                </div>
            );
        } else if (id === '401k-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="75000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Contribution (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="10" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Employer Match (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="50" /></div>
                </div>
            );
        }
        // --- Health Calculators ---
        else if (id === 'tdee-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Age</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="30" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="175" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="75" /></div>
                </div>
            );
        } else if (id === 'macro-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Daily Calories</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="2000" /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)}>
                            <option value="maintain">Maintain Weight</option>
                            <option value="lose">Lose Weight</option>
                            <option value="gain">Build Muscle</option>
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'one-rep-max-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight Lifted (lbs)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Reps Performed</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="8" /></div>
                </div>
            );
        } else if (id === 'bac-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Body Weight (lbs)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="160" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Standard Drinks</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="3" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Hours Drinking</label><input type="number" step="0.5" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="2" /></div>
                </div>
            );
        } else if (id === 'smoking-cost-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Packs Per Day</label><input type="number" step="0.5" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="1" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Price Per Pack ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="8" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Years Smoking</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="10" /></div>
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
                            {US_STATES.map((state) => (
                                <option key={state.code} value={state.code}>
                                    {state.name} {state.incomeTaxRate === 0 ? '(No State Tax)' : `(${(state.incomeTaxRate * 100).toFixed(2)}%)`}
                                </option>
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
                description={`${config.description} Use our free ${config.title.toLowerCase()} to get instant, accurate results. No signup required.`}
                keywords={`${config.title.toLowerCase()}, free calculator, online tool, ${config.category.toLowerCase()}, calculate ${config.title.toLowerCase().replace(' calculator', '')}`}
                canonicalUrl={`/tools/${id}`}
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


                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Form - Always first (order-1) */}
                    <div className="order-1 lg:col-span-2">
                        <CalculatorForm title={config.formTitle} onCalculate={handleCalculate}>
                            {renderForm()}
                        </CalculatorForm>
                    </div>

                    {/* Results - Second on mobile, third on desktop (order-2 lg:order-3) */}
                    <div id="results-panel" className="order-2 lg:order-3 lg:col-span-1 lg:sticky lg:top-4 lg:self-start">
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
                                        <Calendar className="w-4 h-4 mr-2 text-blue-400" /> Date Calculator
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <AdSlot id="calc-sidebar" className="mt-8" />
                    </div>

                    {/* Content sections - Third on mobile, second on desktop (order-3 lg:order-2) */}
                    <div className="order-3 lg:order-2 lg:col-span-2 mt-8 lg:mt-0">
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

                <RelatedCategories currentCategory={config.category} />
            </div>
        </div>
    );
};
