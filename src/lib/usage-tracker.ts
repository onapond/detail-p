/**
 * API 사용량 및 비용 추적 모듈
 * Phase 2-3: In-memory → Supabase api_usage 테이블
 */

import { createServerSupabaseClient } from '@/lib/supabase/server';

// Anthropic API 가격 (2024년 기준, USD per 1M tokens)
const PRICING: Record<string, { input: number; output: number }> = {
  'claude-sonnet-4-20250514': { input: 3.0, output: 15.0 },
  'claude-3-5-sonnet-20241022': { input: 3.0, output: 15.0 },
  'claude-3-haiku-20240307': { input: 0.25, output: 1.25 },
  default: { input: 3.0, output: 15.0 },
};

const USD_TO_KRW = 1350;

export interface UsageRecord {
  endpoint: string;
  model: string;
  input_tokens: number;
  output_tokens: number;
  cost_usd: number;
  created_at: string;
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

export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = PRICING[model] || PRICING.default;
  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (outputTokens / 1_000_000) * pricing.output;
  return inputCost + outputCost;
}

/**
 * Track API usage by inserting into Supabase api_usage table.
 * Fire-and-forget: errors are logged but do not block the generation pipeline.
 */
export async function trackUsage(
  userId: string,
  endpoint: string,
  model: string,
  inputTokens: number,
  outputTokens: number
): Promise<void> {
  const costUsd = calculateCost(model, inputTokens, outputTokens);

  console.log(`[Usage] ${endpoint}: ${inputTokens} in / ${outputTokens} out = $${costUsd.toFixed(4)}`);

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.from('api_usage').insert({
      user_id: userId,
      endpoint,
      model,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd: costUsd,
    });

    if (error) {
      console.error('[Usage] Failed to track:', error.message);
    }
  } catch (err) {
    console.error('[Usage] Unexpected error:', err);
  }
}

function emptyUsageSummary(): UsageSummary {
  return {
    totalCalls: 0,
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCostUsd: 0,
    totalCostKrw: 0,
    byEndpoint: {},
    recentCalls: [],
  };
}

/**
 * Get usage summary for a specific user, optionally filtered by period.
 */
export async function getUsageSummary(
  userId: string,
  period: 'day' | 'month' | 'all' = 'month'
): Promise<UsageSummary> {
  try {
    const supabase = await createServerSupabaseClient();

    let fromDate: string | undefined;
    const now = new Date();
    if (period === 'day') {
      fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    } else if (period === 'month') {
      fromDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    }

    let query = supabase
      .from('api_usage')
      .select('endpoint, model, input_tokens, output_tokens, cost_usd, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1000);

    if (fromDate) {
      query = query.gte('created_at', fromDate);
    }

    const { data: records, error } = await query;

    if (error) {
      console.error('[Usage] Failed to fetch summary:', error.message);
      return emptyUsageSummary();
    }

    return aggregateRecords(records || []);
  } catch (err) {
    console.error('[Usage] Unexpected error in summary:', err);
    return emptyUsageSummary();
  }
}

function aggregateRecords(records: UsageRecord[]): UsageSummary {
  const byEndpoint: UsageSummary['byEndpoint'] = {};
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalCostUsd = 0;

  for (const record of records) {
    totalInputTokens += record.input_tokens;
    totalOutputTokens += record.output_tokens;
    totalCostUsd += Number(record.cost_usd);

    if (!byEndpoint[record.endpoint]) {
      byEndpoint[record.endpoint] = { calls: 0, inputTokens: 0, outputTokens: 0, costUsd: 0 };
    }
    byEndpoint[record.endpoint].calls++;
    byEndpoint[record.endpoint].inputTokens += record.input_tokens;
    byEndpoint[record.endpoint].outputTokens += record.output_tokens;
    byEndpoint[record.endpoint].costUsd += Number(record.cost_usd);
  }

  return {
    totalCalls: records.length,
    totalInputTokens,
    totalOutputTokens,
    totalCostUsd,
    totalCostKrw: totalCostUsd * USD_TO_KRW,
    byEndpoint,
    recentCalls: records.slice(0, 20),
  };
}
