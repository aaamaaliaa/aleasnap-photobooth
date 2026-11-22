import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import HowItWorksPage from './components/howItWorks/HowItWorksPage';
import GalleryPage from './components/gallery/GalleryPage';
import PhotoboothPage from './components/photobooth/PhotoboothPage';
import { PAGES } from './constants/routes';
import { FRAMES_LIST } from './data/framesData';
import './styles/global.css';

export default function App() {
  const [activePage, setActivePage] = useState(PAGES.HOME);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES_LIST[0]); // default to Matcha Signature
  const [sessionData, setSessionData] = useState(null);

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFrame = (frame) => {
    setSelectedFrame(frame);
  };

  const handleSelectFrameAndStart = (frame) => {
    setSelectedFrame(frame);
    handleNavigate(PAGES.PHOTOBOOTH);
  };

  const handleProceedToEditor = (data) => {
    setSessionData(data);
    alert(`🎉 Sesi foto berhasil diambil (${data.photos.filter(Boolean).length} foto)! Siap untuk Tahap 4 (Frame Collection) dan Tahap 5 (Photo Editor & Canvas Strip).`);
  };

  return (
    <div className="app-layout">
      {/* 1. Global Responsive Navigation */}
      <Navbar activePage={activePage} setActivePage={handleNavigate} />

      {/* 2. Main Page Render */}
      <main className="container" style={{ minHeight: 'calc(100vh - 380px)' }}>
        {activePage === PAGES.HOME && (
          <HomePage
            onStartPhotobooth={() => handleNavigate(PAGES.PHOTOBOOTH)}
            onNavigateGallery={() => handleNavigate(PAGES.GALLERY)}
            onNavigateAbout={() => handleNavigate(PAGES.ABOUT)}
            onSelectFrame={handleSelectFrameAndStart}
          />
        )}

        {activePage === PAGES.ABOUT && (
          <AboutPage 
            onStartPhotobooth={() => handleNavigate(PAGES.PHOTOBOOTH)}
            onExploreFrames={() => handleNavigate(PAGES.GALLERY)}
          />
        )}

        {activePage === PAGES.HOW_IT_WORKS && (
          <HowItWorksPage 
            onStartPhotobooth={() => handleNavigate(PAGES.PHOTOBOOTH)}
          />
        )}

        {activePage === PAGES.GALLERY && (
          <GalleryPage
            selectedFrame={selectedFrame}
            onSelectFrame={handleSelectFrame}
            onStartPhotobooth={() => handleNavigate(PAGES.PHOTOBOOTH)}
          />
        )}

        {activePage === PAGES.PHOTOBOOTH && (
          <PhotoboothPage
            selectedFrame={selectedFrame}
            onNavigateGallery={() => handleNavigate(PAGES.GALLERY)}
            onNavigateHome={() => handleNavigate(PAGES.HOME)}
            onProceedToEditor={handleProceedToEditor}
          />
        )}
      </main>

      {/* 3. Global Responsive Footer */}
      <Footer setActivePage={handleNavigate} />
    </div>
  );
}
