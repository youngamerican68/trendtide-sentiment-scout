
import React from 'react';
import { cn } from '@/lib/utils';

type SentimentType = 'positive' | 'neutral' | 'negative' | 'loading';

interface SentimentBadgeProps {
  sentiment: SentimentType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const SentimentBadge = ({
  sentiment,
  className,
  size = 'md',
  showLabel = true,
}: SentimentBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const sentimentConfig = {
    positive: {
      color: 'bg-trend-positive/20 text-trend-positive border-trend-positive/30',
      label: 'Positive',
    },
    neutral: {
      color: 'bg-trend-neutral/20 text-trend-neutral border-trend-neutral/30',
      label: 'Neutral',
    },
    negative: {
      color: 'bg-trend-negative/20 text-trend-negative border-trend-negative/30',
      label: 'Negative',
    },
    loading: {
      color: 'bg-secondary text-muted-foreground border-muted',
      label: 'Analyzing...',
    },
  };

  const config = sentimentConfig[sentiment];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        sizeClasses[size],
        config.color,
        className
      )}
    >
      <span className={cn('rounded-full w-2 h-2 mr-1.5', {
        'bg-trend-positive': sentiment === 'positive',
        'bg-trend-neutral': sentiment === 'neutral',
        'bg-trend-negative': sentiment === 'negative',
        'animate-pulse-soft bg-muted': sentiment === 'loading',
      })}></span>
      {showLabel && config.label}
    </span>
  );
};

export default SentimentBadge;
