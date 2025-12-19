export const calculateSimpleInterest = (p: number, r: number, t: number) => {
    const interest = p * (r / 100) * t;
    return [
        { label: 'Principal', value: `$${p}` },
        { label: 'Total Interest', value: `$${interest.toFixed(2)}`, isTotal: true },
        { label: 'Total Amount', value: `$${(p + interest).toFixed(2)}` },
    ];
};

export const calculateApy = (r: number, n: number) => {
    const apy = (Math.pow(1 + (r / 100) / n, n) - 1) * 100;
    return [
        { label: 'Nominal Rate', value: `${r}%` },
        { label: 'APY', value: `${apy.toFixed(2)}%`, isTotal: true },
    ];
};

export const calculateRoi = (invested: number, returned: number) => {
    const roi = ((returned - invested) / invested) * 100;
    return [
        { label: 'Net Profit', value: `$${(returned - invested).toFixed(2)}` },
        { label: 'ROI', value: `${roi.toFixed(2)}%`, isTotal: true },
    ];
};

export const calculateBreakEven = (fixed: number, variable: number, price: number) => {
    const bep = fixed / (price - variable);
    return [
        { label: 'Contribution Margin', value: `$${(price - variable).toFixed(2)}` },
        { label: 'Break-Even Units', value: `${Math.ceil(bep)}`, isTotal: true },
    ];
};

export const calculateMargin = (cost: number, revenue: number) => {
    const margin = ((revenue - cost) / revenue) * 100;
    const markup = ((revenue - cost) / cost) * 100;
    return [
        { label: 'Profit', value: `$${(revenue - cost).toFixed(2)}` },
        { label: 'Gross Margin', value: `${margin.toFixed(2)}%`, isTotal: true },
        { label: 'Markup', value: `${markup.toFixed(2)}%` },
    ];
};

export const calculateVat = (amount: number, rate: number) => {
    const vat = amount * (rate / 100);
    return [
        { label: 'Net Amount', value: `$${amount.toFixed(2)}` },
        { label: 'VAT Amount', value: `$${vat.toFixed(2)}` },
        { label: 'Gross Amount', value: `$${(amount + vat).toFixed(2)}`, isTotal: true },
    ];
};

export const calculateDownPayment = (price: number, percent: number) => {
    const down = price * (percent / 100);
    return [
        { label: 'Purchase Price', value: `$${price.toLocaleString()}` },
        { label: 'Down Payment', value: `$${down.toLocaleString()}`, isTotal: true },
        { label: 'Loan Amount', value: `$${(price - down).toLocaleString()}` },
    ];
};

