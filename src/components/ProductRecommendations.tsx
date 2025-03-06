
import React from 'react';
import { ShoppingBag, ExternalLink, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import SentimentBadge from './SentimentBadge';
import { LoadingText } from './LoadingEffect';

// Mock data for product recommendations
const productRecommendations = [
  {
    id: 1,
    name: 'Portable Monitor Stand',
    category: 'Home Office',
    trend: '#HomeOfficeSetup',
    sentiment: 'positive' as const,
    relevance: 'High',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Ergonomic Desk Chair',
    category: 'Home Office',
    trend: '#HomeOfficeSetup',
    sentiment: 'positive' as const,
    relevance: 'High',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Wireless Keyboard & Mouse',
    category: 'Tech Accessories',
    trend: '#MinimalistDesign',
    sentiment: 'neutral' as const,
    relevance: 'Medium',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop',
  },
];

const ProductRecommendations = () => {
  return (
    <DashboardCard 
      title="Product Recommendations" 
      headerAction={
        <div className="flex items-center text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>Placeholder Data</span>
        </div>
      }
      className="col-span-full md:col-span-1"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 text-muted-foreground mr-2" />
            <h4 className="font-medium">Recommended for Affiliate Marketing</h4>
          </div>
          <div className="text-xs text-muted-foreground">
            Based on trend sentiments
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {productRecommendations.map((product) => (
            <div key={product.id} className="border border-border rounded-lg p-4 hover-lift">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                    loading="lazy" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-base truncate">{product.name}</h4>
                    <SentimentBadge sentiment={product.sentiment} size="sm" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {product.category}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-trend-rising mr-1">
                        {product.trend}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground mr-1">Relevance:</span>
                      <span className="font-medium">{product.relevance}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Placeholder affiliate link</span>
                <button className="text-xs text-primary flex items-center hover:underline">
                  <span>View details</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-3 border-t border-border">
          <button className="w-full py-2 rounded-md bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors">
            Discover More Products
          </button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default ProductRecommendations;
