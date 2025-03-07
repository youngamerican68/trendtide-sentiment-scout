
import React from 'react';

interface LoadingDotsProps {
  className?: string;
}

interface LoadingTextProps {
  lines?: number;
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({ className = '' }) => {
  return (
    <div className={`flex space-x-1 items-center ${className}`}>
      <div className="w-1 h-1 bg-foreground/60 rounded-full animate-pulse"></div>
      <div className="w-1 h-1 bg-foreground/60 rounded-full animate-pulse delay-75"></div>
      <div className="w-1 h-1 bg-foreground/60 rounded-full animate-pulse delay-150"></div>
    </div>
  );
};

export const LoadingText: React.FC<LoadingTextProps> = ({ lines = 5 }) => {
  // Create an array with the specified number of elements
  const lineArray = Array.from({ length: lines }, (_, i) => i);
  
  return (
    <div className="space-y-3 py-2">
      {lineArray.map((index) => (
        <div key={index} className="flex items-center">
          <div className="h-4 bg-muted animate-pulse rounded w-4/5"></div>
        </div>
      ))}
    </div>
  );
};

export default { LoadingDots, LoadingText };
