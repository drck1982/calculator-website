export const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diff = now.getTime() - birth.getTime();
    const ageDate = new Date(diff);
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    return [
        { label: 'Age', value: `${years} Years`, isTotal: true },
        { label: 'Next Birthday', value: 'Coming soon' },
    ];
};

export const calculateDateDiff = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return [
        { label: 'Start Date', value: startStr },
        { label: 'End Date', value: endStr },
        { label: 'Difference', value: `${diffDays} Days`, isTotal: true },
    ];
};

export const calculatePregnancy = (lmpStr: string) => {
    const lmp = new Date(lmpStr);
    const dueDate = new Date(lmp);
    dueDate.setDate(lmp.getDate() + 280);
    return [
        { label: 'Last Period', value: lmpStr },
        { label: 'Estimated Due Date', value: dueDate.toLocaleDateString(), isTotal: true },
    ];
};

export const calculateSleep = (wakeTime: string) => {
    const [hours, minutes] = wakeTime.split(':').map(Number);
    const wakeMinutes = hours * 60 + minutes;

    // Calculate bedtimes (going back 5-6 cycles + 15 min to fall asleep)
    const cycles = [6, 5, 4, 3];
    const bedtimes = cycles.map(c => {
        let bedMinutes = wakeMinutes - (c * 90 + 15);
        if (bedMinutes < 0) bedMinutes += 24 * 60;
        const h = Math.floor(bedMinutes / 60);
        const m = bedMinutes % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    });

    return [
        { label: 'Wake Time', value: wakeTime },
        { label: '6 cycles (9h)', value: bedtimes[0], isTotal: true },
        { label: '5 cycles (7.5h)', value: bedtimes[1] },
        { label: '4 cycles (6h)', value: bedtimes[2] },
        { label: '3 cycles (4.5h)', value: bedtimes[3] },
    ];
};

export const calculatePassword = (length: number, includeSymbols: boolean) => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        password += chars[array[i] % chars.length];
    }

    const entropy = Math.log2(Math.pow(chars.length, length));
    let strength = 'Weak';
    if (entropy >= 128) strength = 'Very Strong';
    else if (entropy >= 60) strength = 'Strong';
    else if (entropy >= 36) strength = 'Moderate';

    return [
        { label: 'Password', value: password, isTotal: true },
        { label: 'Entropy', value: `${entropy.toFixed(1)} bits` },
        { label: 'Strength', value: strength },
    ];
};

export const calculateGasMileage = (distance: number, gas: number) => {
    const mpg = distance / gas;
    const lpk = (235.215 / mpg);
    return [
        { label: 'Distance', value: `${distance} miles` },
        { label: 'Gas Used', value: `${gas} gallons` },
        { label: 'Fuel Economy', value: `${mpg.toFixed(1)} MPG`, isTotal: true },
        { label: 'L/100km', value: `${lpk.toFixed(1)} L` },
    ];
};

export const calculateTravelTime = (distance: number, speed: number) => {
    const time = distance / speed;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return [
        { label: 'Distance', value: `${distance} miles` },
        { label: 'Speed', value: `${speed} mph` },
        { label: 'Travel Time', value: `${hours}h ${minutes}m`, isTotal: true },
    ];
};

export const calculateGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    let letter = 'F';
    if (percentage >= 90) letter = 'A';
    else if (percentage >= 80) letter = 'B';
    else if (percentage >= 70) letter = 'C';
    else if (percentage >= 60) letter = 'D';

    return [
        { label: 'Score', value: `${score}/${total}` },
        { label: 'Percentage', value: `${percentage.toFixed(1)}%`, isTotal: true },
        { label: 'Letter Grade', value: letter },
    ];
};

