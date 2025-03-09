
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
    // Direct API call approach (no CORS proxy)
    const apiUrl = 'https://api.tikapi.io/public/explore';
    
    // If you're facing CORS issues, consider these alternatives:
    // 1. Create a proxy on your own backend server if you have one
    // 2. Use a dedicated CORS proxy service (not the Heroku demo)
    // 3. Set up a serverless function (AWS Lambda, Vercel, Netlify)
    
    // For development, you can still use the Heroku proxy temporarily:
    // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const fullUrl = `${corsProxyUrl}${apiUrl}`;
    
    // For now, we'll use mock data if the API request fails
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': apiKey,
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('TikAPI response data:', JSON.stringify(data, null, 2)); // Log FULL JSON data with indentation
      
      // Process the data based on the actual response structure
      // Based on the console logs, we need to extract from itemList
      const processedData: TikTokTrendResponse = {
        statusCode: 200,
        hashtags: []
      };
      
      // Check if we have itemList in the response
      if (data.itemList && Array.isArray(data.itemList)) {
        // Extract hashtags from the items
        // TikTok API may have hashtags in various locations within the items
        processedData.hashtags = data.itemList
          .filter(item => item.challengeInfo || item.textExtra)
          .map((item, index) => {
            // Try to get hashtag info from challengeInfo
            if (item.challengeInfo) {
              return {
                name: item.challengeInfo.challengeName || `trend${index}`,
                viewCount: parseInt(item.challengeInfo.viewCount || '0', 10),
                videoCount: parseInt(item.challengeInfo.videoCount || '0', 10),
                growthRate: Math.floor(Math.random() * 150) // Random growth rate as this may not be in the API
              };
            }
            
            // Or try to extract from textExtra (mentions and hashtags)
            if (item.textExtra && Array.isArray(item.textExtra)) {
              const hashtag = item.textExtra.find(extra => extra.hashtagName);
              if (hashtag) {
                return {
                  name: hashtag.hashtagName,
                  viewCount: parseInt(item.stats?.playCount || '0', 10),
                  videoCount: parseInt(item.stats?.diggCount || '0', 10) || Math.floor(Math.random() * 10000),
                  growthRate: Math.floor(Math.random() * 150)
                };
              }
            }
            
            // Fallback if we can't find hashtag info
            return {
              name: `trending${index}`,
              viewCount: parseInt(item.stats?.playCount || '0', 10) || Math.floor(Math.random() * 1000000),
              videoCount: parseInt(item.stats?.shareCount || '0', 10) || Math.floor(Math.random() * 10000),
              growthRate: Math.floor(Math.random() * 150)
            };
          });
      } else if (data.challengeList && Array.isArray(data.challengeList)) {
        // Alternative data structure
        processedData.hashtags = data.challengeList.map(challenge => ({
          name: challenge.challengeName || challenge.title || '',
          viewCount: parseInt(challenge.viewCount || '0', 10),
          videoCount: parseInt(challenge.videoCount || '0', 10),
          growthRate: Math.floor(Math.random() * 150)
        }));
      }
      
      // Deduplicate hashtags
      const uniqueHashtags = [...new Map(processedData.hashtags.map(item => 
        [item.name, item])).values()];
      
      // Take only the top hashtags
      processedData.hashtags = uniqueHashtags.slice(0, 10);
      
      return processedData;
    } catch (apiError) {
      console.error('API request failed, using mock data instead:', apiError);
      // Fall back to mock data if API request fails
      return getMockTikTokData();
    }
  } catch (error) {
    console.error('Error in TikTok API service:', error);
    return getMockTikTokData();
  }
};

// Fallback function to get mock TikTok data
const getMockTikTokData = (): TikTokTrendResponse => {
  console.log('Using mock TikTok data');
  
  return {
    statusCode: 200,
    hashtags: [
      {
        name: 'productivityhack',
        viewCount: 1200000,
        videoCount: 45000,
        growthRate: 120
      },
      {
        name: 'workfromhome',
        viewCount: 8500000,
        videoCount: 340000,
        growthRate: 85
      },
      {
        name: 'techreview',
        viewCount: 4500000,
        videoCount: 120000,
        growthRate: 95
      },
      {
        name: 'lifehack',
        viewCount: 12000000,
        videoCount: 890000,
        growthRate: 70
      },
      {
        name: 'gadgetreview',
        viewCount: 3800000,
        videoCount: 78000,
        growthRate: 110
      },
      {
        name: 'digitalmarketing',
        viewCount: 5200000,
        videoCount: 156000,
        growthRate: 65
      },
      {
        name: 'remotework',
        viewCount: 2900000,
        videoCount: 87000,
        growthRate: 130
      },
      {
        name: 'homeofficesetup',
        viewCount: 3400000,
        videoCount: 92000,
        growthRate: 105
      },
      {
        name: 'trendingfashion',
        viewCount: 9600000,
        videoCount: 430000,
        growthRate: 75
      },
      {
        name: 'healthylifestyle',
        viewCount: 7800000,
        videoCount: 320000,
        growthRate: 90
      }
    ]
  };
};

// Function to fetch trending hashtags from TikTok API
export const fetchTikTokTrends = async (): Promise<TrendingHashtag[]> => {
  console.log('Fetching TikTok trends from API');
  
  // Get data from TikAPI
  const apiResponse = await fetchTrendingTikTokDataFromTokAPI();
  
  // Transform the API response into our application's data format
  return apiResponse.hashtags.map((item, index) => ({
    id: index + 1,
    hashtag: item.name.startsWith('#') ? item.name : `#${item.name}`,
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
