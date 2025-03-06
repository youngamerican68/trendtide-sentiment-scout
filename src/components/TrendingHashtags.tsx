
import React from 'react';
import { TrendingUp, Users, Eye, RefreshCw } from 'lucide-react';
import DashboardCard from './DashboardCard';
import SentimentBadge from './SentimentBadge';
import { LoadingText } from './LoadingEffect';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const trendingHashtags = [
  { 
    id: 1,
    hashtag: '#SmartGadgets',
    growth: '+242%',
    views: '1.2M',
    videos: '5.4K',
    sentiment: 'positive' as const,
    isNew: true,
  },
  { 
    id: 2,
    hashtag: '#HomeOfficeSetup',
    growth: '+128%',
    views: '890K',
    videos: '3.2K',
    sentiment: 'positive' as const,
    isNew: false,
  },
  { 
    id: 3,
    hashtag: '#MinimalistDesign',
    growth: '+94%',
    views: '720K',
    videos: '2.9K',
    sentiment: 'neutral' as const,
    isNew: false,
  },
  { 
    id: 4,
    hashtag: '#TechReviews',
    growth: '+76%',
    views: '1.8M',
    videos: '6.7K',
    sentiment: 'positive' as const,
    isNew: false,
  },
  { 
    id: 5,
    hashtag: '#BudgetFinds',
    growth: '+65%',
    views: '450K',
    videos: '1.8K',
    sentiment: 'neutral' as const,
    isNew: true,
  }
];

const TrendingHashtags = () => {
  return (
    <DashboardCard 
      title="Trending Hashtags" 
      headerAction={
        <button className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
          <RefreshCw className="h-3 w-3 mr-1" />
          <span>Refresh</span>
        </button>
      }
    >
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="pb-3 text-left font-medium">Hashtag</th>
              <th className="pb-3 text-right font-medium">Growth</th>
              <th className="pb-3 text-right font-medium">Views</th>
              <th className="pb-3 text-right font-medium">Videos</th>
              <th className="pb-3 text-right font-medium">Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {trendingHashtags.map((item) => (
              <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                <td className="py-3">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-trend-rising mr-2" />
                    <span className="font-medium">{item.hashtag}</span>
                    {item.isNew && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 text-right text-trend-positive font-medium">
                  {item.growth}
                </td>
                <td className="py-3 text-right text-muted-foreground">
                  <div className="flex items-center justify-end">
                    <Eye className="h-3 w-3 mr-1.5 text-muted-foreground/70" />
                    {item.views}
                  </div>
                </td>
                <td className="py-3 text-right text-muted-foreground">
                  <div className="flex items-center justify-end">
                    <Users className="h-3 w-3 mr-1.5 text-muted-foreground/70" />
                    {item.videos}
                  </div>
                </td>
                <td className="py-3 text-right">
                  <SentimentBadge sentiment={item.sentiment} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
};

export default TrendingHashtags;
