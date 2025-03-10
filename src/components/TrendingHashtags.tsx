
import React from 'react';
import { TrendingUp, Eye, RefreshCw, AlertTriangle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { LoadingText } from './LoadingEffect';
import { useTrendingHashtags } from '@/services/trendDataService';
import { toast } from '@/hooks/use-toast';

const TrendingHashtags = () => {
  const { data: trendingHashtags, isLoading, error, refetch } = useTrendingHashtags();

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Data refreshed",
        description: "Latest trending hashtags loaded",
      });
    } catch (err) {
      console.error("Error refreshing data:", err);
      
      let errorMessage = "Could not fetch real-time trending hashtags data";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast({
        title: "Data fetching failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardCard 
      title="Trending Hashtags" 
      headerAction={
        <button 
          className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
        </button>
      }
    >
      {error ? (
        <div className="p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <AlertTriangle className="h-10 w-10 text-destructive" />
            <h3 className="font-medium text-lg">API Error</h3>
            <p className="text-muted-foreground">
              {error.message || 'Unable to fetch trending hashtags data'}
            </p>
            <button 
              className="mt-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm font-medium transition-colors"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              Try Again
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <LoadingText lines={5} />
      ) : trendingHashtags && trendingHashtags.length > 0 ? (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="pb-3 text-left font-medium">Hashtag</th>
                <th className="pb-3 text-right font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              {trendingHashtags.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-trend-rising mr-2" />
                      <span className="font-medium">{item.hashtag}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right text-muted-foreground">
                    <div className="flex items-center justify-end">
                      <Eye className="h-3 w-3 mr-1.5 text-muted-foreground/70" />
                      {item.views}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          <p>No trending hashtags found.</p>
        </div>
      )}
    </DashboardCard>
  );
};

export default TrendingHashtags;
