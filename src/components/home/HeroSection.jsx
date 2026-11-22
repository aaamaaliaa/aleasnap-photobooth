import React from 'react';
import { Camera, Sparkles, Heart, Smartphone, ShieldCheck, Palette, ArrowRight } from 'lucide-react';
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
            <Sparkles size={16} color="var(--matcha-primary)" />
            <span>Cute Korean Photobooth Studio</span>
          </div>

          <h1 className="hero-title">
            Capture Your <br />
            <span className="hero-title-highlight">Little Moments.</span>
          </h1>

          <p className="hero-description">
            Turn your little moments into lovely memories. Take photos, explore cute frames, and create your own photo strips with just a few clicks.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onStartPhotobooth} style={{ fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}>
              <Camera size={20} />
              Start Photobooth
            </button>

            <button className="btn btn-secondary" onClick={onExploreFrames} style={{ fontSize: '1.05rem', padding: '0.85rem 1.5rem' }}>
              <Palette size={18} />
              Explore Frames
            </button>
          </div>

          <div className="hero-features-list">
            <div className="hero-feature-item">
              <Camera size={16} color="var(--matcha-primary)" />
              <span>Webcam & Smartphone</span>
            </div>
            <div className="hero-feature-item">
              <Palette size={16} color="var(--matcha-primary)" />
              <span>Aesthetic Frames</span>
            </div>
            <div className="hero-feature-item">
              <Smartphone size={16} color="var(--matcha-primary)" />
              <span>QR Code Download</span>
            </div>
            <div className="hero-feature-item">
              <ShieldCheck size={16} color="var(--matcha-primary)" />
              <span>No App Required</span>
            </div>
          </div>
        </div>

        {/* Right Side: Korean Photo Strip Mockup */}
        <div className="hero-visual">
          <div className="photostrip-wrapper">
            {/* Cute Floating Sticker Badges */}
            <div className="floating-badge badge-top-right">
              <span>🍵 Matcha Signature</span>
            </div>
            <div className="floating-badge badge-bottom-left">
              <Heart size={16} color="#E89898" fill="#E89898" />
              <span>100% Free & Cute</span>
            </div>

            {/* The Photo Strip Card */}
            <div className="photostrip-card">
              <div className="photostrip-header">
                <div className="photostrip-brand">
                  <span>Matcha<span style={{ color: 'var(--matcha-primary)' }}>Box</span></span>
                  <span>🍵</span>
                </div>
                <div className="photostrip-date">{todayFormatted} • SEOUL MEMORIES</div>
              </div>

              {/* 3 Photo Slots with cute sample moments */}
              <div className="photostrip-frames">
                <div className="photostrip-slot">
                  <div 
                    className="photostrip-photo-content"
                    style={{
                      background: 'linear-gradient(135deg, #FFE5EC 0%, #FFC2D1 100%)',
                      color: '#9E2A2B'
                    }}
                  >
                    <span style={{ fontSize: '2.4rem' }}>✌️😊</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '2px', opacity: 0.85 }}>pose 01 • V-sign</span>
                  </div>
                </div>

                <div className="photostrip-slot">
                  <div 
                    className="photostrip-photo-content"
                    style={{
                      background: 'linear-gradient(135deg, #E8F0FE 0%, #C2D7FE 100%)',
                      color: '#1A4D8F'
                    }}
                  >
                    <span style={{ fontSize: '2.4rem' }}>🫶✨</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '2px', opacity: 0.85 }}>pose 02 • heart cheek</span>
                  </div>
                </div>

                <div className="photostrip-slot">
                  <div 
                    className="photostrip-photo-content"
                    style={{
                      background: 'linear-gradient(135deg, #FFF3BF 0%, #FFE066 100%)',
                      color: '#7A5B00'
                    }}
                  >
                    <span style={{ fontSize: '2.4rem' }}>🧸🌸</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, marginTop: '2px', opacity: 0.85 }}>pose 03 • smile bright</span>
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
                  APPROVED ♡
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
