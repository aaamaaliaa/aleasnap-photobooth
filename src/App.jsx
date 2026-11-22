import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import HowItWorksPage from './components/howItWorks/HowItWorksPage';
import GalleryPage from './components/gallery/GalleryPage';
import PhotoboothPage from './components/photobooth/PhotoboothPage';
import PhotoEditorPage from './components/editor/PhotoEditorPage';
import PhotoDownloadPage from './components/download/PhotoDownloadPage';
import { PAGES } from './constants/routes';
import { FRAMES_LIST } from './data/framesData';
import './styles/global.css';

export default function App() {
  const [activePage, setActivePage] = useState(PAGES.HOME);
  const [selectedFrame, setSelectedFrame] = useState(FRAMES_LIST[0]); // default to ALEASNAP Signature Burgundy
  const [sessionData, setSessionData] = useState(null);
  const [mobilePhotoUrl, setMobilePhotoUrl] = useState(null);

  // Check if page was opened via smartphone QR scan with ?photo=...
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const photoParam = urlParams.get('photo');
    if (photoParam) {
      setMobilePhotoUrl(photoParam);
    }
  }, []);

  const handleNavigate = (page) => {
    if (mobilePhotoUrl) {
      // Clear query string when returning from mobile download
      window.history.pushState({}, '', window.location.pathname);
      setMobilePhotoUrl(null);
    }
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
    handleNavigate(PAGES.EDITOR);
  };

  return (
    <div className="app-layout">
      {/* 1. Global Responsive Navigation */}
      <Navbar activePage={activePage} setActivePage={handleNavigate} />

      {/* 2. Main Page Render */}
      <main className="container" style={{ minHeight: 'calc(100vh - 380px)' }}>
        {/* Dedicated QR Mobile Download Landing View */}
        {mobilePhotoUrl ? (
          <PhotoDownloadPage
            photoUrl={mobilePhotoUrl}
            onNavigateHome={() => handleNavigate(PAGES.HOME)}
          />
        ) : (
          <>
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
                onSelectFrame={handleSelectFrame}
                onNavigateGallery={() => handleNavigate(PAGES.GALLERY)}
                onNavigateHome={() => handleNavigate(PAGES.HOME)}
                onProceedToEditor={handleProceedToEditor}
              />
            )}

            {activePage === PAGES.EDITOR && (
              <PhotoEditorPage
                sessionData={sessionData}
                onNavigatePhotobooth={() => handleNavigate(PAGES.PHOTOBOOTH)}
                onNavigateHome={() => handleNavigate(PAGES.HOME)}
              />
            )}
          </>
        )}
      </main>

      {/* 3. Global Responsive Footer */}
      <Footer setActivePage={handleNavigate} />
    </div>
  );
}
