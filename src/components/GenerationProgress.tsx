'use client';

import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, Image, FileText, Layout, Sparkles } from 'lucide-react';
import type { GenerationState } from '@/types';
import { cn } from '@/lib/utils';

interface GenerationProgressProps {
  state: GenerationState;
  streamingText?: string;
}

const steps = [
  { id: 'analyzing', label: '이미지 분석', icon: Image },
  { id: 'generating_copy', label: '카피라이팅', icon: FileText },
  { id: 'generating_layout', label: '레이아웃 생성', icon: Layout },
  { id: 'complete', label: '완료', icon: Sparkles },
];

export function GenerationProgress({ state, streamingText }: GenerationProgressProps) {
  if (state.step === 'idle') return null;

  const currentStepIndex = steps.findIndex((s) => s.id === state.step);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{state.message}</span>
              <span className="text-muted-foreground">{state.progress}%</span>
            </div>
            <Progress value={state.progress} className="h-2" />
          </div>

          {/* Steps */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = currentStepIndex > index || state.step === 'complete';
              const isCurrent = step.id === state.step;
              const isError = state.step === 'error' && isCurrent;

              return (
                <div
                  key={step.id}
                  className={cn(
                    'flex flex-col items-center gap-2 text-center',
                    isComplete && 'text-primary',
                    isCurrent && !isError && 'text-primary',
                    isError && 'text-destructive',
                    !isComplete && !isCurrent && 'text-muted-foreground'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      isComplete && 'bg-primary text-primary-foreground',
                      isCurrent && !isError && 'bg-primary/20',
                      isError && 'bg-destructive/20',
                      !isComplete && !isCurrent && 'bg-muted'
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : isCurrent ? (
                      isError ? (
                        <XCircle className="h-5 w-5" />
                      ) : (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      )
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* Streaming Text Display */}
          {streamingText && (state.step === 'analyzing' || state.step === 'generating_copy') && (
            <div className="bg-muted/50 rounded-lg p-4 max-h-32 overflow-y-auto">
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {streamingText.length > 500
                  ? '...' + streamingText.slice(-500)
                  : streamingText}
              </pre>
            </div>
          )}

          {/* Error Message */}
          {state.step === 'error' && state.error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
              {state.error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
