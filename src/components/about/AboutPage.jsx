import React from 'react';
import { Camera, Heart, Sparkles, Shield, Smartphone, Smile, ArrowRight } from 'lucide-react';
import './AboutPage.css';

export default function AboutPage({ onStartPhotobooth, onExploreFrames }) {
  return (
    <div className="about-page">
      {/* Header */}
      <div className="about-header">
        <div className="badge-cute" style={{ marginBottom: '0.8rem' }}>
          <Heart size={14} color="#E89898" fill="#E89898" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="about-title">Bringing Korean Photobooth Joy Everywhere</h1>
        <p className="about-lead">
          MatchaBox was born from the love of capturing spontaneous candid moments, aesthetic Korean photo strips, and cozy matcha vibes.
        </p>
      </div>

      {/* Story Section */}
      <div className="about-story-grid">
        <div className="about-story-text">
          <h2>Little Moments, Eternal Memories 🍵</h2>
          <p>
            In South Korea, hopping into a self-photobooth after hanging out with friends or dating is an iconic cultural ritual. It is fun, unfiltered, creative, and leaves you with a tangible keepsake that brings an instant smile.
          </p>
          <p>
            With <strong>MatchaBox</strong>, you don't need to fly to Seoul or hunt down a physical photo kiosk. You can turn any laptop, tablet, or smartphone into a private photo studio. Pose with your loved ones, pick your favorite aesthetic frames, and grab your photo strip instantly via QR Code.
          </p>
        </div>

        <div className="about-story-visual">
          <div className="story-badge-grid">
            <div className="story-stat-card">
              <div className="story-stat-icon">📸</div>
              <div className="story-stat-title">100% Free</div>
              <div className="story-stat-desc">Unlimited photo takes & downloads</div>
            </div>
            <div className="story-stat-card">
              <div className="story-stat-icon">🎨</div>
              <div className="story-stat-title">12+ Themes</div>
              <div className="story-stat-desc">Matcha, Kawaii, Y2K & Vintage</div>
            </div>
            <div className="story-stat-card">
              <div className="story-stat-icon">📱</div>
              <div className="story-stat-title">Cross-Device</div>
              <div className="story-stat-desc">Scan QR to download on phone</div>
            </div>
            <div className="story-stat-card">
              <div className="story-stat-icon">🔒</div>
              <div className="story-stat-title">Privacy-Safe</div>
              <div className="story-stat-desc">Photos rendered locally on Canvas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>What We Stand For</h2>
          <p style={{ color: 'var(--text-muted)' }}>The core principles behind our design and experience</p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <Smile size={24} />
            </div>
            <h3 className="value-title">Playful Simplicity</h3>
            <p className="value-desc">
              No complicated signups or app downloads. Just open your browser, allow camera access, and start snapping!
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Sparkles size={24} />
            </div>
            <h3 className="value-title">Thoughtful Aesthetics</h3>
            <p className="value-desc">
              Every detail—from gentle matcha tones and pastel palettes to typography—is crafted for a soothing, cheerful visual experience.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Shield size={24} />
            </div>
            <h3 className="value-title">High Quality Canvas</h3>
            <p className="value-desc">
              Your photo strips are assembled using HTML5 Canvas with sharp resolution, ready to print or share on Instagram stories.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="about-cta-banner">
        <h2>Ready to Capture Your Moment?</h2>
        <p>Grab your friends, get cozy, and let's create a cute memory together right now.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn"
            onClick={onStartPhotobooth}
            style={{ backgroundColor: 'white', color: 'var(--matcha-dark)', fontWeight: 700 }}
          >
            <Camera size={18} />
            Start Photobooth Now
          </button>
          <button 
            className="btn"
            onClick={onExploreFrames}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', border: '1.5px solid white' }}
          >
            Explore Frames
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
