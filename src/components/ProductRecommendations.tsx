
import React, { useState } from 'react';
import { RefreshCw, Search, ArrowUpRight } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { LoadingText } from './LoadingEffect';
import SentimentBadge from './SentimentBadge';
import { useProductRecommendations } from '@/services/trendDataService';
import { toast } from '@/hooks/use-toast';

const ProductRecommendations = () => {
  const { data: products, isLoading, error, refetch } = useProductRecommendations();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = searchTerm 
    ? products?.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.trend.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const handleRefresh = async () => {
    await refetch();
    toast({
      title: "Data refreshed",
      description: "Latest product recommendations loaded",
    });
  };

  return (
    <DashboardCard 
      title="Product Recommendations" 
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
      <div className="mb-4 relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products"
          className="w-full bg-background border border-border rounded-md pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error ? (
        <div className="p-4 text-center text-trend-negative">
          <p>Error loading data. Please try again.</p>
        </div>
      ) : isLoading ? (
        <LoadingText lines={5} />
      ) : (
        <div className="space-y-4">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-3 p-3 rounded-md border border-border bg-card hover:bg-secondary/30 transition-colors">
                <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium truncate">{product.name}</h4>
                    <SentimentBadge sentiment={product.sentiment} size="sm" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center text-xs text-muted-foreground mt-1">
                    <span className="mr-2">{product.category}</span>
                    <span className="bg-primary/10 text-primary px-1.5 rounded-full text-xs">{product.trend}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="p-1.5 hover:bg-muted rounded-full">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No products found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </DashboardCard>
  );
};

export default ProductRecommendations;
