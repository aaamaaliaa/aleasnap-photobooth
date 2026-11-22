import React from 'react';
import { FRAMES_LIST } from '../../data/framesData';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import './FeaturedFrames.css';

export default function FeaturedFrames({ onSelectFrame, onViewAllFrames }) {
  // Take top 4-6 popular frames
  const featured = FRAMES_LIST.filter(f => f.isPopular).slice(0, 4);

  return (
    <section className="featured-section">
      <div className="section-header">
        <div className="section-badge">
          <Sparkles size={14} />
          <span>Curated Collection</span>
        </div>
        <h2 className="section-title">Featured Aesthetic Frames</h2>
        <p className="section-subtitle">
          Choose from cute kawaii pastels, vintage film borders, Y2K retro, and signature matcha designs.
        </p>
      </div>

      <div className="frames-grid">
        {featured.map((frame) => (
          <div key={frame.id} className="frame-card">
            {/* Visual Mini Frame Preview */}
            <div 
              className="frame-card-preview"
              style={{ background: frame.bgStyle }}
            >
              <div 
                className="frame-mini-strip"
                style={{ border: `2px solid ${frame.borderColor}` }}
              >
                <div style={{ textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, color: frame.textColor }}>
                  {frame.stickerSample}
                </div>
                {Array.from({ length: Math.min(frame.slots, 3) }).map((_, idx) => (
                  <div key={idx} className="frame-mini-slot">
                    <span>{idx === 0 ? '✨' : idx === 1 ? '📸' : '🤍'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Frame Details */}
            <div className="frame-card-body">
              <div className="frame-card-tags">
                {frame.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="frame-tag">{tag}</span>
                ))}
              </div>

              <div className="frame-card-title">
                <span>{frame.title}</span>
                <span>{frame.stickerSample}</span>
              </div>

              <p className="frame-card-desc">{frame.description}</p>

              <div className="frame-card-footer">
                <span className="frame-slots-badge">{frame.slots} Photo Slots</span>
                <button 
                  className="btn-select-frame"
                  onClick={() => onSelectFrame(frame)}
                >
                  Use Frame
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-footer-cta">
        <button 
          className="btn btn-secondary"
          onClick={onViewAllFrames}
          style={{ fontSize: '1rem', padding: '0.75rem 1.8rem' }}
        >
          View All Frames Collection
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
