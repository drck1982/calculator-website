import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const envFiles = ['.env.local', '.env.production.local', '.env'];

const readEnvFile = (filePath) => {
    if (!fs.existsSync(filePath)) return {};

    return Object.fromEntries(
        fs.readFileSync(filePath, 'utf8')
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line && !line.startsWith('#') && line.includes('='))
            .map((line) => {
                const index = line.indexOf('=');
                return [line.slice(0, index), line.slice(index + 1).replace(/^["']|["']$/g, '')];
            })
    );
};

const localEnv = envFiles.reduce(
    (acc, file) => ({ ...acc, ...readEnvFile(path.join(root, file)) }),
    {}
);

const getValue = (key) => localEnv[key] || process.env[key] || '';
const hasValue = (key) => getValue(key).trim().length > 0;

const checks = [
    { key: 'VITE_SITE_URL', label: 'Canonical site URL', required: true },
    { key: 'VITE_ADSENSE_CLIENT_ID', label: 'AdSense publisher ID', required: true },
    { key: 'VITE_GOOGLE_ANALYTICS_ID', label: 'GA4 measurement ID', required: true },
    { key: 'VITE_CLARITY_PROJECT_ID', label: 'Microsoft Clarity project ID', required: false },
    { key: 'VITE_AD_SLOT_CALC_TOP', label: 'Calculator top ad slot', required: true },
    { key: 'VITE_AD_SLOT_CALC_SIDEBAR', label: 'Calculator sidebar ad slot', required: true },
    { key: 'VITE_AD_SLOT_IN_CONTENT_1', label: 'In-content ad slot 1', required: true },
    { key: 'VITE_AD_SLOT_IN_CONTENT_2', label: 'In-content ad slot 2', required: true },
    { key: 'VITE_AD_SLOT_HOME_TOP', label: 'Home top ad slot', required: false },
    { key: 'VITE_AD_SLOT_CATEGORY_TOP', label: 'Category top ad slot', required: false },
    { key: 'VITE_AFFILIATE_MORTGAGE_URL', label: 'Mortgage affiliate URL', required: false },
    { key: 'VITE_AFFILIATE_REFINANCE_URL', label: 'Refinance affiliate URL', required: false },
    { key: 'VITE_AFFILIATE_DEBT_URL', label: 'Debt affiliate URL', required: false },
    { key: 'VITE_AFFILIATE_SAVINGS_URL', label: 'Savings affiliate URL', required: false },
    { key: 'VITE_AFFILIATE_INVESTING_URL', label: 'Investing affiliate URL', required: false },
];

const rows = checks.map((check) => ({
    ...check,
    ok: hasValue(check.key),
}));

const requiredMissing = rows.filter((row) => row.required && !row.ok);
const optionalMissing = rows.filter((row) => !row.required && !row.ok);
const affiliateCount = rows.filter((row) => row.key.startsWith('VITE_AFFILIATE_') && row.key.endsWith('_URL') && row.ok).length;

console.log('\nMonetization readiness audit\n');
for (const row of rows) {
    const icon = row.ok ? 'OK ' : row.required ? 'MISS' : 'TODO';
    console.log(`${icon}  ${row.label.padEnd(32)} ${row.key}`);
}

console.log('\nSummary');
console.log(`Required missing: ${requiredMissing.length}`);
console.log(`Optional missing: ${optionalMissing.length}`);
console.log(`Affiliate offer URLs configured: ${affiliateCount}`);

if (requiredMissing.length > 0) {
    console.log('\nAdd required values in .env.local for local testing and in Vercel Project Settings for production.');
    process.exitCode = 1;
}
