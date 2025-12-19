export const calculateDnaReplication = (sequence: string) => {
    const cleanSeq = sequence.toUpperCase().replace(/[^ATCG]/g, '');
    if (cleanSeq.length > 0) {
        const complement = cleanSeq.split('').map(base => {
            switch (base) {
                case 'A': return 'T';
                case 'T': return 'A';
                case 'C': return 'G';
                case 'G': return 'C';
                default: return '';
            }
        }).join('');
        return [
            { label: 'Original Strand', value: cleanSeq.slice(0, 30) + (cleanSeq.length > 30 ? '...' : '') },
            { label: 'Complementary Strand', value: complement.slice(0, 30) + (complement.length > 30 ? '...' : ''), isTotal: true },
            { label: 'Length', value: `${cleanSeq.length} bases` },
        ];
    }
    return [{ label: 'Error', value: 'Enter valid DNA sequence (A, T, C, G)' }];
};

export const calculateAlleleFrequency = (AA: number, Aa: number, aa: number) => {
    const total = AA + Aa + aa;
    if (total > 0) {
        const pA = (2 * AA + Aa) / (2 * total);
        const pa = (2 * aa + Aa) / (2 * total);
        return [
            { label: 'Total Population', value: `${total}` },
            { label: 'Frequency of A (p)', value: pA.toFixed(4), isTotal: true },
            { label: 'Frequency of a (q)', value: pa.toFixed(4) },
            { label: 'p + q', value: (pA + pa).toFixed(4) },
        ];
    }
    return [{ label: 'Error', value: 'Enter genotype counts' }];
};

export const calculateMolarity = (moles: number, liters: number) => {
    const molarity = moles / liters;
    return [
        { label: 'Moles of Solute', value: `${moles} mol` },
        { label: 'Volume', value: `${liters} L` },
        { label: 'Molarity', value: `${molarity.toFixed(4)} M`, isTotal: true },
    ];
};

export const calculatePh = (val: number, type: string = 'pH') => {
    let pH = val;
    let pOH = 14 - val;

    if (type === 'pOH') {
        pH = 14 - val;
        pOH = val;
    }

    let acidity = 'Neutral';
    if (pH < 7) acidity = 'Acidic';
    else if (pH > 7) acidity = 'Basic (Alkaline)';

    return [
        { label: 'pH Level', value: pH.toFixed(2), isTotal: true },
        { label: 'pOH Level', value: pOH.toFixed(2) },
        { label: 'Nature', value: acidity },
    ];
};


export const calculateVelocity = (distance: number, time: number) => {
    const velocity = distance / time;
    return [
        { label: 'Distance', value: `${distance} m` },
        { label: 'Time', value: `${time} s` },
        { label: 'Velocity', value: `${velocity.toFixed(2)} m/s`, isTotal: true },
    ];
};

export const calculatePace = (distance: number, timeMin: number) => {
    const pace = timeMin / distance;
    const speed = distance / (timeMin / 60);
    return [
        { label: 'Distance', value: `${distance} km` },
        { label: 'Time', value: `${timeMin} min` },
        { label: 'Pace', value: `${pace.toFixed(2)} min/km`, isTotal: true },
        { label: 'Speed', value: `${speed.toFixed(2)} km/h` },
    ];
};
