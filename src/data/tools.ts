export interface ToolSummary {
    id: string;
    name: string;
    description: string;
    link: string;
    tags: string[];
}

export interface CategoryData {
    title: string;
    description: string;
    tools: ToolSummary[];
}

export const toolsByCategory: Record<string, CategoryData> = {
    'salary-tax': {
        title: 'Salary & Tax Calculators',
        description: 'Calculate your take-home pay, income tax, and more. Our salary tools help you understand your paycheck and plan your finances better.',
        tools: [
            { id: 'ny-salary-tax-calculator', name: 'New York Salary Tax Calculator', description: 'Estimate your take-home pay in NY.', link: '/tools/ny-salary-tax-calculator', tags: ['Salary', 'Tax'] },
            { id: 'hourly-to-salary', name: 'Hourly to Salary Converter', description: 'Convert hourly wage to annual salary.', link: '/tools/hourly-to-salary', tags: ['Salary'] },
            { id: 'bonus-tax-calculator', name: 'Bonus Tax Calculator', description: 'Calculate taxes on your bonus.', link: '/tools/bonus-tax-calculator', tags: ['Tax'] },
            { id: 'federal-tax-calculator', name: 'Federal Income Tax Calculator', description: 'Estimate your federal tax liability.', link: '/tools/federal-tax-calculator', tags: ['Tax'] },
        ]
    },
    'finance': {
        title: 'Finance Calculators',
        description: 'Manage your personal finances, investments, and business calculations.',
        tools: [
            { id: 'simple-interest-calculator', name: 'Simple Interest Calculator', description: 'Calculate simple interest on loans or savings.', link: '/tools/simple-interest-calculator', tags: ['Finance'] },
            { id: 'apy-calculator', name: 'APY Calculator', description: 'Calculate Annual Percentage Yield.', link: '/tools/apy-calculator', tags: ['Interest'] },
            { id: 'roi-calculator', name: 'ROI Calculator', description: 'Calculate Return on Investment.', link: '/tools/roi-calculator', tags: ['Business'] },
            { id: 'break-even-calculator', name: 'Break-Even Point Calculator', description: 'Find when your business becomes profitable.', link: '/tools/break-even-calculator', tags: ['Business'] },
            { id: 'margin-calculator', name: 'Margin Calculator', description: 'Calculate profit margin and markup.', link: '/tools/margin-calculator', tags: ['Business'] },
            { id: 'vat-calculator', name: 'VAT Calculator', description: 'Calculate Value Added Tax.', link: '/tools/vat-calculator', tags: ['Tax'] },
            { id: 'down-payment-calculator', name: 'Down Payment Calculator', description: 'Calculate down payment percentage and amount.', link: '/tools/down-payment-calculator', tags: ['Mortgage'] },
            { id: 'rent-vs-buy-calculator', name: 'Rent vs. Buy Calculator', description: 'Decide whether to rent or buy a home.', link: '/tools/rent-vs-buy-calculator', tags: ['Real Estate'] },
        ]
    },
    'loans-debt': {
        title: 'Loans & Debt Calculators',
        description: 'Plan your loan payments and debt payoff strategies. Use our tools to compare loan options and save on interest.',
        tools: [
            { id: 'mortgage-calculator', name: 'Mortgage Calculator', description: 'Calculate monthly mortgage payments.', link: '/tools/mortgage-calculator', tags: ['Mortgage'] },
            { id: 'auto-loan-calculator', name: 'Auto Loan Calculator', description: 'Estimate car loan payments.', link: '/tools/auto-loan-calculator', tags: ['Auto'] },
            { id: 'amortization-calculator', name: 'Amortization Calculator', description: 'View your loan amortization schedule.', link: '/tools/amortization-calculator', tags: ['Loan'] },
        ]
    },
    'investment': {
        title: 'Investment Calculators',
        description: 'Track your investment growth and plan for retirement. See the power of compound interest.',
        tools: [
            { id: 'compound-interest-calculator', name: 'Compound Interest Calculator', description: 'Calculate investment growth over time.', link: '/tools/compound-interest-calculator', tags: ['Investment'] },
            { id: '401k-calculator', name: '401(k) Calculator', description: 'Estimate your 401(k) balance at retirement.', link: '/tools/401k-calculator', tags: ['Retirement'] },
            { id: 'inflation-calculator', name: 'Inflation Calculator', description: 'Calculate the changing value of money over time.', link: '/tools/inflation-calculator', tags: ['Finance'] },
        ]
    },
    'health': {
        title: 'Health & Fitness Calculators',
        description: 'Monitor your health and fitness goals.',
        tools: [
            { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index.', link: '/tools/bmi-calculator', tags: ['Health'] },
            { id: 'calorie-calculator', name: 'Calorie Calculator', description: 'Estimate daily calorie needs.', link: '/tools/calorie-calculator', tags: ['Fitness'] },
            { id: 'pregnancy-calculator', name: 'Pregnancy Calculator', description: 'Estimate your due date.', link: '/tools/pregnancy-calculator', tags: ['Health'] },
            { id: 'tdee-calculator', name: 'TDEE Calculator', description: 'Total Daily Energy Expenditure estimator.', link: '/tools/tdee-calculator', tags: ['Fitness'] },
            { id: 'macro-calculator', name: 'Macro Calculator', description: 'Calculate optimal macronutrient split.', link: '/tools/macro-calculator', tags: ['Diet'] },
            { id: 'one-rep-max-calculator', name: 'One Rep Max Calculator', description: 'Estimate your 1RM for lifting.', link: '/tools/one-rep-max-calculator', tags: ['Fitness'] },
            { id: 'bac-calculator', name: 'BAC Calculator', description: 'Estimate Blood Alcohol Content.', link: '/tools/bac-calculator', tags: ['Health'] },
            { id: 'smoking-cost-calculator', name: 'Smoking Cost Calculator', description: 'Calculate the financial cost of smoking.', link: '/tools/smoking-cost-calculator', tags: ['Health'] },
        ]
    },
    'math': {
        title: 'Math Calculators',
        description: 'Solve mathematical problems from algebra to geometry.',
        tools: [
            { id: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages easily.', link: '/tools/percentage-calculator', tags: ['Math'] },
            { id: 'binary-calculator', name: 'Binary Calculator', description: 'Convert text/numbers to binary.', link: '/tools/binary-calculator', tags: ['Computer Science'] },
            { id: 'hex-calculator', name: 'Hex Calculator', description: 'Convert numbers to hexadecimal.', link: '/tools/hex-calculator', tags: ['Computer Science'] },
            { id: 'prime-calculator', name: 'Prime Number Calculator', description: 'Check if a number is prime.', link: '/tools/prime-calculator', tags: ['Math'] },
            { id: 'gcf-lcm-calculator', name: 'GCF & LCM Calculator', description: 'Find Greatest Common Factor and Least Common Multiple.', link: '/tools/gcf-lcm-calculator', tags: ['Math'] },
            { id: 'slope-calculator', name: 'Slope Calculator', description: 'Calculate the slope of a line.', link: '/tools/slope-calculator', tags: ['Geometry'] },
        ]
    },
    'geometry': {
        title: 'Geometry & Construction',
        description: 'Calculate areas, volumes, and material needs.',
        tools: [
            { id: 'circle-calculator', name: 'Circle Calculator', description: 'Calculate area and circumference.', link: '/tools/circle-calculator', tags: ['Geometry'] },
            { id: 'triangle-calculator', name: 'Triangle Calculator', description: 'Calculate area and perimeter.', link: '/tools/triangle-calculator', tags: ['Geometry'] },
            { id: 'pythagorean-calculator', name: 'Pythagorean Theorem Calculator', description: 'Calculate the hypotenuse.', link: '/tools/pythagorean-calculator', tags: ['Geometry'] },
            { id: 'tile-calculator', name: 'Tile Calculator', description: 'Estimate tiles needed for a room.', link: '/tools/tile-calculator', tags: ['Construction'] },
            { id: 'paint-calculator', name: 'Paint Calculator', description: 'Estimate paint gallons needed.', link: '/tools/paint-calculator', tags: ['Construction'] },
            { id: 'wallpaper-calculator', name: 'Wallpaper Calculator', description: 'Estimate wallpaper rolls needed.', link: '/tools/wallpaper-calculator', tags: ['Construction'] },
            { id: 'concrete-calculator', name: 'Concrete Calculator', description: 'Estimate concrete bags needed.', link: '/tools/concrete-calculator', tags: ['Construction'] },
        ]
    },
    'conversion': {
        title: 'Conversion Calculators',
        description: 'Convert between different units of measurement quickly and accurately.',
        tools: [
            { id: 'currency-converter', name: 'Currency Converter', description: 'Real-time currency exchange rates.', link: '/tools/currency-converter', tags: ['Money'] },
            { id: 'length-converter', name: 'Length Converter', description: 'Convert meters, feet, inches, and more.', link: '/tools/length-converter', tags: ['Conversion'] },
            { id: 'weight-converter', name: 'Weight Converter', description: 'Convert kg, lbs, oz, and more.', link: '/tools/weight-converter', tags: ['Conversion'] },
            { id: 'temperature-converter', name: 'Temperature Converter', description: 'Convert Celsius, Fahrenheit, Kelvin.', link: '/tools/temperature-converter', tags: ['Conversion'] },
            { id: 'speed-converter', name: 'Speed Converter', description: 'Convert mph, km/h, m/s.', link: '/tools/speed-converter', tags: ['Conversion'] },
            { id: 'volume-converter', name: 'Volume Converter', description: 'Convert liters, gallons, cups.', link: '/tools/volume-converter', tags: ['Conversion'] },
            { id: 'area-converter', name: 'Area Converter', description: 'Convert sq ft, sq meters, acres.', link: '/tools/area-converter', tags: ['Conversion'] },
        ]
    },
    'everyday-life': {
        title: 'Everyday Life Calculators',
        description: 'Useful tools for daily tasks and planning.',
        tools: [
            { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate your exact age in years, months, and days.', link: '/tools/age-calculator', tags: ['Life'] },
            { id: 'date-calculator', name: 'Date Calculator', description: 'Calculate days between dates.', link: '/tools/date-calculator', tags: ['Life'] },
            { id: 'tip-calculator', name: 'Tip Calculator', description: 'Calculate gratuity and split bills.', link: '/tools/tip-calculator', tags: ['Money'] },
            { id: 'gas-mileage-calculator', name: 'Gas Mileage Calculator', description: 'Calculate MPG and fuel costs.', link: '/tools/gas-mileage-calculator', tags: ['Cars'] },
            { id: 'travel-time-calculator', name: 'Travel Time Calculator', description: 'Estimate arrival time based on speed.', link: '/tools/travel-time-calculator', tags: ['Travel'] },
            { id: 'time-zone-converter', name: 'Time Zone Converter', description: 'Convert time between cities.', link: '/tools/time-zone-converter', tags: ['Time'] },
            { id: 'grade-calculator', name: 'Grade Calculator', description: 'Calculate your class grade.', link: '/tools/grade-calculator', tags: ['School'] },
        ]
    },
    'biology': {
        title: 'Biology Calculators',
        description: 'Explore the science of life with our biology calculators. From genetics to cell biology.',
        tools: [
            { id: 'dna-replication', name: 'DNA Replication Calculator', description: 'Simulate DNA replication processes.', link: '/tools/dna-replication', tags: ['Genetics'] },
            { id: 'allele-frequency', name: 'Allele Frequency Calculator', description: 'Calculate allele frequencies in a population.', link: '/tools/allele-frequency', tags: ['Genetics'] },
        ]
    },
    'chemistry': {
        title: 'Chemistry Calculators',
        description: 'Solve chemical equations and calculate properties with ease.',
        tools: [
            { id: 'molarity-calculator', name: 'Molarity Calculator', description: 'Calculate the molarity of a solution.', link: '/tools/molarity-calculator', tags: ['Chemistry'] },
            { id: 'ph-calculator', name: 'pH Calculator', description: 'Determine the pH level of a solution.', link: '/tools/ph-calculator', tags: ['Chemistry'] },
        ]
    },
    'physics': {
        title: 'Physics Calculators',
        description: 'Calculate forces, motion, energy, and more.',
        tools: [
            { id: 'velocity-calculator', name: 'Velocity Calculator', description: 'Calculate speed, distance, or time.', link: '/tools/velocity-calculator', tags: ['Physics'] },
        ]
    },
    'sports': {
        title: 'Sports Calculators',
        description: 'Tools for athletes and sports enthusiasts.',
        tools: [
            { id: 'pace-calculator', name: 'Pace Calculator', description: 'Calculate running pace and splits.', link: '/tools/pace-calculator', tags: ['Running'] },
        ]
    },
    'statistics': {
        title: 'Statistics Calculators',
        description: 'Analyze data and calculate statistical probabilities.',
        tools: [
            { id: 'standard-deviation', name: 'Standard Deviation Calculator', description: 'Calculate variance and standard deviation.', link: '/tools/standard-deviation', tags: ['Stats'] },
        ]
    },
    'other': {
        title: 'Other Calculators',
        description: 'Miscellaneous tools for various needs.',
        tools: [
            { id: 'random-number', name: 'Random Number Generator', description: 'Generate random numbers within a range.', link: '/tools/random-number', tags: ['Tools'] },
        ]
    }
};

export const getAllTools = (): ToolSummary[] => {
    return Object.values(toolsByCategory).flatMap(category => category.tools);
};

export interface ToolConfig {
    id: string;
    title: string;
    description: string;
    category: string;
    categoryLink: string;
    formTitle: string;
    resultTitle: string;
    content: {
        what: string;
        how: string;
        formula: string;
    };
    faq: { question: string; answer: string }[];
}

export const toolConfigs: Record<string, ToolConfig> = {
    // --- Finance ---
    'ny-salary-tax-calculator': {
        id: 'ny-salary-tax-calculator',
        title: 'New York Salary Tax Calculator',
        description: 'Calculate your net pay in New York.',
        category: 'Finance',
        categoryLink: '/category/salary-tax',
        formTitle: 'Enter Your Salary',
        resultTitle: 'Your Net Pay',
        content: {
            what: 'This calculator helps you estimate your take-home pay.',
            how: 'Enter your gross salary and select your filing status.',
            formula: 'Net Pay = Gross Pay - Taxes'
        },
        faq: [{ question: 'How accurate is this?', answer: 'It provides an estimate based on current tax brackets.' }]
    },
    'hourly-to-salary': {
        id: 'hourly-to-salary',
        title: 'Hourly to Salary Converter',
        description: 'Convert hourly wage to annual salary.',
        category: 'Finance',
        categoryLink: '/category/salary-tax',
        formTitle: 'Enter Hourly Wage',
        resultTitle: 'Annual Salary',
        content: { what: 'Convert hourly rate to yearly salary.', how: 'Enter hourly wage and hours per week.', formula: 'Annual = Hourly * Hours/Week * 52' },
        faq: []
    },
    'bonus-tax-calculator': {
        id: 'bonus-tax-calculator',
        title: 'Bonus Tax Calculator (2025)',
        description: 'Calculate federal and state taxes on your bonus using 2025 tax rates.',
        category: 'Finance',
        categoryLink: '/category/salary-tax',
        formTitle: 'Enter Bonus Details',
        resultTitle: 'Tax Breakdown',
        content: { 
            what: 'Calculates taxes withheld from bonus payments including federal supplemental tax (22%), state income tax, Social Security (6.2%), and Medicare (1.45%).', 
            how: 'Enter your bonus amount and select your state for accurate state income tax calculation.', 
            formula: 'Total Tax = Federal (22%) + State Tax + Social Security (6.2% up to $176,100) + Medicare (1.45%)' 
        },
        faq: [
            { question: 'Why is the federal tax rate 22%?', answer: 'The IRS requires employers to withhold a flat 22% federal tax on supplemental wages (like bonuses) under $1 million.' },
            { question: 'Which states have no income tax?', answer: 'Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming have no state income tax on wages.' }
        ]
    },
    'federal-tax-calculator': {
        id: 'federal-tax-calculator',
        title: 'Federal Income Tax Calculator (2025)',
        description: 'Estimate your federal income tax liability using 2025 tax brackets.',
        category: 'Finance',
        categoryLink: '/category/salary-tax',
        formTitle: 'Enter Taxable Income',
        resultTitle: 'Tax Estimate',
        content: { 
            what: 'Calculates your federal income tax based on 2025 tax brackets for single filers.', 
            how: 'Enter your taxable income to see your tax bracket and estimated federal tax.', 
            formula: 'Progressive tax brackets: 10%, 12%, 22%, 24%, 32%, 35%, 37%' 
        },
        faq: [
            { question: 'What are the 2025 tax brackets?', answer: '10% ($0-$11,925), 12% ($11,926-$48,475), 22% ($48,476-$103,350), 24% ($103,351-$197,300), 32% ($197,301-$250,500), 35% ($250,501-$626,350), 37% (over $626,350).' }
        ]
    },
    'simple-interest-calculator': {
        id: 'simple-interest-calculator',
        title: 'Simple Interest Calculator',
        description: 'Calculate simple interest on loans or savings.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Interest Details',
        resultTitle: 'Interest Earned',
        content: { what: 'Calculates simple interest.', how: 'Enter principal, rate, and time.', formula: 'I = P * r * t' },
        faq: []
    },
    'apy-calculator': {
        id: 'apy-calculator',
        title: 'APY Calculator',
        description: 'Calculate Annual Percentage Yield.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Interest Rate Details',
        resultTitle: 'APY',
        content: { what: 'Calculates the effective annual interest rate.', how: 'Enter interest rate and compounding frequency.', formula: 'APY = (1 + r/n)^n - 1' },
        faq: []
    },
    'roi-calculator': {
        id: 'roi-calculator',
        title: 'ROI Calculator',
        description: 'Calculate Return on Investment.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Investment Details',
        resultTitle: 'ROI',
        content: { what: 'Calculates the percentage return on an investment.', how: 'Enter initial investment and final value.', formula: 'ROI = (Net Profit / Cost) * 100' },
        faq: []
    },
    'break-even-calculator': {
        id: 'break-even-calculator',
        title: 'Break-Even Point Calculator',
        description: 'Find when your business becomes profitable.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Cost Details',
        resultTitle: 'Break-Even Point',
        content: { what: 'Determines the number of units to sell to cover costs.', how: 'Enter fixed costs, variable costs, and price.', formula: 'BEP = Fixed Costs / (Price - Variable Costs)' },
        faq: []
    },
    'margin-calculator': {
        id: 'margin-calculator',
        title: 'Margin Calculator',
        description: 'Calculate profit margin and markup.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Cost and Price',
        resultTitle: 'Margin & Markup',
        content: { what: 'Calculates gross margin and markup percentage.', how: 'Enter cost and revenue.', formula: 'Margin = (Revenue - Cost) / Revenue' },
        faq: []
    },
    'vat-calculator': {
        id: 'vat-calculator',
        title: 'VAT Calculator',
        description: 'Calculate Value Added Tax.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Price and VAT Rate',
        resultTitle: 'VAT Amount',
        content: { what: 'Calculates VAT to add or remove.', how: 'Enter amount and VAT rate.', formula: 'VAT = Price * Rate' },
        faq: []
    },
    'down-payment-calculator': {
        id: 'down-payment-calculator',
        title: 'Down Payment Calculator',
        description: 'Calculate down payment percentage and amount.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Purchase Details',
        resultTitle: 'Down Payment',
        content: { what: 'Calculates the down payment amount.', how: 'Enter purchase price and percentage.', formula: 'Down Payment = Price * Percentage' },
        faq: []
    },
    'rent-vs-buy-calculator': {
        id: 'rent-vs-buy-calculator',
        title: 'Rent vs. Buy Calculator',
        description: 'Decide whether to rent or buy a home.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Housing Costs',
        resultTitle: 'Comparison',
        content: { what: 'Compares the costs of renting vs buying over time.', how: 'Enter rent, home price, and duration.', formula: 'Complex comparison of net costs.' },
        faq: []
    },

    // --- Loans ---
    'mortgage-calculator': {
        id: 'mortgage-calculator',
        title: 'Mortgage Calculator',
        description: 'Calculate monthly mortgage payments.',
        category: 'Loans',
        categoryLink: '/category/loans-debt',
        formTitle: 'Loan Details',
        resultTitle: 'Monthly Payment',
        content: { what: 'Estimates monthly mortgage payments.', how: 'Enter loan amount, interest rate, and term.', formula: 'M = P[r(1+r)^n]/[(1+r)^n-1]' },
        faq: []
    },
    'auto-loan-calculator': {
        id: 'auto-loan-calculator',
        title: 'Auto Loan Calculator',
        description: 'Estimate car loan payments.',
        category: 'Loans',
        categoryLink: '/category/loans-debt',
        formTitle: 'Car Loan Details',
        resultTitle: 'Monthly Payment',
        content: { what: 'Calculates monthly car payments.', how: 'Enter car price, down payment, rate, and term.', formula: 'Standard amortization formula.' },
        faq: []
    },
    'amortization-calculator': {
        id: 'amortization-calculator',
        title: 'Amortization Calculator',
        description: 'View your loan amortization schedule.',
        category: 'Loans',
        categoryLink: '/category/loans-debt',
        formTitle: 'Loan Terms',
        resultTitle: 'Amortization Schedule',
        content: { what: 'Shows how loan payments are split between principal and interest.', how: 'Enter loan details.', formula: 'Amortization calculation.' },
        faq: []
    },

    // --- Investment ---
    'compound-interest-calculator': {
        id: 'compound-interest-calculator',
        title: 'Compound Interest Calculator',
        description: 'Calculate investment growth over time.',
        category: 'Investment',
        categoryLink: '/category/investment',
        formTitle: 'Investment Plan',
        resultTitle: 'Future Value',
        content: { what: 'Calculates future value with compound interest.', how: 'Enter principal, rate, time, and contribution.', formula: 'A = P(1 + r/n)^(nt)' },
        faq: []
    },
    '401k-calculator': {
        id: '401k-calculator',
        title: '401(k) Calculator',
        description: 'Estimate your 401(k) balance at retirement.',
        category: 'Investment',
        categoryLink: '/category/investment',
        formTitle: 'Retirement Savings',
        resultTitle: 'Projected Balance',
        content: { what: 'Estimates retirement savings growth.', how: 'Enter salary, contribution %, and employer match.', formula: 'Compound interest with contributions.' },
        faq: []
    },
    'inflation-calculator': {
        id: 'inflation-calculator',
        title: 'Inflation Calculator',
        description: 'Calculate the changing value of money over time.',
        category: 'Investment',
        categoryLink: '/category/investment',
        formTitle: 'Inflation Details',
        resultTitle: 'Adjusted Value',
        content: { what: 'Calculates purchasing power changes.', how: 'Enter amount, start year, and end year.', formula: 'Based on CPI data.' },
        faq: []
    },

    // --- Health ---
    'bmi-calculator': {
        id: 'bmi-calculator',
        title: 'BMI Calculator',
        description: 'Calculate Body Mass Index.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Body Stats',
        resultTitle: 'Your BMI',
        content: { what: 'Calculates Body Mass Index.', how: 'Enter height and weight.', formula: 'BMI = kg/m²' },
        faq: []
    },
    'calorie-calculator': {
        id: 'calorie-calculator',
        title: 'Calorie Calculator',
        description: 'Estimate daily calorie needs.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Activity Level',
        resultTitle: 'Daily Calories',
        content: { what: 'Estimates calories needed to maintain weight.', how: 'Enter age, gender, weight, height, and activity.', formula: 'Mifflin-St Jeor Equation' },
        faq: []
    },
    'pregnancy-calculator': {
        id: 'pregnancy-calculator',
        title: 'Pregnancy Calculator',
        description: 'Estimate your due date.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Last Period Date',
        resultTitle: 'Due Date',
        content: { what: 'Estimates baby due date.', how: 'Enter the first day of your last period.', formula: 'LMP + 280 days' },
        faq: []
    },
    'tdee-calculator': {
        id: 'tdee-calculator',
        title: 'TDEE Calculator',
        description: 'Total Daily Energy Expenditure estimator.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Stats & Activity',
        resultTitle: 'TDEE',
        content: { what: 'Calculates total calories burned per day.', how: 'Enter body stats and activity level.', formula: 'BMR * Activity Factor' },
        faq: []
    },
    'macro-calculator': {
        id: 'macro-calculator',
        title: 'Macro Calculator',
        description: 'Calculate optimal macronutrient split.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Diet Goals',
        resultTitle: 'Macros (P/C/F)',
        content: { what: 'Determines protein, carb, and fat intake.', how: 'Enter calorie goal and diet preference.', formula: 'Percentage split of total calories.' },
        faq: []
    },
    'one-rep-max-calculator': {
        id: 'one-rep-max-calculator',
        title: 'One Rep Max Calculator',
        description: 'Estimate your 1RM for lifting.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Lift Stats',
        resultTitle: 'One Rep Max',
        content: { what: 'Estimates maximum weight for one repetition.', how: 'Enter weight lifted and reps performed.', formula: 'Epley Formula' },
        faq: []
    },
    'bac-calculator': {
        id: 'bac-calculator',
        title: 'BAC Calculator',
        description: 'Estimate Blood Alcohol Content.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Drink Details',
        resultTitle: 'Estimated BAC',
        content: { what: 'Estimates blood alcohol level.', how: 'Enter weight, gender, drinks, and time.', formula: 'Widmark Formula' },
        faq: []
    },
    'smoking-cost-calculator': {
        id: 'smoking-cost-calculator',
        title: 'Smoking Cost Calculator',
        description: 'Calculate the financial cost of smoking.',
        category: 'Health',
        categoryLink: '/category/health',
        formTitle: 'Smoking Habits',
        resultTitle: 'Total Cost',
        content: { what: 'Calculates money spent on cigarettes.', how: 'Enter packs per day, cost per pack, and years.', formula: 'Packs * Cost * 365 * Years' },
        faq: []
    },

    // --- Math ---
    'percentage-calculator': {
        id: 'percentage-calculator',
        title: 'Percentage Calculator',
        description: 'Calculate percentages easily.',
        category: 'Math',
        categoryLink: '/category/math',
        formTitle: 'Values',
        resultTitle: 'Result',
        content: { what: 'Solves percentage problems.', how: 'Enter values.', formula: '(Part / Whole) * 100' },
        faq: []
    },
    'binary-calculator': {
        id: 'binary-calculator',
        title: 'Binary Calculator',
        description: 'Convert text/numbers to binary.',
        category: 'Math',
        categoryLink: '/category/math',
        formTitle: 'Decimal Number',
        resultTitle: 'Binary',
        content: { what: 'Converts decimal numbers to binary.', how: 'Enter a number.', formula: 'Base-2 conversion.' },
        faq: []
    },
    'hex-calculator': {
        id: 'hex-calculator',
        title: 'Hex Calculator',
        description: 'Convert numbers to hexadecimal.',
        category: 'Math',
        categoryLink: '/category/math',
        formTitle: 'Decimal Number',
        resultTitle: 'Hexadecimal',
        content: { what: 'Converts decimal numbers to hex.', how: 'Enter a number.', formula: 'Base-16 conversion.' },
        faq: []
    },
    'prime-calculator': {
        id: 'prime-calculator',
        title: 'Prime Number Calculator',
        description: 'Check if a number is prime.',
        category: 'Math',
        categoryLink: '/category/math',
        formTitle: 'Enter Number',
        resultTitle: 'Is Prime?',
        content: { what: 'Checks for primality.', how: 'Enter an integer.', formula: 'Trial division.' },
        faq: []
    },
    'gcf-lcm-calculator': {
        id: 'gcf-lcm-calculator',
        title: 'GCF & LCM Calculator',
        description: 'Find Greatest Common Factor and Least Common Multiple.',
        category: 'Math',
        categoryLink: '/category/math',
        formTitle: 'Enter Numbers',
        resultTitle: 'GCF & LCM',
        content: { what: 'Finds GCF and LCM of two numbers.', how: 'Enter two integers.', formula: 'Euclidean algorithm.' },
        faq: []
    },
    'slope-calculator': {
        id: 'slope-calculator',
        title: 'Slope Calculator',
        description: 'Calculate the slope of a line.',
        category: 'Math',
        categoryLink: '/category/math',
        formTitle: 'Points (x1, y1) & (x2, y2)',
        resultTitle: 'Slope (m)',
        content: { what: 'Calculates slope between two points.', how: 'Enter coordinates.', formula: 'm = (y2 - y1) / (x2 - x1)' },
        faq: []
    },

    // --- Geometry ---
    'circle-calculator': {
        id: 'circle-calculator',
        title: 'Circle Calculator',
        description: 'Calculate area and circumference.',
        category: 'Geometry',
        categoryLink: '/category/geometry',
        formTitle: 'Radius',
        resultTitle: 'Area & Circumference',
        content: { what: 'Calculates circle properties.', how: 'Enter radius.', formula: 'A = πr², C = 2πr' },
        faq: []
    },
    'triangle-calculator': {
        id: 'triangle-calculator',
        title: 'Triangle Calculator',
        description: 'Calculate area and perimeter.',
        category: 'Geometry',
        categoryLink: '/category/geometry',
        formTitle: 'Base and Height',
        resultTitle: 'Area',
        content: { what: 'Calculates triangle area.', how: 'Enter base and height.', formula: 'A = 0.5 * b * h' },
        faq: []
    },
    'pythagorean-calculator': {
        id: 'pythagorean-calculator',
        title: 'Pythagorean Theorem Calculator',
        description: 'Calculate the hypotenuse.',
        category: 'Geometry',
        categoryLink: '/category/geometry',
        formTitle: 'Sides A and B',
        resultTitle: 'Hypotenuse C',
        content: { what: 'Calculates the third side of a right triangle.', how: 'Enter two legs.', formula: 'a² + b² = c²' },
        faq: []
    },
    'tile-calculator': {
        id: 'tile-calculator',
        title: 'Tile Calculator',
        description: 'Estimate tiles needed for a room.',
        category: 'Construction',
        categoryLink: '/category/construction',
        formTitle: 'Room Dimensions',
        resultTitle: 'Tiles Needed',
        content: { what: 'Estimates tiles required.', how: 'Enter room area and tile size.', formula: 'Area / Tile Area' },
        faq: []
    },
    'paint-calculator': {
        id: 'paint-calculator',
        title: 'Paint Calculator',
        description: 'Estimate paint gallons needed.',
        category: 'Construction',
        categoryLink: '/category/construction',
        formTitle: 'Wall Area',
        resultTitle: 'Gallons Needed',
        content: { what: 'Estimates paint required.', how: 'Enter wall dimensions.', formula: 'Area / Coverage per Gallon' },
        faq: []
    },
    'wallpaper-calculator': {
        id: 'wallpaper-calculator',
        title: 'Wallpaper Calculator',
        description: 'Estimate wallpaper rolls needed.',
        category: 'Construction',
        categoryLink: '/category/construction',
        formTitle: 'Wall Dimensions',
        resultTitle: 'Rolls Needed',
        content: { what: 'Estimates wallpaper rolls.', how: 'Enter wall area and roll coverage.', formula: 'Area / Roll Area' },
        faq: []
    },
    'concrete-calculator': {
        id: 'concrete-calculator',
        title: 'Concrete Calculator',
        description: 'Estimate concrete bags needed for your project.',
        category: 'Construction',
        categoryLink: '/category/geometry',
        formTitle: 'Project Dimensions',
        resultTitle: 'Concrete Needed',
        content: { 
            what: 'Calculates the amount of concrete needed for slabs, footings, or other projects.', 
            how: 'Enter length, width, and depth in feet.', 
            formula: 'Volume (cu ft) = L × W × D; Bags = Volume / 0.45 (80lb bag coverage)' 
        },
        faq: [
            { question: 'How much does one bag of concrete cover?', answer: 'An 80-pound bag of concrete mix yields approximately 0.6 cubic feet when mixed.' }
        ]
    },

    // --- Conversion ---
    'currency-converter': {
        id: 'currency-converter',
        title: 'Currency Converter',
        description: 'Convert between major world currencies.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Currency',
        resultTitle: 'Result',
        content: { what: 'Converts currencies.', how: 'Select currencies and amount.', formula: 'Exchange Rate' },
        faq: []
    },
    'length-converter': {
        id: 'length-converter',
        title: 'Length Converter',
        description: 'Convert between different units of length.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Length',
        resultTitle: 'Result',
        content: { what: 'Converts length units.', how: 'Select units and value.', formula: 'Unit factors' },
        faq: []
    },
    'weight-converter': {
        id: 'weight-converter',
        title: 'Weight Converter',
        description: 'Convert kg, lbs, oz, and more.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Weight',
        resultTitle: 'Result',
        content: { what: 'Converts weight units.', how: 'Select units and value.', formula: 'Unit factors' },
        faq: []
    },
    'temperature-converter': {
        id: 'temperature-converter',
        title: 'Temperature Converter',
        description: 'Convert Celsius, Fahrenheit, Kelvin.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Temp',
        resultTitle: 'Result',
        content: { what: 'Converts temperature scales.', how: 'Enter temperature.', formula: 'C to F: (C * 9/5) + 32' },
        faq: []
    },
    'speed-converter': {
        id: 'speed-converter',
        title: 'Speed Converter',
        description: 'Convert mph, km/h, m/s.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Speed',
        resultTitle: 'Result',
        content: { what: 'Converts speed units.', how: 'Select units.', formula: 'Unit factors' },
        faq: []
    },
    'volume-converter': {
        id: 'volume-converter',
        title: 'Volume Converter',
        description: 'Convert liters, gallons, cups.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Volume',
        resultTitle: 'Result',
        content: { what: 'Converts volume units.', how: 'Select units.', formula: 'Unit factors' },
        faq: []
    },
    'area-converter': {
        id: 'area-converter',
        title: 'Area Converter',
        description: 'Convert sq ft, sq meters, acres.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Area',
        resultTitle: 'Result',
        content: { what: 'Converts area units.', how: 'Select units.', formula: 'Unit factors' },
        faq: []
    },

    // --- Everyday ---
    'age-calculator': {
        id: 'age-calculator',
        title: 'Age Calculator',
        description: 'Calculate your exact age.',
        category: 'Everyday',
        categoryLink: '/category/everyday-life',
        formTitle: 'Date of Birth',
        resultTitle: 'Your Age',
        content: { what: 'Calculates age.', how: 'Enter birthdate.', formula: 'Current Date - Birthdate' },
        faq: []
    },
    'date-calculator': {
        id: 'date-calculator',
        title: 'Date Calculator',
        description: 'Calculate days between dates.',
        category: 'Everyday',
        categoryLink: '/category/everyday-life',
        formTitle: 'Start and End Date',
        resultTitle: 'Duration',
        content: { what: 'Calculates duration between dates.', how: 'Enter two dates.', formula: 'Date2 - Date1' },
        faq: []
    },
    'tip-calculator': {
        id: 'tip-calculator',
        title: 'Tip Calculator',
        description: 'Calculate gratuity and split bills.',
        category: 'Everyday',
        categoryLink: '/category/everyday-life',
        formTitle: 'Bill Details',
        resultTitle: 'Total & Tip',
        content: { what: 'Calculates tip.', how: 'Enter bill amount and percentage.', formula: 'Bill * %' },
        faq: []
    },
    'gas-mileage-calculator': {
        id: 'gas-mileage-calculator',
        title: 'Gas Mileage Calculator',
        description: 'Calculate MPG and fuel costs.',
        category: 'Everyday',
        categoryLink: '/category/everyday-life',
        formTitle: 'Trip Details',
        resultTitle: 'MPG',
        content: { what: 'Calculates fuel efficiency.', how: 'Enter distance and gas used.', formula: 'Miles / Gallons' },
        faq: []
    },
    'travel-time-calculator': {
        id: 'travel-time-calculator',
        title: 'Travel Time Calculator',
        description: 'Estimate arrival time based on speed.',
        category: 'Everyday',
        categoryLink: '/category/everyday-life',
        formTitle: 'Distance and Speed',
        resultTitle: 'Time Required',
        content: { what: 'Estimates travel duration.', how: 'Enter distance and speed.', formula: 'Distance / Speed' },
        faq: []
    },
    'time-zone-converter': {
        id: 'time-zone-converter',
        title: 'Time Zone Converter',
        description: 'Convert time between cities.',
        category: 'Everyday',
        categoryLink: '/category/everyday-life',
        formTitle: 'Select Cities',
        resultTitle: 'Converted Time',
        content: { what: 'Converts time zones.', how: 'Select locations.', formula: 'UTC offset difference.' },
        faq: []
    },
    'grade-calculator': {
        id: 'grade-calculator',
        title: 'Grade Calculator',
        description: 'Calculate your class grade.',
        category: 'Everyday',
        categoryLink: '/category/everyday-life',
        formTitle: 'Scores and Weights',
        resultTitle: 'Final Grade',
        content: { what: 'Calculates weighted average grade.', how: 'Enter scores and weights.', formula: 'Sum(Score * Weight)' },
        faq: []
    },

    // --- Science ---
    'dna-replication': {
        id: 'dna-replication',
        title: 'DNA Replication Calculator',
        description: 'Simulate DNA replication processes.',
        category: 'Biology',
        categoryLink: '/category/biology',
        formTitle: 'DNA Sequence',
        resultTitle: 'Complementary Strand',
        content: { what: 'Generates complementary DNA strand.', how: 'Enter DNA sequence (A,T,C,G).', formula: 'A<->T, C<->G' },
        faq: []
    },
    'allele-frequency': {
        id: 'allele-frequency',
        title: 'Allele Frequency Calculator',
        description: 'Calculate allele frequencies.',
        category: 'Biology',
        categoryLink: '/category/biology',
        formTitle: 'Population Numbers',
        resultTitle: 'Frequencies',
        content: { what: 'Calculates allele frequencies.', how: 'Enter genotype counts.', formula: 'Hardy-Weinberg Principle' },
        faq: []
    },
    'molarity-calculator': {
        id: 'molarity-calculator',
        title: 'Molarity Calculator',
        description: 'Calculate the molarity of a solution.',
        category: 'Chemistry',
        categoryLink: '/category/chemistry',
        formTitle: 'Solute and Volume',
        resultTitle: 'Molarity',
        content: { what: 'Calculates concentration.', how: 'Enter moles and liters.', formula: 'M = mol / L' },
        faq: []
    },
    'ph-calculator': {
        id: 'ph-calculator',
        title: 'pH Calculator',
        description: 'Determine the pH level.',
        category: 'Chemistry',
        categoryLink: '/category/chemistry',
        formTitle: 'H+ Concentration',
        resultTitle: 'pH Level',
        content: { what: 'Calculates pH.', how: 'Enter hydrogen ion concentration.', formula: 'pH = -log[H+]' },
        faq: []
    },
    'velocity-calculator': {
        id: 'velocity-calculator',
        title: 'Velocity Calculator',
        description: 'Calculate speed, distance, or time.',
        category: 'Physics',
        categoryLink: '/category/physics',
        formTitle: 'Motion Parameters',
        resultTitle: 'Velocity',
        content: { what: 'Calculates velocity.', how: 'Enter distance and time.', formula: 'v = d / t' },
        faq: []
    },
    'pace-calculator': {
        id: 'pace-calculator',
        title: 'Pace Calculator',
        description: 'Calculate running pace.',
        category: 'Sports',
        categoryLink: '/category/sports',
        formTitle: 'Distance and Time',
        resultTitle: 'Pace',
        content: { what: 'Calculates running pace.', how: 'Enter distance and time.', formula: 'Time / Distance' },
        faq: []
    },
    'standard-deviation': {
        id: 'standard-deviation',
        title: 'Standard Deviation Calculator',
        description: 'Calculate variance and standard deviation.',
        category: 'Statistics',
        categoryLink: '/category/statistics',
        formTitle: 'Data Set',
        resultTitle: 'Std Dev & Variance',
        content: { what: 'Calculates statistical dispersion.', how: 'Enter numbers separated by commas.', formula: 'Standard deviation formula.' },
        faq: []
    },
    'random-number': {
        id: 'random-number',
        title: 'Random Number Generator',
        description: 'Generate random numbers.',
        category: 'Other',
        categoryLink: '/category/other',
        formTitle: 'Range',
        resultTitle: 'Random Number',
        content: { what: 'Generates a random number.', how: 'Enter min and max.', formula: 'Math.random()' },
        faq: []
    },
    'default': {
        id: 'default',
        title: 'Calculator',
        description: 'A useful online calculator.',
        category: 'General',
        categoryLink: '/all-tools',
        formTitle: 'Calculator',
        resultTitle: 'Results',
        content: { what: 'This is a general purpose calculator.', how: 'Enter your values.', formula: 'N/A' },
        faq: []
    }
};
