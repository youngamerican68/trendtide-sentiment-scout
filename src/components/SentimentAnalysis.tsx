
import React from 'react';
import { BarChart, Search, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import SentimentBadge from './SentimentBadge';
import { LoadingText } from './LoadingEffect';

// Mock data for the sentiment chart
const sentimentData = [
  { sentiment: 'Positive', percentage: 65, color: 'bg-trend-positive' },
  { sentiment: 'Neutral', percentage: 25, color: 'bg-trend-neutral' },
  { sentiment: 'Negative', percentage: 10, color: 'bg-trend-negative' },
];

const SentimentAnalysis = () => {
  return (
    <DashboardCard 
      title="Sentiment Analysis" 
      headerAction={
        <div className="flex items-center text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Placeholder Data</span>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart className="h-5 w-5 text-muted-foreground mr-2" />
            <h4 className="font-medium">Overall Sentiment</h4>
          </div>
          <div className="text-sm text-muted-foreground">
            Based on TikTok comments
          </div>
        </div>
        
        <div className="space-y-4">
          {sentimentData.map((item) => (
            <div key={item.sentiment} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.sentiment}</span>
                <span className="text-muted-foreground">{item.percentage}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full animate-pulse-soft`} 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-3 border-t border-border mt-5">
          <div className="flex items-center text-muted-foreground text-sm">
            <Search className="h-4 w-4 mr-2" />
            <span>Analyze a specific hashtag</span>
          </div>
          <div className="mt-2">
            <input 
              type="text" 
              placeholder="Enter hashtag..."
              className="w-full py-2 px-3 rounded-md bg-secondary border-border text-sm focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-trend-rising mr-1">#HomeOfficeSetup</span>
              <span>Sentiment:</span>
            </div>
            <SentimentBadge sentiment="positive" size="sm" />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SentimentAnalysis;
