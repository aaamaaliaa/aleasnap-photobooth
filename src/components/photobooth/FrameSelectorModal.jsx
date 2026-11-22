import React, { useState, useRef } from 'react';
import { FRAME_CATEGORIES, FRAMES_LIST, createCustomFrame } from '../../data/framesData';
import { Palette, X, Dices, Search, Check, Upload, Sparkles } from 'lucide-react';
import './FrameSelectorModal.css';

export default function FrameSelectorModal({
  isOpen,
  onClose,
  currentFrame,
  onSelectFrame
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customFramesList, setCustomFramesList] = useState([]);
  const customFrameInputRef = useRef(null);

  if (!isOpen) return null;

  // Combine default frames with any user-uploaded custom frames
  const allAvailableFrames = [...customFramesList, ...FRAMES_LIST];

  const filteredFrames = allAvailableFrames.filter((frame) => {
    const matchesCategory = activeCategory === 'all' || frame.category === activeCategory;
    const matchesSearch = 
      frame.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frame.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      frame.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleRandomPick = () => {
    const rand = allAvailableFrames[Math.floor(Math.random() * allAvailableFrames.length)];
    onSelectFrame(rand);
  };

  // Custom Frame PNG Upload Handler
  const handleCustomFrameUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const newFrame = createCustomFrame({
        id: `user-frame-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'cute',
        themeColor: '#769864',
        borderColor: '#769864',
        imageOverlayUrl: dataUrl,
        description: 'Uploaded custom frame design.'
      });

      setCustomFramesList((prev) => [newFrame, ...prev]);
      onSelectFrame(newFrame);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="frame-modal-backdrop" onClick={onClose}>
      {/* Modal Dialog */}
      <div className="frame-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="frame-modal-header">
          <div className="frame-modal-title">
            <Palette size={22} color="var(--matcha-primary)" />
            <span>Pilih Koleksi Frame Photobooth</span>
          </div>
          <button className="frame-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Toolbar: Categories & Search */}
        <div className="frame-modal-toolbar">
          <div className="frame-categories-scroll">
            {FRAME_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`modal-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="frame-modal-subactions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexGrow: 1, maxWidth: '300px' }}>
              <input
                type="text"
                placeholder="Cari frame..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gallery-search-input"
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-random-frame" onClick={handleRandomPick} style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
                <Dices size={16} />
                <span>Random Frame</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => customFrameInputRef.current?.click()}
                style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                title="Unggah file gambar frame PNG custom"
              >
                <Upload size={15} />
                <span>Upload Frame</span>
              </button>
              <input
                type="file"
                ref={customFrameInputRef}
                onChange={handleCustomFrameUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Catalog Body */}
        <div className="frame-modal-body">
          <div className="frame-catalog-grid">
            {filteredFrames.map((frame) => {
              const isSelected = currentFrame?.id === frame.id;

              return (
                <div
                  key={frame.id}
                  className={`frame-catalog-card ${isSelected ? 'active-selected' : ''}`}
                  onClick={() => onSelectFrame(frame)}
                >
                  <div 
                    className="catalog-card-preview"
                    style={{ background: frame.bgStyle }}
                  >
                    {frame.previewThumbUrl ? (
                      <img 
                        src={frame.previewThumbUrl} 
                        alt={frame.title} 
                        style={{ height: '92%', width: 'auto', borderRadius: '6px', objectFit: 'contain', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }} 
                      />
                    ) : (
                      <div 
                        className="catalog-mini-strip"
                        style={{ border: `2px solid ${frame.borderColor}` }}
                      >
                        <div style={{ textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, color: frame.textColor }}>
                          {frame.title}
                        </div>
                        <div className="catalog-mini-slot">1</div>
                        <div className="catalog-mini-slot">2</div>
                        <div className="catalog-mini-slot">3</div>
                      </div>
                    )}
                  </div>

                  <div className="catalog-card-title">
                    <span>{frame.title}</span>
                    <span>{frame.stickerSample}</span>
                  </div>

                  <p className="catalog-card-desc">{frame.description}</p>

                  <button
                    className="catalog-card-btn"
                    style={{
                      backgroundColor: isSelected ? 'var(--matcha-primary)' : 'var(--matcha-soft)',
                      color: isSelected ? 'white' : 'var(--matcha-dark)',
                      border: 'none'
                    }}
                  >
                    {isSelected ? (
                      <>
                        <Check size={14} /> Terpilih
                      </>
                    ) : (
                      'Pilih Frame'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="frame-modal-footer">
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Frame Aktif: <strong style={{ color: 'var(--matcha-dark)' }}>{currentFrame?.title}</strong> {currentFrame?.stickerSample}
          </div>
          <button className="btn btn-primary" onClick={onClose} style={{ padding: '0.5rem 1.4rem', fontSize: '0.9rem' }}>
            Terapkan & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
