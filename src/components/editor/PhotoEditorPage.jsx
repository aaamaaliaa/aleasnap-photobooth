import React, { useState } from 'react';
import { PHOTO_FILTERS, STICKER_COLLECTIONS } from '../../constants/editorAssets';
import FrameSelectorModal from '../photobooth/FrameSelectorModal';
import FinalPreviewModal from './FinalPreviewModal';
import { renderPhotoStripCanvas } from '../../utils/canvasRenderer';
import { 
  Sliders, 
  Palette, 
  Smile, 
  Type, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  Trash2, 
  Check, 
  Eye,
  RefreshCw 
} from 'lucide-react';
import './PhotoEditorPage.css';

export default function PhotoEditorPage({
  sessionData,
  onNavigatePhotobooth,
  onNavigateHome
}) {
  // Photos, layout, and frame from session
  const photos = sessionData?.photos || [];
  const layout = sessionData?.layout || { slots: 4, type: 'vertical' };
  const [currentFrame, setCurrentFrame] = useState(sessionData?.frame);

  // Editor states
  const [activeTab, setActiveTab] = useState('filters'); // 'filters' | 'adjust' | 'stickers' | 'text' | 'frames'
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [customText, setCustomText] = useState('');
  const [placedStickers, setPlacedStickers] = useState([]);

  // Modals state
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);
  const [finalPreviewUrl, setFinalPreviewUrl] = useState(null);
  const [isRendering, setIsRendering] = useState(false);

  // Add sticker to strip
  const handleAddSticker = (emoji) => {
    const newSticker = {
      id: `stk-${Date.now()}-${Math.random()}`,
      emoji,
      x: 35 + Math.random() * 30, // center-ish random
      y: 20 + Math.random() * 60,
      size: 46,
      rotation: Math.floor(Math.random() * 30) - 15
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
  };

  const handleRemoveSticker = (id) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
  };

  // Reset adjustments
  const handleResetAdjustments = () => {
    setSelectedFilter('none');
    setBrightness(100);
    setContrast(100);
  };

  // Compute CSS filter string for live preview
  const getCssFilter = () => {
    let str = `brightness(${brightness}%) contrast(${contrast}%)`;
    const filterObj = PHOTO_FILTERS.find((f) => f.id === selectedFilter);
    if (filterObj && filterObj.cssFilter !== 'none') {
      str += ` ${filterObj.cssFilter}`;
    }
    return str;
  };

  // Generate high-res Canvas Final Preview
  const handleGenerateFinalPreview = async () => {
    setIsRendering(true);
    try {
      const dataUrl = await renderPhotoStripCanvas({
        photos,
        frame: currentFrame,
        layout,
        filter: selectedFilter,
        brightness,
        contrast,
        customText,
        stickers: placedStickers
      });
      setFinalPreviewUrl(dataUrl);
    } catch (err) {
      console.error('Final preview rendering failed:', err);
    } finally {
      setIsRendering(false);
    }
  };

  const isGrid = layout.type === 'grid';
  const totalSlots = layout.slots;

  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <div className="editor-container">
      {/* Frame Wardrobe Modal */}
      <FrameSelectorModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        currentFrame={currentFrame}
        onSelectFrame={(f) => {
          setCurrentFrame(f);
          setIsFrameModalOpen(false);
        }}
      />

      {/* Final Preview Modal */}
      <FinalPreviewModal
        isOpen={!!finalPreviewUrl}
        onClose={() => setFinalPreviewUrl(null)}
        renderedImageUrl={finalPreviewUrl}
        onEditAgain={() => setFinalPreviewUrl(null)}
        onRetake={onNavigatePhotobooth}
        frameTitle={currentFrame?.title}
      />

      {/* Top Bar */}
      <div className="editor-topbar">
        <button
          onClick={onNavigatePhotobooth}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={18} /> Kembali ke Photobooth
        </button>

        <span className="badge-cute">
          <Sparkles size={14} color="var(--matcha-primary)" />
          Tahap 5 • Photo Editor & Customizer
        </span>
      </div>

      {/* Studio Grid: Live Strip on Left, Controls on Right */}
      <div className="editor-studio-grid">
        {/* Left: Live Strip Editor Preview with Real-time Filters & Stickers */}
        <div className="editor-canvas-stage">
          <div className="editor-strip-wrapper">
            <div
              className={`editor-strip-card ${isGrid ? 'grid-mode' : ''}`}
              style={{
                background: currentFrame ? currentFrame.bgStyle : '#FFF',
                border: `3px solid ${currentFrame ? currentFrame.borderColor : 'var(--matcha-primary)'}`
              }}
            >
              {/* Header Title */}
              <div
                className="editor-strip-header"
                style={{ color: currentFrame?.textColor || 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <span>{currentFrame?.decorations?.stickers?.[0] || '✨'}</span>
                <span>{customText.trim() ? customText : (currentFrame?.decorations?.headerText || currentFrame?.title)}</span>
                <span>{currentFrame?.decorations?.stickers?.[1] || '♡'}</span>
              </div>

              {/* Photos Slots with live filter applied */}
              <div className={`editor-slots-container ${isGrid ? 'grid-layout' : ''}`}>
                {Array.from({ length: totalSlots }).map((_, index) => (
                  <div key={index} className="editor-slot-item">
                    {photos[index] ? (
                      <img
                        src={photos[index]}
                        alt={`Pose ${index + 1}`}
                        className="editor-slot-photo"
                        style={{ filter: getCssFilter() }}
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                        Slot #{index + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Strip Footer */}
              <div style={{
                marginTop: '12px',
                paddingTop: '6px',
                borderTop: '1px dashed rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.65rem',
                color: currentFrame?.textColor || 'var(--text-muted)'
              }}>
                <span>{todayFormatted}</span>
                <span style={{ fontWeight: 700 }}>
                  {currentFrame?.decorations?.footerStamp || 'MATCHABOX ♡'}
                </span>
              </div>
            </div>

            {/* Placed Interactive Stickers */}
            {placedStickers.map((stk) => (
              <div
                key={stk.id}
                className="placed-sticker"
                style={{
                  left: `${stk.x}%`,
                  top: `${stk.y}%`,
                  fontSize: `${stk.size * 0.65}px`,
                  transform: `translate(-50%, -50%) rotate(${stk.rotation}deg)`
                }}
                title="Sticker (klik silang di panel untuk menghapus)"
              >
                {stk.emoji}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            💡 <em>Semua filter, kecerahan, teks, dan stiker akan ter-render otomatis ke Canvas resolusi tinggi.</em>
          </div>
        </div>

        {/* Right: Tabbed Controls Panel */}
        <div className="editor-controls-panel">
          {/* Tabs Navigation */}
          <div className="editor-tabs-bar">
            <button
              className={`editor-tab-btn ${activeTab === 'filters' ? 'active' : ''}`}
              onClick={() => setActiveTab('filters')}
            >
              <Palette size={16} />
              <span>Filters</span>
            </button>

            <button
              className={`editor-tab-btn ${activeTab === 'adjust' ? 'active' : ''}`}
              onClick={() => setActiveTab('adjust')}
            >
              <Sliders size={16} />
              <span>Adjust</span>
            </button>

            <button
              className={`editor-tab-btn ${activeTab === 'stickers' ? 'active' : ''}`}
              onClick={() => setActiveTab('stickers')}
            >
              <Smile size={16} />
              <span>Stickers</span>
            </button>

            <button
              className={`editor-tab-btn ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
            >
              <Type size={16} />
              <span>Text</span>
            </button>
          </div>

          {/* Tab 1: Filters */}
          {activeTab === 'filters' && (
            <div className="editor-tab-body">
              <div>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Pilih Filter Estetik 🎨
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Filter bernuansa studio foto Korea, analog film, dan pastel.
                </p>
                <div className="filters-preset-grid">
                  {PHOTO_FILTERS.map((f) => (
                    <div
                      key={f.id}
                      className={`filter-preset-card ${selectedFilter === f.id ? 'active' : ''}`}
                      onClick={() => setSelectedFilter(f.id)}
                    >
                      <div className="filter-preset-icon">{f.icon}</div>
                      <div className="filter-preset-name">{f.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Frame Switcher in Filters tab */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ganti Frame</span>
                  <button
                    onClick={() => setIsFrameModalOpen(true)}
                    style={{ fontSize: '0.8rem', color: 'var(--matcha-primary)', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    Buka Semua Frame
                  </button>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Frame saat ini: <strong>{currentFrame?.title}</strong> {currentFrame?.stickerSample}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Adjustments (Brightness & Contrast) */}
          {activeTab === 'adjust' && (
            <div className="editor-tab-body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Kecerahan & Kontras</h4>
                <button
                  onClick={handleResetAdjustments}
                  style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}
                >
                  <RefreshCw size={12} /> Reset
                </button>
              </div>

              {/* Brightness Slider */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span>Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="cute-range-slider"
                />
              </div>

              {/* Contrast Slider */}
              <div className="slider-group">
                <div className="slider-label-row">
                  <span>Contrast</span>
                  <span>{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="cute-range-slider"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Stickers */}
          {activeTab === 'stickers' && (
            <div className="editor-tab-body">
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Tambahkan Stiker Lucu ✨
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Klik stiker untuk menempelkannya pada photo strip.
              </p>

              {STICKER_COLLECTIONS.map((col) => (
                <div key={col.category} className="stickers-category-section">
                  <div className="stickers-category-title">{col.category}</div>
                  <div className="stickers-picker-row">
                    {col.stickers.map((stk, idx) => (
                      <button
                        key={idx}
                        className="btn-pick-sticker"
                        onClick={() => handleAddSticker(stk)}
                      >
                        {stk}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Placed Stickers List with Delete buttons */}
              {placedStickers.length > 0 && (
                <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Stiker Terpasang ({placedStickers.length})
                  </div>
                  <div className="active-stickers-list">
                    {placedStickers.map((stk) => (
                      <div key={stk.id} className="active-sticker-pill">
                        <span style={{ fontSize: '1.2rem' }}>{stk.emoji}</span>
                        <button
                          onClick={() => handleRemoveSticker(stk.id)}
                          style={{ color: '#E88B9E', display: 'flex', alignItems: 'center' }}
                          title="Hapus stiker"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Custom Text Decoration */}
          {activeTab === 'text' && (
            <div className="editor-tab-body">
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Teks Dekorasi Header ✍️
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Tulis nama, tanggal, atau pesan kenangan untuk dicetak pada bagian atas photo strip.
              </p>

              <div className="text-input-group">
                <input
                  type="text"
                  placeholder="Contoh: Amalia & Besties ♡"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="cute-text-input"
                  maxLength={35}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                  <span>Maksimal 35 karakter</span>
                  {customText && (
                    <button
                      onClick={() => setCustomText('')}
                      style={{ color: 'var(--matcha-primary)', fontWeight: 600 }}
                    >
                      Hapus Teks
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action: Preview Final Output */}
          <div className="editor-panel-footer">
            <button
              className="btn btn-primary"
              onClick={handleGenerateFinalPreview}
              disabled={isRendering}
              style={{ width: '100%', fontSize: '1rem', padding: '0.85rem' }}
            >
              <Eye size={18} />
              <span>{isRendering ? 'Rendering Canvas...' : 'Lihat Hasil Akhir (Final Preview)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
