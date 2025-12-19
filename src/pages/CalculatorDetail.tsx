import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CalculatorForm } from '../components/calculator/CalculatorForm';
import { ResultPanel } from '../components/calculator/ResultPanel';
import { ContentSection } from '../components/calculator/ContentSection';
import { FAQSection } from '../components/calculator/FAQSection';
import { AdSlot } from '../components/common/AdSlot';
import { RelatedCategories } from '../components/category/RelatedCategories';
import { toolConfigs } from '../data/tools';
import { toolTranslationKeys } from '../data/translationKeys';
import { US_STATES } from '../data/us_states';
import { SEO } from '../components/common/SEO';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import {
    Calculator as CalcIcon,
    Baby,
    Calendar,
    Printer,
    Check,
    Info,
    Lightbulb,
    BookOpen
} from 'lucide-react';

import * as finance from '../utils/calculators/finance';
import * as math from '../utils/calculators/math';
import * as geometry from '../utils/calculators/geometry';
import * as health from '../utils/calculators/health';
import * as science from '../utils/calculators/science';
import * as loan from '../utils/calculators/loan';
import * as everyday from '../utils/calculators/everyday';
import * as converters from '../utils/calculators/converters';
import {
    CURRENCIES,
    LENGTH_UNITS,
    WEIGHT_UNITS,
    TEMPERATURE_UNITS,
    SPEED_UNITS,
    VOLUME_UNITS,
    AREA_UNITS
} from '../utils/calculators/units';

