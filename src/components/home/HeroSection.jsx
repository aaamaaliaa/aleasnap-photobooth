import React from 'react';
import { Camera, Sparkles, Smartphone, ShieldCheck, Palette, Heart } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection({ onStartPhotobooth, onExploreFrames }) {
  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <section className="hero-section">
      <div className="hero-grid">
        {/* Left Side: Headline & Copy */}
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={15} color="var(--burgundy-deep)" />
            <span>Studio Photobooth Online</span>
          </div>

          <h1 className="hero-title">
            A Moment <br />
            <span className="hero-title-highlight">Worth Keeping.</span>
          </h1>

          <p className="hero-description">
            Capture your cherished memories in an elegant digital photobooth. Curated aesthetic frames, studio-grade filters, and seamless instant mobile downloads.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onStartPhotobooth} style={{ fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}>
              <Camera size={19} />
              Start Photobooth
            </button>

            <button className="btn btn-secondary" onClick={onExploreFrames} style={{ fontSize: '1.05rem', padding: '0.85rem 1.5rem' }}>
              <Palette size={18} />
              Explore Frames
            </button>
          </div>

          <div className="hero-features-list">
            <div className="hero-feature-item">
              <Camera size={16} color="var(--burgundy-deep)" />
              <span>Webcam & Smartphone</span>
            </div>
            <div className="hero-feature-item">
              <Palette size={16} color="var(--burgundy-deep)" />
              <span>Curated Aesthetic Frames</span>
            </div>
            <div className="hero-feature-item">
              <Smartphone size={16} color="var(--burgundy-deep)" />
              <span>QR Code Download</span>
            </div>
            <div className="hero-feature-item">
              <ShieldCheck size={16} color="var(--burgundy-deep)" />
              <span>No App Required</span>
            </div>
          </div>
        </div>

        {/* Right Side: Elegant Photo Strip Mockup */}
        <div className="hero-visual">
          <div className="photostrip-wrapper">
            {/* Elegant Floating Badges */}
            <div className="floating-badge badge-top-right">
              <Sparkles size={14} color="var(--burgundy-deep)" />
              <span>Editorial Series</span>
            </div>
            <div className="floating-badge badge-bottom-left">
              <Heart size={14} color="var(--burgundy-wine)" />
              <span>Studio Quality</span>
            </div>

            {/* The Photo Strip Card */}
            <div className="photostrip-card">
              <div className="photostrip-header">
                <div className="photostrip-brand">
                  <span>ALEASNAP</span>
                </div>
                <div className="photostrip-date">{todayFormatted} • STUDIO ARCHIVE</div>
              </div>

              {/* 3 Photo Slots with elegant editorial styling */}
              <div className="photostrip-frames">
                <div className="photostrip-slot">
                  <div 
                    className="photostrip-photo-content"
                    style={{
                      background: 'linear-gradient(135deg, #F3EAE8 0%, #EAD9D5 100%)',
                      color: 'var(--burgundy-deep)'
                    }}
                  >
                    <Camera size={26} strokeWidth={1.5} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '6px', letterSpacing: '0.05em' }}>PORTRAIT 01 • STUDIO</span>
                  </div>
                </div>

                <div className="photostrip-slot">
                  <div 
                    className="photostrip-photo-content"
                    style={{
                      background: 'linear-gradient(135deg, #EFE8E5 0%, #DFCECB 100%)',
                      color: 'var(--burgundy-wine)'
                    }}
                  >
                    <Sparkles size={24} strokeWidth={1.5} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '6px', letterSpacing: '0.05em' }}>PORTRAIT 02 • CANDID</span>
                  </div>
                </div>

                <div className="photostrip-slot">
                  <div 
                    className="photostrip-photo-content"
                    style={{
                      background: 'linear-gradient(135deg, #F8F3EF 0%, #E5D5D1 100%)',
                      color: 'var(--burgundy-deep)'
                    }}
                  >
                    <Palette size={24} strokeWidth={1.5} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '6px', letterSpacing: '0.05em' }}>PORTRAIT 03 • MEMORY</span>
                  </div>
                </div>
              </div>

              {/* Bottom Strip Barcode & Stamp */}
              <div className="photostrip-footer">
                <div className="photostrip-barcode">
                  <span className="barcode-bar" style={{ width: '2px' }}></span>
                  <span className="barcode-bar" style={{ width: '4px' }}></span>
                  <span className="barcode-bar" style={{ width: '1px' }}></span>
                  <span className="barcode-bar" style={{ width: '3px' }}></span>
                  <span className="barcode-bar" style={{ width: '5px' }}></span>
                  <span className="barcode-bar" style={{ width: '2px' }}></span>
                  <span className="barcode-bar" style={{ width: '3px' }}></span>
                  <span className="barcode-bar" style={{ width: '1px' }}></span>
                  <span className="barcode-bar" style={{ width: '4px' }}></span>
                  <span className="barcode-bar" style={{ width: '2px' }}></span>
                </div>
                <div className="photostrip-stamp">
                  ALEASNAP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