export const calculateHomeAffordability = (annualIncome: number, monthlyDebts: number, downPayment: number, interestRate: number) => {
    const monthlyIncome = annualIncome / 12;
    const maxHousingPayment = monthlyIncome * 0.28; // 28% rule
    const maxTotalDebt = monthlyIncome * 0.36; // 36% rule
    const availableForHousing = Math.min(maxHousingPayment, maxTotalDebt - monthlyDebts);

    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = 30 * 12;
    const maxLoan = availableForHousing * (Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
    const maxHomePrice = maxLoan + downPayment;

    return [
        { label: 'Annual Income', value: `$${annualIncome.toLocaleString()}` },
        { label: 'Max Monthly Payment', value: `$${availableForHousing.toFixed(0)}` },
        { label: 'Max Loan Amount', value: `$${maxLoan.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Max Home Price', value: `$${maxHomePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
    ];
};

export const calculateNetWorth = (assets: number, liabilities: number) => {
    const netWorth = assets - liabilities;
    return [
        { label: 'Total Assets', value: `$${assets.toLocaleString()}` },
        { label: 'Total Liabilities', value: `$${liabilities.toLocaleString()}` },
        { label: 'Net Worth', value: `$${netWorth.toLocaleString()}`, isTotal: true },
        { label: 'Debt-to-Asset Ratio', value: `${((liabilities / assets) * 100).toFixed(1)}%` },
    ];
};

export const calculateEmergencyFund = (monthlyExpenses: number, months: number, currentSavings: number) => {
    const targetFund = monthlyExpenses * months;
    const needed = Math.max(0, targetFund - currentSavings);
    return [
        { label: 'Monthly Expenses', value: `$${monthlyExpenses.toLocaleString()}` },
        { label: `Target (${months} months)`, value: `$${targetFund.toLocaleString()}`, isTotal: true },
        { label: 'Current Savings', value: `$${currentSavings.toLocaleString()}` },
        { label: 'Still Needed', value: `$${needed.toLocaleString()}` },
    ];
};

export const calculateSavingsGoal = (goalAmount: number, currentSavings: number, monthsToGoal: number, annualRate: number) => {
    const monthlyRate = (annualRate / 100) / 12;
    const futureCurrentValue = currentSavings * Math.pow(1 + monthlyRate, monthsToGoal);
    const remaining = goalAmount - futureCurrentValue;
    const monthlySavings = remaining > 0 ? remaining * monthlyRate / (Math.pow(1 + monthlyRate, monthsToGoal) - 1) : 0;

    return [
        { label: 'Goal Amount', value: `$${goalAmount.toLocaleString()}` },
        { label: 'Timeline', value: `${monthsToGoal} months` },
        { label: 'Monthly Savings Needed', value: `$${Math.max(0, monthlySavings).toFixed(2)}`, isTotal: true },
        { label: 'Interest Earned', value: `$${(goalAmount - currentSavings - (monthlySavings * monthsToGoal)).toFixed(0)}` },
    ];
};

export const calculatePaycheck = (salary: number, stateData: any, t: (key: string) => string) => {
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

    return [
        { label: t('calc.paycheck.grossPay'), value: `$${salary.toLocaleString()}` },
        { label: t('calc.paycheck.federalTax'), value: `$${fedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: t('calc.paycheck.socialSecurity'), value: `$${socialSecurity.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: t('calc.paycheck.medicare'), value: `$${medicare.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: `${t('calc.paycheck.stateTax')} (${stateData.code} ${(stateTaxRate * 100).toFixed(2)}%)`, value: stateTaxRate === 0 ? '$0 (No State Tax)' : `$${stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: t('calc.totalTaxes'), value: `$${totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: t('calc.effectiveRate'), value: `${effectiveRate.toFixed(1)}%` },
        { label: t('calc.paycheck.netPay'), value: `$${netPay.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
    ];
};

export const calculateHourlyToSalary = (hourlyWage: number, hoursPerWeek: number) => {
    const weekly = hourlyWage * hoursPerWeek;
    const monthly = (weekly * 52) / 12;
    const yearly = weekly * 52;
    return [
        { label: 'Weekly Pay', value: `$${weekly.toLocaleString()}` },
        { label: 'Monthly Pay', value: `$${monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Annual Salary', value: `$${yearly.toLocaleString()}`, isTotal: true },
    ];
};

export const calculateBonusTax = (amount: number, stateRate: number) => {
    const fedFlatRate = 0.22; // Supplemental wage rate
    const ficaRate = 0.0765;
    const fedTax = amount * fedFlatRate;
    const ficaTax = amount * ficaRate;
    const stateTax = amount * stateRate;
    const totalTax = fedTax + ficaTax + stateTax;
    const netBonus = amount - totalTax;
    return [
        { label: 'Gross Bonus', value: `$${amount.toLocaleString()}` },
        { label: 'Federal Tax (22%)', value: `$${fedTax.toLocaleString()}` },
        { label: 'FICA (7.65%)', value: `$${ficaTax.toLocaleString()}` },
        { label: 'State Tax', value: `$${stateRate > 0 ? (stateRate * 100).toFixed(2) + '%' : '0%'}`, value2: `$${stateTax.toLocaleString()}` },
        { label: 'Total Taxes', value: `$${totalTax.toLocaleString()}` },
        { label: 'Net Bonus', value: `$${netBonus.toLocaleString()}`, isTotal: true },
    ];
};

export const calculateFederalTax = (income: number, status: string) => {
    // 2024-2025 simplified brackets
    let tax = 0;
    if (status === 'married' || status === 'married-jointly') {
        if (income <= 23200) tax = income * 0.10;
        else if (income <= 94300) tax = 2320 + (income - 23200) * 0.12;
        else if (income <= 201050) tax = 10852 + (income - 94300) * 0.22;
        else tax = 34337 + (income - 201050) * 0.24;
    } else {
        if (income <= 11600) tax = income * 0.10;
        else if (income <= 47150) tax = 1160 + (income - 11600) * 0.12;
        else if (income <= 100525) tax = 5426 + (income - 47150) * 0.22;
        else tax = 17168 + (income - 100525) * 0.24;
    }
    return [
        { label: 'Taxable Income', value: `$${income.toLocaleString()}` },
        { label: 'Filing Status', value: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ') },
        { label: 'Estimated Federal Tax', value: `$${tax.toLocaleString()}`, isTotal: true },
        { label: 'Effective Rate', value: `${((tax / income) * 100).toFixed(1)}%` },
    ];
};

export const calculateRentVsBuy = (monthlyRent: number, homePrice: number, years: number) => {
    const totalRent = monthlyRent * 12 * years;
    const closingCosts = homePrice * 0.03;
    const maintenance = homePrice * 0.01 * years;
    const buyTotal = closingCosts + maintenance + (homePrice * 0.06); // basic est
    return [
        { label: `Total Rent (${years} yrs)`, value: `$${totalRent.toLocaleString()}` },
        { label: 'Est. Buying Costs', value: `$${buyTotal.toLocaleString()}` },
        { label: 'Better Option', value: totalRent < buyTotal ? 'Renting' : 'Buying', isTotal: true },
    ];
};

export const calculateCompoundInterest = (p: number, m: number, r: number, t: number) => {
    const rate = r / 100 / 12;
    const months = t * 12;
    const futureValue = p * Math.pow(1 + rate, months) + (m > 0 ? m * ((Math.pow(1 + rate, months) - 1) / rate) : 0);
    const totalInvested = p + (m * months);
    const interestEarned = futureValue - totalInvested;
    return [
        { label: 'Total Invested', value: `$${totalInvested.toLocaleString()}` },
        { label: 'Interest Earned', value: `$${interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Total Value', value: `$${futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
    ];
};

export const calculateInflation = (amount: number, startYear: number, endYear: number = 2024) => {
    const years = Math.abs(endYear - startYear);
    const avgInflation = 0.03; // 3% average
    const adjustedValue = amount * Math.pow(1 + avgInflation, years);
    return [
        { label: `Value in ${startYear}`, value: `$${amount.toLocaleString()}` },
        { label: `Equivalent in ${endYear}`, value: `$${adjustedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
        { label: 'Total Price Increase', value: `${((adjustedValue / amount - 1) * 100).toFixed(1)}%` },
    ];
};
