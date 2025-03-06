
/**
 * Service for fetching TikTok trend data
 * Note: This is a placeholder service that will be replaced with actual API calls
 * when a TikTok API or scraping solution is implemented
 */

import { TrendingHashtag } from './trendDataService';
import axios from 'axios';

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

// Interface for TokAPI response
export interface TokAPIResponse {
  data: any[]; // We'll refine this type once we see the actual API response structure
  cursor: string;
  hasMore: boolean;
}

// Function to fetch data from TokAPI
export const fetchTrendingTikTokDataFromTokAPI = async (): Promise<any> => {
  try {
    console.log('Fetching trending data from TokAPI...');
    
    const response = await axios.get('https://api.tokapi.online/v1/feed/recommended', {
      headers: {
        'accept': 'application/json',
        'x-project-name': 'tokapi',
        'x-api-key': 'YOUR_API_KEY_HERE' // Placeholder - will be replaced with actual API key
      }
    });
    
    console.log('TokAPI response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TokAPI:', error);
    throw error;
  }
};

// Function to fetch trending hashtags from TikTok API
export const fetchTikTokTrends = async (): Promise<TrendingHashtag[]> => {
  // In a real implementation, this would call the TikTok API or scraping service
  // For now, we'll simulate a network request with the mock data
  
  console.log('Fetching TikTok trends from API (simulated)');
  
  // Call the TokAPI function to log the response, but don't use the data yet
  try {
    await fetchTrendingTikTokDataFromTokAPI();
  } catch (error) {
    console.log('Failed to fetch from TokAPI, using placeholder data instead');
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulated API response
  const mockResponse: TikTokTrendResponse = {
    statusCode: 200,
    hashtags: [
      { name: 'SmartGadgets', viewCount: 1200000, videoCount: 5400, growthRate: 242 },
      { name: 'HomeOfficeSetup', viewCount: 890000, videoCount: 3200, growthRate: 128 },
      { name: 'MinimalistDesign', viewCount: 720000, videoCount: 2900, growthRate: 94 },
      { name: 'TechReviews', viewCount: 1800000, videoCount: 6700, growthRate: 76 },
      { name: 'BudgetFinds', viewCount: 450000, videoCount: 1800, growthRate: 65 },
      { name: 'ProductivityHacks', viewCount: 950000, videoCount: 4100, growthRate: 58 }
    ]
  };
  
  // Transform the API response into our application's data format
  return mockResponse.hashtags.map((item, index) => ({
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
