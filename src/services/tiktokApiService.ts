
/**
 * Service for fetching TikTok trend data
 */

import { TrendingHashtag } from './trendDataService';

// Interface for TikTok API response
export interface TikTokTrendResponse {
  statusCode: number;
  hashtags: {
    name: string;
    viewCount: number;
    videoCount: number;
    growthRate: number;
  }[];
}

// Sample data to use when API access is restricted due to CORS
const sampleTrendingData: TikTokTrendResponse = {
  statusCode: 200,
  hashtags: [
    {
      name: "fitness",
      viewCount: 145000000,
      videoCount: 8500000,
      growthRate: 12
    },
    {
      name: "homeoffice",
      viewCount: 78000000,
      videoCount: 2300000,
      growthRate: 108
    },
    {
      name: "skincare",
      viewCount: 210000000,
      videoCount: 12000000,
      growthRate: 15
    },
    {
      name: "booktok",
      viewCount: 165000000,
      videoCount: 7800000,
      growthRate: 23
    },
    {
      name: "cleaningtips",
      viewCount: 92000000,
      videoCount: 4500000,
      growthRate: 19
    }
  ]
};

// Function to fetch data from TikAPI
const fetchTrendingTikTokDataFromTokAPI = async (): Promise<TikTokTrendResponse> => {
  console.log('Fetching actual data from TikAPI');
  
  const apiKey = 'WSGznGUl56zceZfCuT9uFLo6w8jhmjOCepZaYD6cd8P2MDsb';
  
  try {
    // Attempt to fetch with minimal headers to avoid CORS issues
    const response = await fetch('https://api.tikapi.io/public/explore', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('TikAPI response data:', data);
    
    // Process the data into our expected format
    const processedData: TikTokTrendResponse = {
      statusCode: 200,
      hashtags: (data.hashtags || data.data || []).map((item: any) => ({
        name: item.name || item.hashtagName || item.title || '',
        viewCount: item.viewCount || item.views || item.count || 0,
        videoCount: item.videoCount || item.videos || item.posts || 0,
        growthRate: item.growthRate || item.growth || 0
      }))
    };
    
    return processedData;
  } catch (error) {
    console.error('Error fetching from TikAPI:', error);
    
    // If it's a CORS error, use sample data instead
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log('CORS restriction detected, using sample data for demonstration');
      return sampleTrendingData;
    }
    
    throw new Error('CORS_ERROR: Unable to fetch from TikAPI directly from browser');
  }
};

// Function to fetch trending hashtags from TikTok API
export const fetchTikTokTrends = async (): Promise<TrendingHashtag[]> => {
  console.log('Fetching TikTok trends from API');
  
  // Get data from TikAPI
  const apiResponse = await fetchTrendingTikTokDataFromTokAPI();
  
  // Transform the API response into our application's data format
  return apiResponse.hashtags.map((item, index) => ({
    id: index + 1,
    hashtag: `#${item.name}`,
    growth: `+${item.growthRate}%`,
    views: formatNumber(item.viewCount),
    videos: formatNumber(item.videoCount),
    sentiment: getRandomSentiment(),
    isNew: item.growthRate > 100
  }));
};

// Helper function to format numbers (e.g., 1200000 -> 1.2M)
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Helper function to get random sentiment (will be replaced with actual sentiment analysis)
const getRandomSentiment = (): 'positive' | 'neutral' | 'negative' => {
  const sentiments: ('positive' | 'neutral' | 'negative')[] = ['positive', 'neutral', 'negative'];
  // Weighted to make positive more common
  const weights = [0.6, 0.3, 0.1]; 
  
  const random = Math.random();
  let sum = 0;
  
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) {
      return sentiments[i];
    }
  }
  
  return 'neutral';
};
