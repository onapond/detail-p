/**
 * API 사용량 및 비용 추적 모듈
 */

// Anthropic API 가격 (2024년 기준, USD per 1M tokens)
const PRICING = {
  'claude-sonnet-4-20250514': {
    input: 3.0,    // $3 per 1M input tokens
    output: 15.0,  // $15 per 1M output tokens
  },
  'claude-3-5-sonnet-20241022': {
    input: 3.0,
    output: 15.0,
  },
  'claude-3-haiku-20240307': {
    input: 0.25,
    output: 1.25,
  },
  default: {
    input: 3.0,
    output: 15.0,
  },
};

export interface UsageRecord {
  timestamp: string;
  endpoint: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
}

export interface UsageSummary {
  totalCalls: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCostUsd: number;
  totalCostKrw: number;
  byEndpoint: Record<string, {
    calls: number;
    inputTokens: number;
    outputTokens: number;
    costUsd: number;
  }>;
  recentCalls: UsageRecord[];
}

// In-memory storage using globalThis to persist across module reloads in dev
// For production, use a database
declare global {
  // eslint-disable-next-line no-var
  var usageRecords: UsageRecord[] | undefined;
}

// Use globalThis to persist across hot reloads in development
if (!globalThis.usageRecords) {
  globalThis.usageRecords = [];
}

const getRecords = (): UsageRecord[] => globalThis.usageRecords || [];
const setRecords = (records: UsageRecord[]): void => {
  globalThis.usageRecords = records;
};

// 환율 (대략적인 값, 실제로는 API로 가져올 수 있음)
const USD_TO_KRW = 1350;

export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = PRICING[model as keyof typeof PRICING] || PRICING.default;
  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (outputTokens / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}

export function trackUsage(
  endpoint: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): UsageRecord {
  const costUsd = calculateCost(model, inputTokens, outputTokens);

  const record: UsageRecord = {
    timestamp: new Date().toISOString(),
    endpoint,
    model,
    inputTokens,
    outputTokens,
    costUsd,
  };

  const records = getRecords();
  records.push(record);

  // Keep only last 1000 records in memory
  if (records.length > 1000) {
    setRecords(records.slice(-1000));
  } else {
    setRecords(records);
  }

  console.log(`[Usage] ${endpoint}: ${inputTokens} in / ${outputTokens} out = $${costUsd.toFixed(4)}`);

  return record;
}

export function getUsageSummary(): UsageSummary {
  const records = getRecords();
  const byEndpoint: UsageSummary['byEndpoint'] = {};

  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalCostUsd = 0;

  for (const record of records) {
    totalInputTokens += record.inputTokens;
    totalOutputTokens += record.outputTokens;
    totalCostUsd += record.costUsd;

    if (!byEndpoint[record.endpoint]) {
      byEndpoint[record.endpoint] = {
        calls: 0,
        inputTokens: 0,
        outputTokens: 0,
        costUsd: 0,
      };
    }

    byEndpoint[record.endpoint].calls++;
    byEndpoint[record.endpoint].inputTokens += record.inputTokens;
    byEndpoint[record.endpoint].outputTokens += record.outputTokens;
    byEndpoint[record.endpoint].costUsd += record.costUsd;
  }

  return {
    totalCalls: records.length,
    totalInputTokens,
    totalOutputTokens,
    totalCostUsd,
    totalCostKrw: totalCostUsd * USD_TO_KRW,
    byEndpoint,
    recentCalls: records.slice(-20).reverse(),
  };
}

export function resetUsage(): void {
  setRecords([]);
}
