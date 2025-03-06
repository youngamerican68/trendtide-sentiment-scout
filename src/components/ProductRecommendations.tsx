
import React from 'react';
import { ShoppingBag, ExternalLink, AlertCircle } from 'lucide-react';
import DashboardCard from './DashboardCard';
import SentimentBadge from './SentimentBadge';
import { LoadingText } from './LoadingEffect';
import { useProductRecommendations } from '@/services/trendDataService';

const ProductRecommendations = () => {
  const { data: productRecommendations, isLoading, error } = useProductRecommendations();

  return (
    <DashboardCard 
      title="Product Recommendations" 
      headerAction={
        <div className="flex items-center text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>{isLoading ? 'Loading data...' : 'Live Data'}</span>
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
        
        {error ? (
          <div className="p-4 text-center text-trend-negative">
            <p>Error loading product recommendations.</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                    <LoadingText lines={1} />
                  </div>
                  <div className="flex-1">
                    <LoadingText lines={3} width={['80%', '60%', '40%']} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
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
                  <span className="text-xs text-muted-foreground">Affiliate link</span>
                  <button className="text-xs text-primary flex items-center hover:underline">
                    <span>View details</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
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
