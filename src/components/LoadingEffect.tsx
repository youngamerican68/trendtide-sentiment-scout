
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingEffectProps {
  className?: string;
  width?: string;
  height?: string;
  animate?: boolean;
}

const LoadingEffect = ({
  className,
  width = "100%",
  height = "20px",
  animate = true,
}: LoadingEffectProps) => {
  return (
    <div
      className={cn(
        "rounded-md bg-secondary",
        animate && "animate-pulse-soft",
        className
      )}
      style={{ width, height }}
    />
  );
};

export const LoadingText = ({ lines = 3, width = "100%" }) => {
  return (
    <div className="space-y-2">
      {Array(lines)
        .fill(0)
        .map((_, i) => (
          <LoadingEffect 
            key={i} 
            width={typeof width === 'string' ? width : width[i % width.length] || '100%'} 
          />
        ))}
    </div>
  );
};

export const LoadingCard = ({ height = "200px", className }) => {
  return <LoadingEffect className={className} height={height} />;
};

export default LoadingEffect;
