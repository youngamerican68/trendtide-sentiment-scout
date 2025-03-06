
import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="w-full py-6 px-6 sm:px-10 flex flex-col sm:flex-row justify-between items-center border-b border-border bg-white/50 backdrop-blur-sm sticky top-0 z-10 animate-slide-down-fade">
      <div className="mb-4 sm:mb-0">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mr-3">
            <span className="text-primary font-semibold text-xl">T</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">TrendTide</h1>
            <p className="text-sm text-muted-foreground">Affiliate Trend Detector</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input 
            type="search" 
            placeholder="Search trends..." 
            className="py-2 pl-10 pr-4 rounded-md bg-secondary border-border text-sm w-full sm:w-[200px] focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        
        <button className="p-2 rounded-full bg-white hover:bg-secondary transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <button className="p-2 rounded-full bg-white hover:bg-secondary transition-colors">
          <Settings className="h-5 w-5 text-muted-foreground" />
        </button>
        
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          U
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
