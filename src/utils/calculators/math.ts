export const calculateBinary = (num: number) => {
    return [
        { label: 'Decimal', value: num },
        { label: 'Binary', value: num.toString(2), isTotal: true },
    ];
};

export const calculateHex = (num: number) => {
    return [
        { label: 'Decimal', value: num },
        { label: 'Hexadecimal', value: num.toString(16).toUpperCase(), isTotal: true },
    ];
};

export const calculatePrime = (num: number) => {
    let isPrime = true;
    if (num <= 1) isPrime = false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) isPrime = false;
    }
    return [
        { label: 'Number', value: num },
        { label: 'Is Prime?', value: isPrime ? 'Yes' : 'No', isTotal: true },
    ];
};

export const calculateGcfLcm = (a: number, b: number) => {
    const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
    const resultGcd = gcd(a, b);
    const resultLcm = (a * b) / resultGcd;
    return [
        { label: 'GCF', value: resultGcd },
        { label: 'LCM', value: resultLcm, isTotal: true },
    ];
};

export const calculateSlope = (p1: string, p2: string) => {
    const [x1, y1] = p1.split(',').map(Number);
    const [x2, y2] = p2.split(',').map(Number);
    if (!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2)) {
        const m = (y2 - y1) / (x2 - x1);
        return [
            { label: 'Slope (m)', value: m.toFixed(2), isTotal: true },
        ];
    }
    return [{ label: 'Error', value: 'Invalid Format (x,y)' }];
};

export const calculatePercentage = (val: number, total: number) => {
    const pct = (val / total) * 100;
    return [
        { label: 'Calculation', value: `${val} is what % of ${total}?` },
        { label: 'Result', value: `${pct.toFixed(2)}%`, isTotal: true },
    ];
};

export const calculateStandardDeviation = (input: string) => {
    const nums = input.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
    if (nums.length > 0) {
        const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
        const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
        const stdDev = Math.sqrt(variance);
        return [
            { label: 'Mean', value: mean.toFixed(4) },
            { label: 'Standard Deviation (Population)', value: stdDev.toFixed(4), isTotal: true },
        ];
    }
    return [{ label: 'Error', value: 'Invalid Input' }];
};

export const calculateGpa = (gradePoints: number, creditHours: number) => {
    const gpa = creditHours > 0 ? gradePoints / creditHours : 0;
    return [
        { label: 'Grade Points', value: gradePoints },
        { label: 'Credit Hours', value: creditHours },
        { label: 'GPA', value: gpa.toFixed(2), isTotal: true },
    ];
};

export const calculateTip = (bill: number, tipPercent: number, people: number = 1) => {
    const tip = bill * (tipPercent / 100);
    const total = bill + tip;
    const perPerson = total / people;
    return [
        { label: 'Tip Amount', value: `$${tip.toFixed(2)}` },
        { label: 'Total', value: `$${total.toFixed(2)}`, isTotal: true },
        { label: 'Per Person', value: `$${perPerson.toFixed(2)}` },
    ];
};

export const calculateUnitPrice = (price1: number, qty1: number, price2: number, qty2: number) => {
    const up1 = price1 / qty1;
    const up2 = price2 / qty2;
    return [
        { label: 'Unit Price 1', value: `$${up1.toFixed(3)}` },
        { label: 'Unit Price 2', value: `$${up2.toFixed(3)}` },
        { label: 'Better Value', value: up1 < up2 ? 'Item 1' : 'Item 2', isTotal: true },
    ];
};

export const calculateGrade = (score: number, total: number) => {
    const pct = (score / total) * 100;
    let grade = 'F';
    if (pct >= 90) grade = 'A';
    else if (pct >= 80) grade = 'B';
    else if (pct >= 70) grade = 'C';
    else if (pct >= 60) grade = 'D';
    return [
        { label: 'Percentage', value: `${pct.toFixed(2)}%` },
        { label: 'Grade', value: grade, isTotal: true },
    ];
};

export const convertBase = (num: number) => {
    return [
        { label: 'Binary', value: num.toString(2) },
        { label: 'Hexadecimal', value: num.toString(16).toUpperCase(), isTotal: true },
        { label: 'Octal', value: num.toString(8) },
    ];
};

