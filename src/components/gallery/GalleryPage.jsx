import React, { useState } from 'react';
import { FRAME_CATEGORIES, FRAMES_LIST } from '../../data/framesData';
import { Palette, Sparkles, Dices, Search, Check, Camera } from 'lucide-react';
import './GalleryPage.css';

export default function GalleryPage({ selectedFrame, onSelectFrame, onStartPhotobooth }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter frames based on category and search
  const filteredFrames = FRAMES_LIST.filter((frame) => {
    const matchesCategory = activeCategory === 'all' || frame.category === activeCategory;
    const matchesSearch = 
      frame.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frame.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frame.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Handle Random Frame Selection
  const handleRandomFrame = () => {
    const randomIndex = Math.floor(Math.random() * FRAMES_LIST.length);
    const chosen = FRAMES_LIST[randomIndex];
    onSelectFrame(chosen);
  };

  return (
    <div className="gallery-page">
      {/* Header */}
      <div className="gallery-header">
        <div className="badge-cute" style={{ marginBottom: '0.8rem' }}>
          <Palette size={14} color="var(--matcha-primary)" />
          <span>Aesthetic Frame Wardrobe</span>
        </div>
        <h1 className="gallery-title">Choose Your Vibe</h1>
        <p className="gallery-lead">
          Explore our collection of cute Korean photobooth frames. From classic matcha green to cherry blossoms, analog film, and Y2K holographic designs.
        </p>
      </div>

      {/* Control Bar: Categories & Tools */}
      <div className="gallery-controls-bar">
        {/* Category Filter Tabs */}
        <div className="category-tabs">
          {FRAME_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`cat-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Random Frame Action */}
        <div className="gallery-sub-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Search frames by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gallery-search-input"
            />
          </div>

          <button className="btn-random-frame" onClick={handleRandomFrame}>
            <Dices size={18} />
            <span>Surprise Me (Random Frame)</span>
          </button>
        </div>
      </div>

      {/* Frames Grid */}
      {filteredFrames.length === 0 ? (
        <div className="empty-gallery">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
          <h3 style={{ marginBottom: '0.5rem' }}>No frames found</h3>
          <p>Try searching with another keyword or pick another category.</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredFrames.map((frame) => {
            const isCurrent = selectedFrame?.id === frame.id;

            return (
              <div 
                key={frame.id} 
                className={`gallery-card ${isCurrent ? 'selected' : ''}`}
              >
                {/* Visual Mini Frame Preview */}
                <div 
                  className="gallery-card-preview"
                  style={{ background: frame.bgStyle }}
                >
                  <div 
                    className="gallery-photo-strip"
                    style={{ border: `2px solid ${frame.borderColor}` }}
                  >
                    <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: frame.textColor }}>
                      {frame.stickerSample}
                    </div>
                    {Array.from({ length: Math.min(frame.slots, 3) }).map((_, idx) => (
                      <div key={idx} className="gallery-photo-slot">
                        <span>{idx === 0 ? '✨' : idx === 1 ? '📸' : '🤍'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Details */}
                <div className="gallery-card-body">
                  <div className="gallery-tags-row">
                    {frame.tags.map((tag, i) => (
                      <span key={i} className="gallery-tag-pill">{tag}</span>
                    ))}
                  </div>

                  <div className="gallery-card-title">
                    <span>{frame.title}</span>
                    <span>{frame.stickerSample}</span>
                  </div>

                  <p className="gallery-card-desc">{frame.description}</p>

                  <div className="gallery-card-footer">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500 }}>
                      {frame.slots} Photo Slots
                    </span>

                    <button 
                      className="btn"
                      onClick={() => onSelectFrame(frame)}
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.875rem',
                        backgroundColor: isCurrent ? 'var(--matcha-primary)' : 'var(--matcha-soft)',
                        color: isCurrent ? 'white' : 'var(--matcha-dark)',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {isCurrent ? (
                        <>
                          <Check size={16} /> Selected
                        </>
                      ) : (
                        'Use Frame'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Ready Action if a frame is selected */}
      {selectedFrame && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 90,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '2px solid var(--matcha-primary)',
          borderRadius: 'var(--radius-full)',
          padding: '0.6rem 1.4rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
            <span>Active Frame: <strong>{selectedFrame.title}</strong></span>
            <span>{selectedFrame.stickerSample}</span>
          </div>

          <button 
            className="btn btn-primary"
            onClick={onStartPhotobooth}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
          >
            <Camera size={16} />
            Go to Photobooth
          </button>
        </div>
      )}
    </div>
  );
}