export const calculateSleepCycles = (wakeTime: string) => {
    const [hours, minutes] = wakeTime.split(':').map(Number);
    const wakeMinutes = hours * 60 + minutes;

    // Calculate bedtimes (going back 5-6 cycles + 15 min to fall asleep)
    const cycles = [6, 5, 4, 3];
    const bedtimes = cycles.map(c => {
        let bedMinutes = wakeMinutes - (c * 90 + 15);
        if (bedMinutes < 0) bedMinutes += 24 * 60;
        const h = Math.floor(bedMinutes / 60);
        const m = bedMinutes % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    });

    return [
        { label: 'Wake Time', value: wakeTime },
        { label: '6 cycles (9h)', value: bedtimes[0], isTotal: true },
        { label: '5 cycles (7.5h)', value: bedtimes[1] },
        { label: '4 cycles (6h)', value: bedtimes[2] },
        { label: '3 cycles (4.5h)', value: bedtimes[3] },
    ];
};

export const calculateTimeZone = (time: string, fromZone: number, toZone: number) => {
    const [hours, minutes] = time.split(':').map(Number);
    let convertedHours = hours + (toZone - fromZone);
    if (convertedHours < 0) convertedHours += 24;
    if (convertedHours >= 24) convertedHours -= 24;

    const convertedTime = `${convertedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return [
        { label: 'Original Time', value: time },
        { label: 'From UTC', value: `UTC${fromZone >= 0 ? '+' : ''}${fromZone}` },
        { label: 'To UTC', value: `UTC${toZone >= 0 ? '+' : ''}${toZone}` },
        { label: 'Converted Time', value: convertedTime, isTotal: true },
    ];
};

export const calculateUnitPrice = (price1: number, quantity1: number, price2: number, quantity2: number) => {
    const unitPrice1 = price1 / quantity1;
    const unitPrice2 = price2 / quantity2;
    const savings = Math.abs(unitPrice1 - unitPrice2) * Math.max(quantity1, quantity2);

    return [
        { label: 'Item 1 Unit Price', value: `$${unitPrice1.toFixed(3)}/unit` },
        { label: 'Item 2 Unit Price', value: `$${unitPrice2.toFixed(3)}/unit` },
        { label: 'Better Deal', value: unitPrice1 < unitPrice2 ? 'Item 1' : 'Item 2', isTotal: true },
        { label: 'Savings', value: `$${savings.toFixed(2)}` },
    ];
};

export const calculateGpa = (gradePoints: number, creditHours: number) => {
    const gpa = creditHours > 0 ? gradePoints / creditHours : 0;

    let standing = 'Academic Probation';
    if (gpa >= 3.7) standing = 'Summa Cum Laude';
    else if (gpa >= 3.5) standing = 'Magna Cum Laude';
    else if (gpa >= 3.0) standing = 'Cum Laude';
    else if (gpa >= 2.0) standing = 'Good Standing';

    return [
        { label: 'Total Grade Points', value: gradePoints },
        { label: 'Credit Hours', value: creditHours },
        { label: 'GPA', value: gpa.toFixed(2), isTotal: true },
        { label: 'Standing', value: standing },
    ];
};

export const calculateGradeNeeded = (currentGrade: number, desiredGrade: number, finalWeight: number) => {
    const weightDecimal = finalWeight / 100;
    const currentWeight = 1 - weightDecimal;
    const requiredScore = (desiredGrade - currentGrade * currentWeight) / weightDecimal;

    return [
        { label: 'Current Grade', value: `${currentGrade}%` },
        { label: 'Desired Grade', value: `${desiredGrade}%` },
        { label: 'Final Weight', value: `${finalWeight}%` },
        { label: 'Required Final Score', value: requiredScore > 100 ? 'Not Possible' : `${requiredScore.toFixed(1)}%`, isTotal: true },
    ];
};

export const calculateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

    return [
        { label: 'Words', value: words, isTotal: true },
        { label: 'Characters', value: characters },
        { label: 'Characters (no spaces)', value: charactersNoSpaces },
        { label: 'Sentences', value: sentences },
        { label: 'Paragraphs', value: paragraphs },
    ];
};

