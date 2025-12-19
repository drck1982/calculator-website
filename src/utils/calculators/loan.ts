export const calculateMortgage = (homePrice: number, downPayment: number, rate: number, years: number = 30) => {
    const principal = homePrice - downPayment;
    const monthlyRate = (rate / 100) / 12;
    const numPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;
    return [
        { label: 'Loan Amount', value: `$${principal.toLocaleString()}` },
        { label: 'Monthly Payment', value: `$${monthlyPayment.toFixed(2)}`, isTotal: true },
        { label: 'Total Interest', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Total Cost', value: `$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
    ];
};

export const calculateAutoLoan = (carPrice: number, downPayment: number, rate: number, months: number = 60) => {
    const principal = carPrice - downPayment;
    const monthlyRate = (rate / 100) / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - principal;
    return [
        { label: 'Loan Amount', value: `$${principal.toLocaleString()}` },
        { label: 'Monthly Payment', value: `$${monthlyPayment.toFixed(2)}`, isTotal: true },
        { label: 'Total Interest', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Total Cost', value: `$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
    ];
};

export const calculateStudentLoan = (balance: number, rate: number, years: number = 10) => {
    const monthlyRate = (rate / 100) / 12;
    const numPayments = years * 12;
    const monthlyPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - balance;

    return [
        { label: 'Loan Balance', value: `$${balance.toLocaleString()}` },
        { label: 'Interest Rate', value: `${rate}%` },
        { label: 'Loan Term', value: `${years} years` },
        { label: 'Monthly Payment', value: `$${monthlyPayment.toFixed(2)}`, isTotal: true },
        { label: 'Total Interest', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Total Cost', value: `$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
    ];
};

export const calculateDebtPayoff = (balance: number, apr: number, payment: number) => {
    const monthlyRate = (apr / 100) / 12;

    if (payment <= balance * monthlyRate) {
        return [{ label: 'Error', value: 'Payment too low to pay off debt!' }];
    }

    let remaining = balance;
    let months = 0;
    let totalInterest = 0;
    while (remaining > 0 && months < 600) {
        const interest = remaining * monthlyRate;
        totalInterest += interest;
        remaining = remaining + interest - payment;
        months++;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    return [
        { label: 'Starting Balance', value: `$${balance.toLocaleString()}` },
        { label: 'APR', value: `${apr}%` },
        { label: 'Monthly Payment', value: `$${payment.toLocaleString()}` },
        { label: 'Payoff Time', value: `${years > 0 ? `${years} yr ` : ''}${remainingMonths} mo`, isTotal: true },
        { label: 'Total Interest Paid', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
    ];
};

export const calculateLeaseVsBuy = (carPrice: number, leaseMonthly: number, leaseTerm: number) => {
    const loanRate = 6.5;
    // Lease total cost
    const leaseTotal = leaseMonthly * leaseTerm + 2000; // + fees

    // Buy cost (5 year loan, keep same term for comparison)
    const monthlyRate = (loanRate / 100) / 12;
    const loanTerm = 60;
    const loanPayment = carPrice * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const buyTotalPayments = loanPayment * leaseTerm; // Only compare same period
    const depreciationRate = 0.15 + 0.12 + 0.10; // First 3 years ~37%
    const residualValue = carPrice * (1 - depreciationRate);
    const buyCost = buyTotalPayments - (residualValue * (leaseTerm / loanTerm));

    return [
        { label: 'Lease Total', value: `$${leaseTotal.toLocaleString()}` },
        { label: 'Buy Monthly Payment', value: `$${loanPayment.toFixed(0)}` },
        { label: `Buy Cost (${leaseTerm} mo)`, value: `$${buyTotalPayments.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Recommendation', value: leaseTotal < buyCost ? 'Leasing may save money' : 'Buying may save money', isTotal: true },
    ];
};

export const calculateRefinance = (currentBalance: number, currentRate: number, newRate: number, closingCosts: number) => {
    const monthlyRateOld = (currentRate / 100) / 12;
    const monthlyRateNew = (newRate / 100) / 12;
    const term = 30 * 12;

    const oldPayment = currentBalance * (monthlyRateOld * Math.pow(1 + monthlyRateOld, term)) / (Math.pow(1 + monthlyRateOld, term) - 1);
    const newPayment = currentBalance * (monthlyRateNew * Math.pow(1 + monthlyRateNew, term)) / (Math.pow(1 + monthlyRateNew, term) - 1);
    const monthlySavings = oldPayment - newPayment;
    const breakEvenMonths = closingCosts / monthlySavings;
    const totalSavings = monthlySavings * term - closingCosts;

    return [
        { label: 'Current Payment', value: `$${oldPayment.toFixed(2)}` },
        { label: 'New Payment', value: `$${newPayment.toFixed(2)}` },
        { label: 'Monthly Savings', value: `$${monthlySavings.toFixed(2)}`, isTotal: true },
        { label: 'Break-Even', value: `${breakEvenMonths.toFixed(0)} months` },
        { label: 'Total Savings', value: `$${totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
    ];
};

export const calculateAmortization = (principal: number, rate: number, years: number) => {
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
    return [
        { label: 'Monthly Payment', value: `$${monthlyPayment.toFixed(2)}`, isTotal: true },
        { label: 'Total Interest', value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Total Cost', value: `$${totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'First Year Interest', value: `$${firstYearInterest.toFixed(0)}` },
        { label: 'First Year Principal', value: `$${firstYearPrincipal.toFixed(0)}` },
    ];
};

export const calculate401k = (salary: number, contribution: number, employerMatch: number) => {
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
    return [
        { label: 'Your Annual Contribution', value: `$${annualContrib.toLocaleString()}` },
        { label: 'Employer Match', value: `$${employerContrib.toLocaleString()}` },
        { label: `Total Contributed (${years} yrs)`, value: `$${totalContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Investment Growth', value: `$${growth.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
        { label: 'Projected Balance', value: `$${fv.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, isTotal: true },
    ];
};
