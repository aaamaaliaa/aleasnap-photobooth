import React from 'react';
import HeroSection from './HeroSection';
import FeaturedFrames from './FeaturedFrames';
import MiniAbout from './MiniAbout';

export default function HomePage({ onStartPhotobooth, onNavigateGallery, onNavigateAbout, onSelectFrame }) {
  return (
    <div className="home-page">
      {/* 1. Hero Section with Call to Action & Photo Strip preview */}
      <HeroSection 
        onStartPhotobooth={onStartPhotobooth}
        onExploreFrames={onNavigateGallery}
      />

      {/* 2. Featured Frames Section */}
      <FeaturedFrames 
        onSelectFrame={onSelectFrame}
        onViewAllFrames={onNavigateGallery}
      />

      {/* 3. Mini About & Core Highlights */}
      <MiniAbout 
        onLearnMore={onNavigateAbout}
        onStartPhotobooth={onStartPhotobooth}
      />
    </div>
  );
}
