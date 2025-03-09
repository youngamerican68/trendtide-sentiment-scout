
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

// Function to fetch data from TikAPI with API key
const fetchTrendingTikTokDataFromTokAPI = async (): Promise<TikTokTrendResponse> => {
  console.log('Fetching actual data from TikAPI');
  
  // Your API key should be provided in the request headers
  const apiKey = 'YOUR_API_KEY'; // Replace this with your actual API key
  
  try {
    // Use a CORS proxy to prevent CORS issues
    const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.tikapi.io/public/explore';
    
    // Fetch with API key in the headers through the CORS proxy
    const response = await fetch(`${corsProxyUrl}${apiUrl}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': apiKey,
        'Origin': window.location.origin
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
    // No fallback to mock data - just throw the error
    throw error;
  }
};

// Function to fetch trending hashtags from TikTok API
export const fetchTikTokTrends = async (): Promise<TrendingHashtag[]> => {
  console.log('Fetching TikTok trends from API');
  
  // Get data from TikAPI with no fallback to mock data
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
