
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
}

const DashboardCard = ({
  title,
  className,
  children,
  headerAction,
}: DashboardCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card hover-lift overflow-hidden h-full animate-fade-in",
        className
      )}
    >
      <div className="flex justify-between items-center p-5 border-b border-border">
        <h3 className="font-medium text-lg">{title}</h3>
        {headerAction && (
          <div className="flex items-center">
            {headerAction}
          </div>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