export const CalculatorDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();
    const rawConfig = toolConfigs[id || ''] || toolConfigs['default'];

    const translationKey = toolTranslationKeys[id || ''];
    const translatedName = translationKey ? t(translationKey.nameKey) : rawConfig.title;
    const translatedDesc = translationKey ? t(translationKey.descKey) : rawConfig.description;

    const config = {
        ...rawConfig,
        title: (translatedName && translatedName !== translationKey?.nameKey) ? translatedName : rawConfig.title,
        description: (translatedDesc && translatedDesc !== translationKey?.descKey) ? translatedDesc : rawConfig.description
    };

    // Pilot: Paycheck Calculator Specific Translations
    if (id === 'paycheck-calculator') {
        config.formTitle = t('calc.paycheck.formTitle');
        config.resultTitle = t('calc.paycheck.resultTitle');
        config.content = {
            what: t('calc.paycheck.content.what'),
            how: t('calc.paycheck.content.how'),
            formula: t('calc.paycheck.content.formula')
        };
    }

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
    const [genderInput, setGenderInput] = useState<string>('male');

    // Reset inputs when tool changes
    useEffect(() => {
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

    // Update results when tool or language changes
    useEffect(() => {
        setResults([
            { label: t('calc.result'), value: '-' },
            { label: t('calc.total'), value: '-', isTotal: true },
        ]);
    }, [id, t]);

    const handleCalculate = () => {
        setIsCalculating(true);

        setTimeout(() => {
            let newResults: any[] = [];

            if (id === 'simple-interest-calculator') {
                newResults = finance.calculateSimpleInterest(Number(input1), Number(input2), Number(input3));
            } else if (id === 'apy-calculator') {
                newResults = finance.calculateApy(Number(input1), Number(input2));
            } else if (id === 'roi-calculator') {
                newResults = finance.calculateRoi(Number(input1), Number(input2));
            } else if (id === 'break-even-calculator') {
                newResults = finance.calculateBreakEven(Number(input1), Number(input2), Number(input3));
            } else if (id === 'margin-calculator') {
                newResults = finance.calculateMargin(Number(input1), Number(input2));
            } else if (id === 'vat-calculator') {
                newResults = finance.calculateVat(Number(input1), Number(input2));
            } else if (id === 'down-payment-calculator') {
                newResults = finance.calculateDownPayment(Number(input1), Number(input2));
            } else if (id === 'home-affordability') {
                newResults = finance.calculateHomeAffordability(Number(input1), Number(input2), Number(input3), Number(salaryInput));
            } else if (id === 'net-worth-calculator') {
                newResults = finance.calculateNetWorth(Number(input1), Number(input2));
            } else if (id === 'emergency-fund-calculator') {
                newResults = finance.calculateEmergencyFund(Number(input1), Number(input2), Number(input3));
            } else if (id === 'savings-goal-calculator') {
                newResults = finance.calculateSavingsGoal(Number(input1), Number(input2), Number(input3), Number(salaryInput));
            } else if (id === 'paycheck-calculator') {
                const stateData = US_STATES.find((s: any) => s.code === selectedState) || US_STATES[0];
                newResults = finance.calculatePaycheck(Number(input1), stateData, t);
            } else if (id === 'bonus-tax-calculator') {
                const stateData = US_STATES.find((s: any) => s.code === input2) || US_STATES[0];
                newResults = finance.calculateBonusTax(Number(input1), stateData.incomeTaxRate);
            } else if (id === 'federal-tax-calculator') {
                newResults = finance.calculateFederalTax(Number(input1), input2 as string);
            } else if (id === 'rent-vs-buy-calculator') {
                newResults = finance.calculateRentVsBuy(Number(input1), Number(input2), Number(input3));
            } else if (id === 'compound-interest-calculator') {
                newResults = finance.calculateCompoundInterest(Number(input1), Number(input2), Number(input3), 10); // Default 10 yrs
            } else if (id === 'inflation-calculator') {
                newResults = finance.calculateInflation(Number(input1), Number(input2));
            } else if (id === 'hourly-to-salary') {
                newResults = finance.calculateHourlyToSalary(Number(input1), Number(input2));
            } else if (id === 'length-converter') {
                newResults = converters.convertLength(Number(amount), fromUnit, toUnit);
            } else if (id === 'weight-converter') {
                newResults = converters.convertWeight(Number(amount), fromUnit, toUnit);
            } else if (id === 'temperature-converter') {
                newResults = converters.convertTemperature(Number(amount), fromUnit, toUnit);
            } else if (id === 'speed-converter') {
                newResults = converters.convertSpeed(Number(amount), fromUnit, toUnit);
            } else if (id === 'volume-converter') {
                newResults = converters.convertVolume(Number(amount), fromUnit, toUnit);
            } else if (id === 'area-converter') {
                newResults = converters.convertArea(Number(amount), fromUnit, toUnit);
            } else if (id === 'currency-converter') {
                newResults = converters.convertCurrency(Number(amount), fromUnit, toUnit);
            } else if (id === 'age-calculator') {
                newResults = everyday.calculateAge(input1 as string);
            } else if (id === 'date-calculator') {
                newResults = everyday.calculateDateDiff(input1 as string, input2 as string);
            } else if (id === 'pregnancy-calculator') {
                newResults = everyday.calculatePregnancy(input1 as string);
            } else if (id === 'sleep-calculator') {
                newResults = everyday.calculateSleep(input1 as string);
            } else if (id === 'word-counter') {
                newResults = everyday.calculateWordCount(input1 as string);
            } else if (id === 'time-zone-converter') {
                newResults = [{ label: 'Note', value: 'Conversion complete' }, { label: 'Result', value: `${input1} to ${input2}`, isTotal: true }];
            } else if (id === 'water-intake-calculator') {
                newResults = health.calculateWaterIntake(Number(input1), input2 as string);
            } else if (id === 'tdee-calculator') {
                newResults = health.calculateTdee(Number(input1), 'moderate'); // Simplified for now
            } else if (id === 'macro-calculator') {
                newResults = health.calculateMacros(Number(input1), input2 as string);
            } else if (id === 'one-rep-max-calculator') {
                newResults = health.calculateOneRepMax(Number(input1), Number(input2));
            } else if (id === 'bac-calculator') {
                newResults = health.calculateBac(Number(input2), Number(input1), Number(input3), genderInput);
            } else if (id === 'smoking-cost-calculator') {
                newResults = health.calculateSmokingCost(Number(input1), Number(input2), Number(input3));
            } else if (id === 'body-fat-calculator') {
                newResults = health.calculateBodyFat(Number(input1), Number(input2), Number(input3), Number(salaryInput), selectedState);
            } else if (id === 'ideal-weight-calculator') {
                newResults = health.calculateIdealWeight(Number(input1), input2 as string);
            } else if (id === 'bmi-calculator') {
                newResults = health.calculateBmi(Number(input1), Number(input2));
            } else if (id === 'dna-replication') {
                newResults = science.calculateDnaReplication(input1 as string);
            } else if (id === 'allele-frequency') {
                newResults = science.calculateAlleleFrequency(Number(input1), Number(input2), Number(input3));
            } else if (id === 'molarity-calculator') {
                newResults = science.calculateMolarity(Number(input1), Number(input2));
            } else if (id === 'ph-calculator') {
                newResults = science.calculatePh(Number(input1), input2 as string);
            } else if (id === 'velocity-calculator') {
                newResults = science.calculateVelocity(Number(input1), Number(input2));
            } else if (id === 'pace-calculator') {
                newResults = science.calculatePace(Number(input1), Number(input2));
            } else if (id === 'loan-calculator' || id === 'debt-payoff-calculator' || id === 'credit-card-payoff') {
                newResults = loan.calculateDebtPayoff(Number(input1), Number(input2), Number(input3));
            } else if (id === 'mortgage-calculator') {
                newResults = loan.calculateMortgage(Number(input1), Number(input2), Number(input3));
            } else if (id === 'student-loan-calculator') {
                newResults = loan.calculateStudentLoan(Number(input1), Number(input2), Number(input3));
            } else if (id === 'lease-vs-buy-car') {
                newResults = loan.calculateLeaseVsBuy(Number(input1), Number(input2), Number(input3));
            } else if (id === 'refinance-calculator') {
                newResults = loan.calculateRefinance(Number(input1), Number(input2), Number(input3), Number(salaryInput));
            } else if (id === 'amortization-calculator') {
                newResults = loan.calculateAmortization(Number(input1), Number(input2), Number(input3));
            } else if (id === '401k-calculator') {
                newResults = loan.calculate401k(Number(input1), Number(input2), Number(input3));
            } else if (id === 'gpa-calculator') {
                newResults = math.calculateGpa(Number(input1), Number(input2));
            } else if (id === 'tip-calculator') {
                newResults = math.calculateTip(Number(input1), Number(input2), Number(input3));
            } else if (id === 'unit-price-calculator') {
                newResults = math.calculateUnitPrice(Number(input1), Number(input2), Number(input3), Number(salaryInput));
            } else if (id === 'grade-calculator') {
                newResults = math.calculateGrade(Number(input1), Number(input2));
            } else if (id === 'binary-calculator' || id === 'hex-calculator') {
                newResults = math.convertBase(Number(input1));
            } else if (id === 'prime-calculator') {
                newResults = math.calculatePrime(Number(input1));
            } else if (id === 'gcf-lcm-calculator') {
                newResults = math.calculateGcfLcm(Number(input1), Number(input2));
            } else if (id === 'slope-calculator') {
                newResults = math.calculateSlope(input1 as string, input2 as string);
            } else if (id === 'percentage-calculator') {
                newResults = math.calculatePercentage(Number(input1), Number(input2));
            } else if (id === 'standard-deviation') {
                newResults = math.calculateStandardDeviation(input1 as string);
            } else if (id === 'circle-calculator') {
                newResults = geometry.calculateCircle(Number(input1));
            } else if (id === 'triangle-calculator') {
                newResults = geometry.calculateTriangle(Number(input1), Number(input2));
            } else if (id === 'pythagorean-calculator') {
                newResults = geometry.calculatePythagorean(Number(input1), Number(input2));
            } else if (id === 'tile-calculator') {
                newResults = geometry.calculateTile(Number(input1), Number(input2));
            } else if (id === 'paint-calculator') {
                newResults = geometry.calculatePaint(Number(input1));
            } else if (id === 'concrete-calculator') {
                newResults = geometry.calculateConcrete(Number(input1), Number(input2), Number(input3));
            } else if (id === 'wallpaper-calculator') {
                newResults = geometry.calculateWallpaper(Number(input1), Number(input2));
            } else if (id === 'gas-mileage-calculator') {
                newResults = everyday.calculateGasMileage(Number(input1), Number(input2));
            } else if (id === 'travel-time-calculator') {
                newResults = everyday.calculateTravelTime(Number(input1), Number(input2));
            } else if (id === 'qr-code-generator') {
                newResults = [
                    { label: 'Content', value: (input1 as string).substring(0, 50) + ((input1 as string).length > 50 ? '...' : '') },
                    { label: 'Status', value: 'QR Code Generated!', isTotal: true },
                    { label: 'Note', value: 'Right-click to save' },
                ];
            }

            setResults(newResults);
            setIsCalculating(false);

            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                setTimeout(() => {
                    const resultsPanel = document.getElementById('results-panel');
                    if (resultsPanel) {
                        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Body Weight (lbs)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="160" /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={genderInput} onChange={(e) => setGenderInput(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
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
        }
        // NEW CALCULATOR FORMS
        else if (id === 'paycheck-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('calc.paycheck.grossPay')}</label>
                        <input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('calc.paycheck.payFrequency')}</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)}>
                            <option value="weekly">{t('calc.paycheck.weekly')}</option>
                            <option value="biweekly">{t('calc.paycheck.biweekly')}</option>
                            <option value="semimonthly">{t('calc.paycheck.semimonthly')}</option>
                            <option value="monthly">{t('calc.paycheck.monthly')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('calc.paycheck.state')}</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input3 as string} onChange={(e) => setInput3(e.target.value)}>
                            {US_STATES.map((state) => (
                                <option key={state.code} value={state.code}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'student-loan-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Loan Balance ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="30000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="5.5" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="10" /></div>
                </div>
            );
        } else if (id === 'debt-payoff-calculator' || id === 'credit-card-payoff') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Balance ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">APR (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="20" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Payment ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="200" /></div>
                </div>
            );
        } else if (id === 'body-fat-calculator') {
            return (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select className="block w-full p-2 border border-gray-300 rounded-md" value={genderInput} onChange={(e) => setGenderInput(e.target.value)}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Height (inches)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="70" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Waist (inches)</label><input type="number" step="0.5" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="34" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Neck (inches)</label><input type="number" step="0.5" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="15" /></div>
                        {genderInput === 'female' && (
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Hip (inches)</label><input type="number" step="0.5" className="block w-full p-2 border border-gray-300 rounded-md" value={salaryInput} onChange={(e) => setSalaryInput(Number(e.target.value))} placeholder="38" /></div>
                        )}
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs) - Optional</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" defaultValue={180} placeholder="180" /></div>
                </div>
            );
        } else if (id === 'ideal-weight-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Height (inches)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="70" /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'password-generator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Password Length</label><input type="number" min="8" max="64" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="16" /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Include Symbols</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)}>
                            <option value="yes">Yes (!@#$%...)</option>
                            <option value="no">No (letters & numbers only)</option>
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'word-counter') {
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter or Paste Text</label>
                    <textarea
                        className="block w-full p-3 border border-gray-300 rounded-md h-40 resize-none"
                        value={input1 as string}
                        onChange={(e) => setInput1(e.target.value)}
                        placeholder="Paste your text here to count words, characters, and more..."
                    />
                </div>
            );
        } else if (id === 'qr-code-generator') {
            return (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL or Text to Encode</label>
                    <input
                        type="text"
                        className="block w-full p-2 border border-gray-300 rounded-md"
                        value={input1 as string}
                        onChange={(e) => setInput1(e.target.value)}
                        placeholder="https://example.com or any text"
                    />
                </div>
            );
        }
        // === NEW HIGH-TRAFFIC CALCULATOR FORMS ===
        else if (id === 'home-affordability') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Annual Income ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="80000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Debts ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="500" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Down Payment ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="60000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={salaryInput} onChange={(e) => setSalaryInput(Number(e.target.value))} placeholder="6.5" /></div>
                </div>
            );
        } else if (id === 'net-worth-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Assets ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="100000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Liabilities ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="50000" /></div>
                </div>
            );
        } else if (id === 'emergency-fund-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Monthly Expenses ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="4000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Months of Coverage</label><input type="number" min="3" max="12" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="6" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Savings ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="5000" /></div>
                </div>
            );
        } else if (id === 'savings-goal-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Goal Amount ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="10000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Savings ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="1000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Months to Goal</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="12" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={salaryInput} onChange={(e) => setSalaryInput(Number(e.target.value))} placeholder="4" /></div>
                </div>
            );
        } else if (id === 'sleep-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Wake Up Time</label><input type="time" className="block w-full p-2 border border-gray-300 rounded-md" value={input1 as string} onChange={(e) => setInput1(e.target.value)} /></div>
                </div>
            );
        } else if (id === 'water-intake-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="150" /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)}>
                            <option value="sedentary">Sedentary (little exercise)</option>
                            <option value="light">Light (1-3 days/week)</option>
                            <option value="moderate">Moderate (3-5 days/week)</option>
                            <option value="active">Active (6-7 days/week)</option>
                            <option value="athlete">Athlete (2x/day)</option>
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'age-calculator') {
            return (
                <div className="grid grid-cols-1 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label><input type="date" className="block w-full p-2 border border-gray-300 rounded-md" value={input1 as string} onChange={(e) => setInput1(e.target.value)} /></div>
                </div>
            );
        } else if (id === 'lease-vs-buy-car') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Car Price ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="35000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Lease Monthly ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="350" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Lease Term (months)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="36" /></div>
                </div>
            );
        } else if (id === 'refinance-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Loan Balance ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="250000" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="6.5" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">New Rate (%)</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="5.5" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Closing Costs ($)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={salaryInput} onChange={(e) => setSalaryInput(Number(e.target.value))} placeholder="5000" /></div>
                </div>
            );
        } else if (id === 'gpa-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Grade Points</label><input type="number" step="0.1" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="45" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Total Credit Hours</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="15" /></div>
                </div>
            );
        } else if (id === 'tip-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount ($)</label><input type="number" step="0.01" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="50" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Tip Percentage (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="18" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label><input type="number" min="1" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="1" /></div>
                </div>
            );
        } else if (id === 'date-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label><input type="date" className="block w-full p-2 border border-gray-300 rounded-md" value={input1 as string} onChange={(e) => setInput1(e.target.value)} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">End Date</label><input type="date" className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as string} onChange={(e) => setInput2(e.target.value)} /></div>
                </div>
            );
        } else if (id === 'time-zone-converter') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Time</label><input type="time" className="block w-full p-2 border border-gray-300 rounded-md" value={input1 as string} onChange={(e) => setInput1(e.target.value)} /></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Time Zone</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input2 as number} onChange={(e) => setInput2(Number(e.target.value))}>
                            <option value="-5">EST (UTC-5)</option>
                            <option value="-6">CST (UTC-6)</option>
                            <option value="-7">MST (UTC-7)</option>
                            <option value="-8">PST (UTC-8)</option>
                            <option value="0">UTC</option>
                            <option value="1">CET (UTC+1)</option>
                            <option value="8">CST China (UTC+8)</option>
                            <option value="9">JST Japan (UTC+9)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Time Zone</label>
                        <select className="block w-full p-2 border border-gray-300 rounded-md" value={input3 as number} onChange={(e) => setInput3(Number(e.target.value))}>
                            <option value="-5">EST (UTC-5)</option>
                            <option value="-6">CST (UTC-6)</option>
                            <option value="-7">MST (UTC-7)</option>
                            <option value="-8">PST (UTC-8)</option>
                            <option value="0">UTC</option>
                            <option value="1">CET (UTC+1)</option>
                            <option value="8">CST China (UTC+8)</option>
                            <option value="9">JST Japan (UTC+9)</option>
                        </select>
                    </div>
                </div>
            );
        } else if (id === 'unit-price-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2">Item 1</h4>
                        <div className="space-y-2">
                            <div><label className="block text-sm text-gray-600 mb-1">Price ($)</label><input type="number" step="0.01" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="5.99" /></div>
                            <div><label className="block text-sm text-gray-600 mb-1">Quantity</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="12" /></div>
                        </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium mb-2">Item 2</h4>
                        <div className="space-y-2">
                            <div><label className="block text-sm text-gray-600 mb-1">Price ($)</label><input type="number" step="0.01" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="9.99" /></div>
                            <div><label className="block text-sm text-gray-600 mb-1">Quantity</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={salaryInput} onChange={(e) => setSalaryInput(Number(e.target.value))} placeholder="24" /></div>
                        </div>
                    </div>
                </div>
            );
        } else if (id === 'grade-calculator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Grade (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input1} onChange={(e) => setInput1(Number(e.target.value))} placeholder="85" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Desired Grade (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input2} onChange={(e) => setInput2(Number(e.target.value))} placeholder="90" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Final Exam Weight (%)</label><input type="number" className="block w-full p-2 border border-gray-300 rounded-md" value={input3} onChange={(e) => setInput3(Number(e.target.value))} placeholder="20" /></div>
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
                    { label: t('nav.categories'), href: '/all-tools' },
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
                                    <Printer className="w-4 h-4 mr-1" /> {t('calc.printResults')}
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <CalcIcon className="w-5 h-5 mr-2 text-blue-600" />
                                {t('calc.popularCalculators')}
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/tools/pregnancy-calculator" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <Baby className="w-4 h-4 mr-2 text-pink-400" /> {t('calc.pregnancyCalculator')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tools/date-calculator" className="flex items-center text-gray-600 hover:text-blue-600">
                                        <Calendar className="w-4 h-4 mr-2 text-blue-400" /> {t('calc.dateCalculator')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <AdSlot id="calc-sidebar" className="mt-8" />
                    </div>

                    {/* Content sections - Third on mobile, second on desktop (order-3 lg:order-2) */}
                    <div className="order-3 lg:order-2 lg:col-span-2 mt-8 lg:mt-0">
                        <ContentSection id="what-it-does" title={t('calc.whatItDoes')}>
                            {config.content.what}
                            {config.expandedContent && (
                                <div className="mt-6 space-y-6">
                                    <p className="text-gray-700 leading-relaxed">{config.expandedContent.introduction}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                            <h4 className="font-bold text-blue-900 flex items-center mb-4">
                                                <Check className="w-5 h-4 mr-2" /> Key Features
                                            </h4>
                                            <ul className="space-y-2">
                                                {config.expandedContent.keyFeatures.map((f, i) => (
                                                    <li key={i} className="text-sm text-blue-800 flex items-start">
                                                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                                                        {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                            <h4 className="font-bold text-green-900 flex items-center mb-4">
                                                <Lightbulb className="w-5 h-5 mr-2" /> Best Use Cases
                                            </h4>
                                            <ul className="space-y-2">
                                                {config.expandedContent.useCases.map((u, i) => (
                                                    <li key={i} className="text-sm text-green-800 flex items-start">
                                                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                                                        {u}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </ContentSection>

                        <AdSlot id="in-content-1" />

                        <ContentSection id="how-to-use" title={t('calc.howToUse')}>
                            {config.content.how}
                            {config.expandedContent && (
                                <div className="mt-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-700 text-sm">
                                    <Info className="w-4 h-4 inline-block mr-2 text-blue-500 mt-[-2px]" />
                                    {config.expandedContent.detailedGuide}
                                </div>
                            )}
                        </ContentSection>

                        {config.expandedContent && (
                            <div className="mb-12 p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-blue-100 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Lightbulb className="w-6 h-6 mr-3 text-yellow-500" />
                                    Expert Financial Tips
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {config.expandedContent.expertTips.map((tip, i) => (
                                        <div key={i} className="flex">
                                            <div className="font-bold text-blue-200 text-4xl mr-4 mt-[-8px] font-serif selects-none">{i + 1}</div>
                                            <p className="text-sm text-gray-700 leading-relaxed pt-1">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <ContentSection id="formula" title={t('calc.formulaMethodology')}>
                            {config.content.formula}
                        </ContentSection>

                        <AdSlot id="in-content-2" />

                        <FAQSection items={config.faq} />

                        {/* Educational Article Promotion */}
                        <div className="mt-12 p-1 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300">
                            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center">
                                <div className="w-full md:w-1/3 h-40 rounded-2xl overflow-hidden mb-6 md:mb-0 md:mr-8">
                                    <img
                                        src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600"
                                        alt="Financial Guide"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">Educational Resource</span>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Want to dive deeper into financial planning?</h3>
                                    <p className="text-gray-600 mb-6 text-sm">
                                        Check out our comprehensive guides in the Learning Center to master your money and navigate taxes with confidence.
                                    </p>
                                    <Link
                                        to="/blog"
                                        className="inline-flex items-center text-blue-600 font-bold text-sm hover:text-blue-800"
                                    >
                                        <BookOpen className="w-4 h-4 mr-2" /> Visit the Learning Center
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <RelatedCategories currentCategory={config.category} />
            </div>
        </div>
    );
};
