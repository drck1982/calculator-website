import type { ToolSummary } from './tools';

/**
 * High-intent tools first (search volume / business value). Used to rank Hero + All Tools search.
 * IDs must match `tools.ts` tool `id` fields.
 */
export const SEARCH_PRIORITY_TOOL_IDS: readonly string[] = [
    'paycheck-calculator',
    'mortgage-calculator',
    'bmi-calculator',
    'tip-calculator',
    'compound-interest-calculator',
    'gpa-calculator',
    'student-loan-calculator',
    'federal-tax-calculator',
    'ny-salary-tax-calculator',
    'credit-card-payoff',
    '401k-calculator',
    'inflation-calculator',
    'rent-vs-buy-calculator',
    'home-affordability',
    'hourly-to-salary',
    'age-calculator',
    'percentage-calculator',
    'currency-converter',
    'password-generator',
    'calorie-calculator',
];

const priorityRank = new Map(SEARCH_PRIORITY_TOOL_IDS.map((id, i) => [id, i]));

function matchScore(tool: ToolSummary, q: string): number {
    const name = tool.name.toLowerCase();
    const desc = tool.description.toLowerCase();
    const tags = tool.tags.map((t) => t.toLowerCase());
    let score = 0;
    if (name === q) score += 200;
    else if (name.startsWith(q)) score += 120;
    else if (name.includes(q)) score += 80;
    if (desc.includes(q)) score += 40;
    if (tags.some((t) => t.includes(q) || q.includes(t))) score += 25;
    return score;
}

/** Higher score sorts first. */
export function compareToolsForSearch(a: ToolSummary, b: ToolSummary, query: string): number {
    const q = query.trim().toLowerCase();
    if (!q) return 0;

    const pa = priorityRank.has(a.id) ? SEARCH_PRIORITY_TOOL_IDS.length - (priorityRank.get(a.id) as number) : 0;
    const pb = priorityRank.has(b.id) ? SEARCH_PRIORITY_TOOL_IDS.length - (priorityRank.get(b.id) as number) : 0;

    const sa = pa * 50 + matchScore(a, q);
    const sb = pb * 50 + matchScore(b, q);
    if (sb !== sa) return sb - sa;
    return a.name.localeCompare(b.name);
}

export function rankToolsForSearch(tools: ToolSummary[], query: string): ToolSummary[] {
    const q = query.trim();
    if (!q) return tools;
    return [...tools].sort((a, b) => compareToolsForSearch(a, b, q));
}
