
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import TrendingHashtags from '@/components/TrendingHashtags';
import SentimentAnalysis from '@/components/SentimentAnalysis';
import ProductRecommendations from '@/components/ProductRecommendations';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 py-6">
        {/* Dashboard overview section */}
        <section className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-2">TikTok Affiliate Trend Insights</h2>
          <p className="text-muted-foreground">
            Discover trending hashtags, analyze sentiments, and find affiliate product opportunities.
          </p>
        </section>
        
        {/* Main dashboard grid */}
        <div className="dashboard-grid">
          <div className="col-span-full md:col-span-2">
            <TrendingHashtags />
          </div>
          
          <div className="md:col-span-1">
            <SentimentAnalysis />
          </div>
          
          <ProductRecommendations />
        </div>
        
        {/* Footer note */}
        <div className="mt-10 text-center text-sm text-muted-foreground animate-fade-in">
          <p>TrendTide · Sentiment-Adaptive Affiliate Trend Detector for TikTok</p>
          <p className="mt-1">Data shown is placeholder for demonstration purposes</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
