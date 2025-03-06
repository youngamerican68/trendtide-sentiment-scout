
import { useState, useEffect } from 'react';

// Types for trending hashtags
export interface TrendingHashtag {
  id: number;
  hashtag: string;
  growth: string;
  views: string;
  videos: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  isNew: boolean;
}

// Types for sentiment data
export interface SentimentData {
  sentiment: string;
  percentage: number;
  color: string;
}

// Types for product recommendations
export interface ProductRecommendation {
  id: number;
  name: string;
  category: string;
  trend: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  relevance: string;
  image: string;
}

// Mock API endpoints - would be replaced with real API calls
export const fetchTrendingHashtags = async (): Promise<TrendingHashtag[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would be an API call
  return [
    { 
      id: 1,
      hashtag: '#SmartGadgets',
      growth: '+242%',
      views: '1.2M',
      videos: '5.4K',
      sentiment: 'positive',
      isNew: true,
    },
    { 
      id: 2,
      hashtag: '#HomeOfficeSetup',
      growth: '+128%',
      views: '890K',
      videos: '3.2K',
      sentiment: 'positive',
      isNew: false,
    },
    { 
      id: 3,
      hashtag: '#MinimalistDesign',
      growth: '+94%',
      views: '720K',
      videos: '2.9K',
      sentiment: 'neutral',
      isNew: false,
    },
    { 
      id: 4,
      hashtag: '#TechReviews',
      growth: '+76%',
      views: '1.8M',
      videos: '6.7K',
      sentiment: 'positive',
      isNew: false,
    },
    { 
      id: 5,
      hashtag: '#BudgetFinds',
      growth: '+65%',
      views: '450K',
      videos: '1.8K',
      sentiment: 'neutral',
      isNew: true,
    }
  ];
};

export const fetchSentimentData = async (): Promise<SentimentData[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return [
    { sentiment: 'Positive', percentage: 65, color: 'bg-trend-positive' },
    { sentiment: 'Neutral', percentage: 25, color: 'bg-trend-neutral' },
    { sentiment: 'Negative', percentage: 10, color: 'bg-trend-negative' },
  ];
};

export const fetchProductRecommendations = async (): Promise<ProductRecommendation[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  return [
    {
      id: 1,
      name: 'Portable Monitor Stand',
      category: 'Home Office',
      trend: '#HomeOfficeSetup',
      sentiment: 'positive',
      relevance: 'High',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Ergonomic Desk Chair',
      category: 'Home Office',
      trend: '#HomeOfficeSetup',
      sentiment: 'positive',
      relevance: 'High',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Wireless Keyboard & Mouse',
      category: 'Tech Accessories',
      trend: '#MinimalistDesign',
      sentiment: 'neutral',
      relevance: 'Medium',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop',
    },
  ];
};

// Custom hooks for using the data

export const useTrendingHashtags = () => {
  const [data, setData] = useState<TrendingHashtag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTrendingHashtags();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    
    // For real-time updates, you could set up a polling interval
    const intervalId = setInterval(refetch, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return { data, isLoading, error, refetch };
};

export const useSentimentData = () => {
  const [data, setData] = useState<SentimentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSentimentData();
        setData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // For real-time updates, you could set up a polling interval
    const intervalId = setInterval(fetchData, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return { data, isLoading, error };
};

export const useProductRecommendations = () => {
  const [data, setData] = useState<ProductRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductRecommendations();
        setData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // For real-time updates, you could set up a polling interval
    const intervalId = setInterval(fetchData, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);

  return { data, isLoading, error };
};
