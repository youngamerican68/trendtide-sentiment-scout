
import React, { useState, useEffect } from 'react';
import { BarChart, Search, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import SentimentBadge from './SentimentBadge';
import { LoadingText } from './LoadingEffect';
import { useSentimentData } from '@/services/trendDataService';
import { analyzeHashtagSentiment } from '@/services/sentimentAnalysisService';

const SentimentAnalysis = () => {
  const { data: sentimentData, isLoading, error } = useSentimentData();
  const [hashtag, setHashtag] = useState('');
  const [analyzedHashtag, setAnalyzedHashtag] = useState('#HomeOfficeSetup');
  const [hashtagSentiment, setHashtagSentiment] = useState<'positive' | 'neutral' | 'negative' | 'loading'>('positive');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hashtag.trim()) {
      const formattedHashtag = hashtag.startsWith('#') ? hashtag : `#${hashtag}`;
      setAnalyzedHashtag(formattedHashtag);
      setHashtagSentiment('loading');
      setIsAnalyzing(true);
      setHashtag('');
      
      try {
        // Analyze the sentiment of the hashtag
        const analysis = await analyzeHashtagSentiment(formattedHashtag);
        setHashtagSentiment(analysis.overallSentiment.sentiment);
      } catch (error) {
        console.error('Error analyzing hashtag sentiment:', error);
        setHashtagSentiment('neutral'); // Fallback
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  // Initial sentiment analysis on component mount
  useEffect(() => {
    const analyzeInitialHashtag = async () => {
      try {
        setIsAnalyzing(true);
        const analysis = await analyzeHashtagSentiment(analyzedHashtag);
        setHashtagSentiment(analysis.overallSentiment.sentiment);
      } catch (error) {
        console.error('Error analyzing initial hashtag sentiment:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    
    analyzeInitialHashtag();
  }, []);

  return (
    <DashboardCard 
      title="Sentiment Analysis" 
      headerAction={
        <div className="flex items-center text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>{isLoading ? 'Loading data...' : 'Live Data'}</span>
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
        
        {error ? (
          <div className="p-4 text-center text-trend-negative">
            <p>Error loading sentiment data.</p>
          </div>
        ) : isLoading ? (
          <LoadingText lines={3} />
        ) : (
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
        )}
        
        <div className="pt-3 border-t border-border mt-5">
          <div className="flex items-center text-muted-foreground text-sm">
            <Search className="h-4 w-4 mr-2" />
            <span>Analyze a specific hashtag</span>
          </div>
          <form onSubmit={handleSearch} className="mt-2">
            <input 
              type="text" 
              placeholder="Enter hashtag..."
              className="w-full py-2 px-3 rounded-md bg-secondary border-border text-sm focus-visible:ring-1 focus-visible:ring-primary"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
              disabled={isAnalyzing}
            />
          </form>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-trend-rising mr-1">{analyzedHashtag}</span>
              <span>Sentiment:</span>
            </div>
            <SentimentBadge sentiment={isAnalyzing ? 'loading' : hashtagSentiment} size="sm" />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SentimentAnalysis;
