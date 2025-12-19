export const calculateCircle = (r: number) => {
    return [
        { label: 'Radius', value: r },
        { label: 'Area', value: (Math.PI * r * r).toFixed(2) },
        { label: 'Circumference', value: (2 * Math.PI * r).toFixed(2), isTotal: true },
    ];
};

export const calculateTriangle = (b: number, h: number) => {
    return [
        { label: 'Area', value: (0.5 * b * h).toFixed(2), isTotal: true },
    ];
};

export const calculatePythagorean = (a: number, b: number) => {
    const c = Math.sqrt(a * a + b * b);
    return [
        { label: 'Hypotenuse (c)', value: c.toFixed(2), isTotal: true },
    ];
};

export const calculateTile = (area: number, tileArea: number) => {
    return [
        { label: 'Room Area', value: `${area} sq ft` },
        { label: 'Tiles Needed', value: Math.ceil(area / tileArea * 1.1), isTotal: true }, // +10% waste
    ];
};

export const calculatePaint = (area: number) => {
    const coverage = 350; // sq ft per gallon
    return [
        { label: 'Wall Area', value: `${area} sq ft` },
        { label: 'Gallons Needed', value: Math.ceil(area / coverage), isTotal: true },
    ];
};

export const calculateConcrete = (l: number, w: number, d: number) => {
    const vol = l * w * (d / 12);
    const bags = Math.ceil(vol / 0.6);
    return [
        { label: 'Volume', value: `${vol.toFixed(2)} cu. ft.` },
        { label: '80lb Bags Needed', value: `${bags}`, isTotal: true },
    ];
};

export const calculateWallpaper = (height: number, width: number) => {
    const wallArea = height * width;
    const rollCoverage = 30; // typical roll covers ~30 sq ft
    const rollsNeeded = Math.ceil((wallArea * 1.15) / rollCoverage); // 15% waste
    return [
        { label: 'Wall Area', value: `${wallArea} sq ft` },
        { label: 'Rolls Needed (with 15% waste)', value: `${rollsNeeded}`, isTotal: true },
    ];
};
