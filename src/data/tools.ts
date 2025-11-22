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
            { id: 'ny-tax', name: 'New York Salary Tax Calculator', description: 'Estimate your take-home pay in NY.', link: '/tools/ny-salary-tax-calculator', tags: ['Salary', 'Tax'] },
            { id: 'hourly', name: 'Hourly to Salary Converter', description: 'Convert hourly wage to annual salary.', link: '/tools/hourly-to-salary', tags: ['Salary'] },
            { id: 'bonus', name: 'Bonus Tax Calculator', description: 'Calculate taxes on your bonus.', link: '/tools/bonus-tax-calculator', tags: ['Tax'] },
            { id: 'fed-tax', name: 'Federal Income Tax Calculator', description: 'Estimate your federal tax liability.', link: '/tools/federal-tax-calculator', tags: ['Tax'] },
        ]
    },
    'loans-debt': {
        title: 'Loans & Debt Calculators',
        description: 'Plan your loan payments and debt payoff strategies. Use our tools to compare loan options and save on interest.',
        tools: [
            { id: 'mortgage', name: 'Mortgage Calculator', description: 'Calculate monthly mortgage payments.', link: '/tools/mortgage-calculator', tags: ['Mortgage'] },
            { id: 'auto', name: 'Auto Loan Calculator', description: 'Estimate car loan payments.', link: '/tools/auto-loan-calculator', tags: ['Auto'] },
            { id: 'amortization', name: 'Amortization Calculator', description: 'View your loan amortization schedule.', link: '/tools/amortization-calculator', tags: ['Loan'] },
        ]
    },
    'investment': {
        title: 'Investment Calculators',
        description: 'Track your investment growth and plan for retirement. See the power of compound interest.',
        tools: [
            { id: 'compound', name: 'Compound Interest Calculator', description: 'Calculate investment growth over time.', link: '/tools/compound-interest-calculator', tags: ['Investment'] },
            { id: '401k', name: '401(k) Calculator', description: 'Estimate your 401(k) balance at retirement.', link: '/tools/401k-calculator', tags: ['Retirement'] },
            { id: 'inflation', name: 'Inflation Calculator', description: 'Calculate the changing value of money over time.', link: '/tools/inflation-calculator', tags: ['Finance'] },
        ]
    },
    'biology': {
        title: 'Biology Calculators',
        description: 'Explore the science of life with our biology calculators. From genetics to cell biology.',
        tools: [
            { id: 'dna', name: 'DNA Replication Calculator', description: 'Simulate DNA replication processes.', link: '/tools/dna-replication', tags: ['Genetics'] },
            { id: 'allele', name: 'Allele Frequency Calculator', description: 'Calculate allele frequencies in a population.', link: '/tools/allele-frequency', tags: ['Genetics'] },
        ]
    },
    'chemistry': {
        title: 'Chemistry Calculators',
        description: 'Solve chemical equations and calculate properties with ease.',
        tools: [
            { id: 'molarity', name: 'Molarity Calculator', description: 'Calculate the molarity of a solution.', link: '/tools/molarity-calculator', tags: ['Chemistry'] },
            { id: 'ph', name: 'pH Calculator', description: 'Determine the pH level of a solution.', link: '/tools/ph-calculator', tags: ['Chemistry'] },
        ]
    },
    'construction': {
        title: 'Construction Calculators',
        description: 'Estimate materials and costs for your construction projects.',
        tools: [
            { id: 'concrete', name: 'Concrete Calculator', description: 'Estimate concrete bags needed for a slab.', link: '/tools/concrete-calculator', tags: ['Construction'] },
            { id: 'drywall', name: 'Drywall Calculator', description: 'Calculate drywall sheets required.', link: '/tools/drywall-calculator', tags: ['Construction'] },
        ]
    },
    'conversion': {
        title: 'Conversion Calculators',
        description: 'Convert between different units of measurement quickly and accurately.',
        tools: [
            { id: 'currency', name: 'Currency Converter', description: 'Real-time currency exchange rates.', link: '/tools/currency-converter', tags: ['Money'] },
            { id: 'length', name: 'Length Converter', description: 'Convert meters, feet, inches, and more.', link: '/tools/length-converter', tags: ['Conversion'] },
            { id: 'weight', name: 'Weight Converter', description: 'Convert kg, lbs, oz, and more.', link: '/tools/weight-converter', tags: ['Conversion'] },
        ]
    },
    'ecology': {
        title: 'Ecology Calculators',
        description: 'Understand environmental impact and ecological dynamics.',
        tools: [
            { id: 'carbon', name: 'Carbon Footprint Calculator', description: 'Estimate your annual carbon emissions.', link: '/tools/carbon-footprint', tags: ['Ecology'] },
        ]
    },
    'everyday-life': {
        title: 'Everyday Life Calculators',
        description: 'Useful tools for daily tasks and planning.',
        tools: [
            { id: 'age', name: 'Age Calculator', description: 'Calculate your exact age in years, months, and days.', link: '/tools/age-calculator', tags: ['Life'] },
            { id: 'date', name: 'Date Calculator', description: 'Calculate days between dates.', link: '/tools/date-calculator', tags: ['Life'] },
            { id: 'tip', name: 'Tip Calculator', description: 'Calculate gratuity and split bills.', link: '/tools/tip-calculator', tags: ['Money'] },
        ]
    },
    'food': {
        title: 'Food & Cooking Calculators',
        description: 'Kitchen helpers for cooking, baking, and nutrition.',
        tools: [
            { id: 'recipe', name: 'Recipe Scaler', description: 'Scale ingredients for different serving sizes.', link: '/tools/recipe-scaler', tags: ['Cooking'] },
        ]
    },
    'health': {
        title: 'Health & Fitness Calculators',
        description: 'Monitor your health and fitness goals.',
        tools: [
            { id: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index.', link: '/tools/bmi-calculator', tags: ['Health'] },
            { id: 'calories', name: 'Calorie Calculator', description: 'Estimate daily calorie needs.', link: '/tools/calorie-calculator', tags: ['Fitness'] },
            { id: 'pregnancy', name: 'Pregnancy Calculator', description: 'Estimate your due date.', link: '/tools/pregnancy-calculator', tags: ['Health'] },
        ]
    },
    'math': {
        title: 'Math Calculators',
        description: 'Solve mathematical problems from algebra to geometry.',
        tools: [
            { id: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily.', link: '/tools/percentage-calculator', tags: ['Math'] },
        ]
    },
    'physics': {
        title: 'Physics Calculators',
        description: 'Calculate forces, motion, energy, and more.',
        tools: [
            { id: 'velocity', name: 'Velocity Calculator', description: 'Calculate speed, distance, or time.', link: '/tools/velocity-calculator', tags: ['Physics'] },
        ]
    },
    'sports': {
        title: 'Sports Calculators',
        description: 'Tools for athletes and sports enthusiasts.',
        tools: [
            { id: 'pace', name: 'Pace Calculator', description: 'Calculate running pace and splits.', link: '/tools/pace-calculator', tags: ['Running'] },
        ]
    },
    'statistics': {
        title: 'Statistics Calculators',
        description: 'Analyze data and calculate statistical probabilities.',
        tools: [
            { id: 'std-dev', name: 'Standard Deviation Calculator', description: 'Calculate variance and standard deviation.', link: '/tools/standard-deviation', tags: ['Stats'] },
        ]
    },
    'other': {
        title: 'Other Calculators',
        description: 'Miscellaneous tools for various needs.',
        tools: [
            { id: 'random', name: 'Random Number Generator', description: 'Generate random numbers within a range.', link: '/tools/random-number', tags: ['Tools'] },
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
    'ny-salary-tax-calculator': {
        id: 'ny-salary-tax-calculator',
        title: 'New York Salary Tax Calculator',
        description: 'Calculate your net pay in New York.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Enter Your Salary',
        resultTitle: 'Your Net Pay',
        content: {
            what: 'This calculator helps you estimate your take-home pay.',
            how: 'Enter your gross salary and select your filing status.',
            formula: 'Net Pay = Gross Pay - Taxes'
        },
        faq: [
            { question: 'How accurate is this?', answer: 'It provides an estimate based on current tax brackets.' }
        ]
    },
    'currency-converter': {
        id: 'currency-converter',
        title: 'Currency Converter',
        description: 'Convert between major world currencies with real-time exchange rates.',
        category: 'Finance',
        categoryLink: '/category/finance',
        formTitle: 'Convert Currency',
        resultTitle: 'Conversion Result',
        content: {
            what: 'Convert amounts between different currencies.',
            how: 'Select source and target currencies and enter the amount.',
            formula: 'Amount * Exchange Rate'
        },
        faq: []
    },
    'length-converter': {
        id: 'length-converter',
        title: 'Length Converter',
        description: 'Convert between different units of length.',
        category: 'Conversion',
        categoryLink: '/category/conversion',
        formTitle: 'Convert Length',
        resultTitle: 'Conversion Result',
        content: {
            what: 'Convert length measurements.',
            how: 'Select units and enter value.',
            formula: 'Unit conversion factors'
        },
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
        content: {
            what: 'This is a general purpose calculator.',
            how: 'Enter your values.',
            formula: 'N/A'
        },
        faq: []
    }
};
