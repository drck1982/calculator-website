export const convertCurrency = (amount: number, fromUnit: string, toUnit: string) => {
    const rates: Record<string, number> = {
        'USD': 1, 'EUR': 0.95, 'GBP': 0.79, 'JPY': 154.0, 'CNY': 7.24,
        'CAD': 1.40, 'AUD': 1.54, 'CHF': 0.89, 'HKD': 7.78, 'NZD': 1.71,
        'SGD': 1.34, 'INR': 84.4, 'KRW': 1400, 'MXN': 20.4, 'BRL': 5.8,
        'RUB': 100.0, 'ZAR': 18.1
    };
    const rate = (rates[toUnit] || 1) / (rates[fromUnit] || 1);
    const result = amount * rate;
    return [
        { label: 'Exchange Rate', value: `1 ${fromUnit} = ${rate.toFixed(4)} ${toUnit}` },
        { label: 'Converted Amount', value: `${result.toFixed(2)} ${toUnit}`, isTotal: true },
    ];
};

export const convertUnit = (amount: number, fromUnit: string, toUnit: string, units: { name: string, factor: number }[]) => {
    const fromFactor = units.find(u => u.name === fromUnit)?.factor || 1;
    const toFactor = units.find(u => u.name === toUnit)?.factor || 1;
    const valInBase = amount * fromFactor;
    const result = valInBase / toFactor;
    return [
        { label: 'Input', value: `${amount} ${fromUnit}` },
        { label: 'Result', value: `${result.toFixed(4)} ${toUnit}`, isTotal: true },
    ];
};

export const convertTemperature = (amount: number, fromUnit: string, toUnit: string) => {
    let result = 0;
    const typeMap: Record<string, string> = { 'Celsius': 'C', 'Fahrenheit': 'F', 'Kelvin': 'K' };
    const from = typeMap[fromUnit] || 'C';
    const to = typeMap[toUnit] || 'F';

    let celsius = amount;
    if (from === 'F') celsius = (amount - 32) * 5 / 9;
    else if (from === 'K') celsius = amount - 273.15;

    if (to === 'C') result = celsius;
    else if (to === 'F') result = (celsius * 9 / 5) + 32;
    else if (to === 'K') result = celsius + 273.15;

    return [
        { label: 'Input', value: `${amount}° ${fromUnit}` },
        { label: 'Result', value: `${result.toFixed(2)}° ${toUnit}`, isTotal: true },
    ];
};
import { LENGTH_UNITS, WEIGHT_UNITS, SPEED_UNITS, VOLUME_UNITS, AREA_UNITS } from './units';

export const convertLength = (amount: number, from: string, to: string) => convertUnit(amount, from, to, LENGTH_UNITS);
export const convertWeight = (amount: number, from: string, to: string) => convertUnit(amount, from, to, WEIGHT_UNITS);
export const convertSpeed = (amount: number, from: string, to: string) => convertUnit(amount, from, to, SPEED_UNITS);
export const convertVolume = (amount: number, from: string, to: string) => convertUnit(amount, from, to, VOLUME_UNITS);
export const convertArea = (amount: number, from: string, to: string) => convertUnit(amount, from, to, AREA_UNITS);
