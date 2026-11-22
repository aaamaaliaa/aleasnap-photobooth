import React, { useState } from 'react';
import { PHOTO_FILTERS } from '../../constants/editorAssets';
import { FRAMES_LIST } from '../../data/framesData';
import FrameSelectorModal from '../photobooth/FrameSelectorModal';
import FinalPreviewModal from './FinalPreviewModal';
import { renderPhotoStripCanvas } from '../../utils/canvasRenderer';
import { 
  Sliders, 
  Palette, 
  Type, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Eye,
  RefreshCw,
  Layers
} from 'lucide-react';
import './PhotoEditorPage.css';

export default function PhotoEditorPage({
  sessionData,
  onNavigatePhotobooth,
  onNavigateHome
}) {
  const photos = sessionData?.photos || [];
  const layout = sessionData?.layout || { slots: 4, type: 'vertical' };
  const [currentFrame, setCurrentFrame] = useState(sessionData?.frame || FRAMES_LIST[0]);

  // Editor states (Stickers removed completely per user request)
  const [activeTab, setActiveTab] = useState('filters'); // 'filters' | 'adjust' | 'frames' | 'text'
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [customText, setCustomText] = useState('');

  // Modals state
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);
  const [finalPreviewUrl, setFinalPreviewUrl] = useState(null);
  const [isRendering, setIsRendering] = useState(false);

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
        customText
      });
      setFinalPreviewUrl(dataUrl);
    } catch (err) {
      console.error('Final preview rendering failed:', err);
    } finally {
      setIsRendering(false);
    }
  };

  const isGrid = layout.type === 'grid';
  const totalSlots = currentFrame?.slots || layout.slots || 4;

  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  // Check if current frame is a special overlay frame (Cherry Coquette or Airmail Polaroid)
  const isCustomOverlayFrame = Boolean(currentFrame?.imageOverlayUrl && currentFrame?.slotCoords);

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
          Photo Editor & Tone Studio
        </span>
      </div>

      {/* Studio Grid: Live Strip on Left, Controls on Right */}
      <div className="editor-studio-grid">
        {/* Left: Live Strip Editor Preview */}
        <div className="editor-canvas-stage">
          <div className="editor-strip-wrapper">
            {/* If special overlay frame (Cherry Coquette or Airmail) */}
            {isCustomOverlayFrame ? (
              <div 
                style={{
                  position: 'relative',
                  width: '260px',
                  aspectRatio: `${currentFrame.sourceDimensions?.w || 576} / ${currentFrame.sourceDimensions?.h || 1024}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.22)',
                  backgroundColor: currentFrame.themeColor || '#FFF'
                }}
              >
                {/* User photos placed in precise cutout slots */}
                {currentFrame.slotCoords.map((coord, idx) => {
                  const sw = currentFrame.sourceDimensions?.w || 576;
                  const sh = currentFrame.sourceDimensions?.h || 1024;

                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: `${(coord.x / sw) * 100}%`,
                        top: `${(coord.y / sh) * 100}%`,
                        width: `${(coord.w / sw) * 100}%`,
                        height: `${(coord.h / sh) * 100}%`,
                        overflow: 'hidden',
                        backgroundColor: '#EAE5DE'
                      }}
                    >
                      {photos[idx] ? (
                        <img
                          src={photos[idx]}
                          alt={`Pose ${idx + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: getCssFilter()
                          }}
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9C9488', fontSize: '0.75rem', fontWeight: 600 }}>
                          Pose #{idx + 1}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Frame artwork overlay with transparent windows */}
                <img
                  src={currentFrame.imageOverlayUrl}
                  alt={currentFrame.title}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            ) : (
              /* Programmatic Clean Strip Card */
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
                  style={{ color: currentFrame?.textColor || 'var(--text-main)' }}
                >
                  {customText.trim() ? customText : (currentFrame?.decorations?.headerText || currentFrame?.title)}
                </div>

                {/* Photos Slots */}
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
                          Pose #{index + 1}
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
                    {currentFrame?.decorations?.footerStamp || 'MATCHABOX'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            💡 <em>Semua filter warna, pencahayaan, dan teks akan ter-render otomatis ke Canvas resolusi tinggi.</em>
          </div>
        </div>

        {/* Right: Tabbed Controls Panel */}
        <div className="editor-controls-panel">
          {/* Tabs Navigation (Stickers tab removed cleanly) */}
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
              className={`editor-tab-btn ${activeTab === 'frames' ? 'active' : ''}`}
              onClick={() => setActiveTab('frames')}
            >
              <Layers size={16} />
              <span>Frames</span>
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
                  Filter bernuansa studio foto Korea, analog film, dan pastel natural.
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

          {/* Tab 3: Frames Quick Switcher */}
          {activeTab === 'frames' && (
            <div className="editor-tab-body">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Ganti Desain Frame</h4>
                <button
                  onClick={() => setIsFrameModalOpen(true)}
                  style={{ fontSize: '0.8rem', color: 'var(--matcha-primary)', fontWeight: 700, textDecoration: 'underline' }}
                >
                  Buka Galeri Lengkap
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Frame aktif: <strong>{currentFrame?.title}</strong>
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {FRAMES_LIST.slice(0, 6).map((f) => {
                  const isCur = currentFrame?.id === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setCurrentFrame(f)}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: isCur ? '2px solid var(--matcha-primary)' : '1.5px solid var(--border-light)',
                        background: isCur ? 'var(--matcha-soft)' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>{f.stickerSample}</span>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                            {f.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {f.slots} Foto • {f.category}
                          </div>
                        </div>
                      </div>
                      {isCur && <Check size={16} color="var(--matcha-primary)" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Custom Text Decoration */}
          {activeTab === 'text' && (
            <div className="editor-tab-body">
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Teks Dekorasi Header ✍️
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Tulis nama, tanggal, atau pesan kenangan untuk dicetak pada bagian photo strip.
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
