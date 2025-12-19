export const calculateBmi = (heightCm: number, weightKg: number) => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let category = 'Underweight';
    if (bmi >= 18.5 && bmi < 25) category = 'Normal Weight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';
    return [
        { label: 'Height', value: `${heightCm} cm` },
        { label: 'Weight', value: `${weightKg} kg` },
        { label: 'BMI Score', value: bmi.toFixed(1), isTotal: true },
        { label: 'Category', value: category },
    ];
};

export const calculateCalories = (age: number, heightCm: number, weightKg: number) => {
    // Mifflin-St Jeor Equation for Male (default)
    const bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    const sedentary = bmr * 1.2;
    const moderate = bmr * 1.55;
    const active = bmr * 1.725;
    return [
        { label: 'BMR (Basal)', value: `${Math.round(bmr)} kcal` },
        { label: 'Sedentary', value: `${Math.round(sedentary)} kcal` },
        { label: 'Moderate Activity', value: `${Math.round(moderate)} kcal`, isTotal: true },
        { label: 'Very Active', value: `${Math.round(active)} kcal` },
    ];
};

export const calculateBodyFat = (height: number, waist: number, neck: number, hip: number, gender: string) => {
    let bodyFat: number;
    if (gender === 'female' && hip > 0) {
        bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    } else {
        bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    }
    bodyFat = Math.max(0, Math.min(60, bodyFat));

    let category = '';
    if (gender === 'male') {
        if (bodyFat < 6) category = 'Essential Fat';
        else if (bodyFat < 14) category = 'Athletes';
        else if (bodyFat < 18) category = 'Fitness';
        else if (bodyFat < 25) category = 'Average';
        else category = 'Obese';
    } else {
        if (bodyFat < 14) category = 'Essential Fat';
        else if (bodyFat < 21) category = 'Athletes';
        else if (bodyFat < 25) category = 'Fitness';
        else if (bodyFat < 32) category = 'Average';
        else category = 'Obese';
    }

    return [
        { label: 'Body Fat %', value: `${bodyFat.toFixed(1)}%`, isTotal: true },
        { label: 'Category', value: category },
        { label: 'Fat Mass', value: `~${((bodyFat / 100) * 180).toFixed(1)} lbs` }, // Assuming 180lb as default for mass calc if weight not provided
        { label: 'Lean Mass', value: `~${(180 - (bodyFat / 100) * 180).toFixed(1)} lbs` },
    ];
};

export const calculateIdealWeight = (heightInches: number, gender: string) => {
    const feet = Math.floor(heightInches / 12);
    const inches = heightInches % 12;
    const inchesOver5ft = heightInches - 60;

    let devine, robinson, miller, hamwi;
    if (gender === 'male') {
        devine = 50 + 2.3 * inchesOver5ft;
        robinson = 52 + 1.9 * inchesOver5ft;
        miller = 56.2 + 1.41 * inchesOver5ft;
        hamwi = 48 + 2.7 * inchesOver5ft;
    } else {
        devine = 45.5 + 2.3 * inchesOver5ft;
        robinson = 49 + 1.7 * inchesOver5ft;
        miller = 53.1 + 1.36 * inchesOver5ft;
        hamwi = 45.5 + 2.2 * inchesOver5ft;
    }
    const avgKg = (devine + robinson + miller + hamwi) / 4;
    const avgLbs = avgKg * 2.205;

    return [
        { label: 'Height', value: `${feet}'${inches}"` },
        { label: 'Devine Formula', value: `${(devine * 2.205).toFixed(0)} lbs` },
        { label: 'Robinson Formula', value: `${(robinson * 2.205).toFixed(0)} lbs` },
        { label: 'Miller Formula', value: `${(miller * 2.205).toFixed(0)} lbs` },
        { label: 'Average Ideal Weight', value: `${avgLbs.toFixed(0)} lbs`, isTotal: true },
    ];
};

export const calculateWaterIntake = (weightLbs: number, activityLevel: string) => {
    const activityMultipliers: Record<string, number> = {
        sedentary: 0.5,
        light: 0.6,
        moderate: 0.7,
        active: 0.8,
        athlete: 1.0
    };

    const baseOz = weightLbs * (activityMultipliers[activityLevel] || 0.7);
    const liters = baseOz * 0.0296;
    const glasses = Math.ceil(baseOz / 8);

    return [
        { label: 'Daily Water', value: `${baseOz.toFixed(0)} oz`, isTotal: true },
        { label: 'In Liters', value: `${liters.toFixed(1)} L` },
        { label: '8oz Glasses', value: `${glasses} glasses` },
    ];
};

export const calculateTdee = (bmr: number, activityLevel: string) => {
    const multipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        athlete: 1.9
    };
    const tdee = bmr * (multipliers[activityLevel] || 1.2);
    return [
        { label: 'Maintenance Calories', value: `${Math.round(tdee)} kcal`, isTotal: true },
        { label: 'Lose 0.5kg/week', value: `${Math.round(tdee - 500)} kcal` },
        { label: 'Gain 0.5kg/week', value: `${Math.round(tdee + 500)} kcal` },
    ];
};

export const calculateMacros = (calories: number, goal: string) => {
    let p, f, c; // percentages
    if (goal === 'weight-loss') { p = 40; f = 30; c = 30; }
    else if (goal === 'muscle-gain') { p = 30; f = 20; c = 50; }
    else { p = 25; f = 25; c = 50; } // maintenance

    const pG = (calories * (p / 100)) / 4;
    const fG = (calories * (f / 100)) / 9;
    const cG = (calories * (c / 100)) / 4;

    return [
        { label: 'Protein', value: `${Math.round(pG)}g (${p}%)`, isTotal: true },
        { label: 'Fats', value: `${Math.round(fG)}g (${f}%)` },
        { label: 'Carbs', value: `${Math.round(cG)}g (${c}%)` },
    ];
};

export const calculateOneRepMax = (weight: number, reps: number) => {
    // Epley Formula
    const orm = weight * (1 + reps / 30);
    return [
        { label: 'Estimated 1RM', value: `${Math.round(orm)} lbs`, isTotal: true },
        { label: '90% of 1RM', value: `${Math.round(orm * 0.9)} lbs` },
        { label: '80% of 1RM', value: `${Math.round(orm * 0.8)} lbs` },
    ];
};

export const calculateBac = (drinks: number, weightLbs: number, hours: number, gender: string) => {
    const r = gender === 'male' ? 0.73 : 0.66;
    const bac = (drinks * 0.6 * 5.14) / (weightLbs * r) - 0.015 * hours;
    return [
        { label: 'Estimated BAC', value: `${Math.max(0, bac).toFixed(3)}%`, isTotal: true },
        { label: 'Status', value: bac < 0.08 ? 'Under Legal Limit' : 'Over Legal Limit (0.08%)' },
    ];
};

export const calculateSmokingCost = (packsPerDay: number, packPrice: number, years: number) => {
    const daily = packsPerDay * packPrice;
    const annual = daily * 365;
    const total = annual * years;
    return [
        { label: 'Daily Cost', value: `$${daily.toFixed(2)}` },
        { label: 'Annual Cost', value: `$${annual.toLocaleString()}` },
        { label: `Total Over ${years} Years`, value: `$${total.toLocaleString()}`, isTotal: true },
    ];
};

