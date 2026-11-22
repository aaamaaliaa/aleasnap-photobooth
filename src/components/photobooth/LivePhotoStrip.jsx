import React, { useState } from 'react';
import { RotateCcw, Check, Sparkles, ArrowRight, Upload, Image as ImageIcon, Eye } from 'lucide-react';
import { renderPhotoStripCanvas } from '../../utils/canvasRenderer';

export default function LivePhotoStrip({
  selectedFrame,
  layout,
  capturedPhotos,
  activeSlotIndex,
  isSessionActive,
  onRetakeAll,
  onRetakeSingleSlot,
  onProceedToEditor,
  onUploadPhotos,
  onOpenFrameSelector
}) {
  const [canvasModalUrl, setCanvasModalUrl] = useState(null);
  const [isRenderingCanvas, setIsRenderingCanvas] = useState(false);

  const isGrid = layout.type === 'grid';
  const totalSlots = layout.slots;
  const isCompleted = capturedPhotos.filter(Boolean).length === totalSlots && !isSessionActive;

  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  const handleTestCanvasRender = async () => {
    setIsRenderingCanvas(true);
    try {
      const url = await renderPhotoStripCanvas({
        photos: capturedPhotos,
        frame: selectedFrame,
        layout: layout
      });
      setCanvasModalUrl(url);
    } catch (err) {
      console.error('Canvas render error:', err);
    } finally {
      setIsRenderingCanvas(false);
    }
  };

  return (
    <div className="live-strip-stage">
      <div className="live-strip-header">
        <div className="live-strip-title">
          <span>Live Photo Strip</span>
          <span>{selectedFrame?.stickerSample || '🍵'}</span>
        </div>
        <button
          onClick={onOpenFrameSelector}
          style={{
            fontSize: '0.8rem',
            color: 'var(--matcha-primary)',
            fontWeight: 700,
            background: 'var(--matcha-soft)',
            padding: '3px 8px',
            borderRadius: '12px'
          }}
        >
          Ganti Frame
        </button>
      </div>

      {/* The Styled Frame Strip Preview */}
      <div 
        className={`live-strip-card ${isGrid ? 'grid-mode' : ''}`}
        style={{
          background: selectedFrame ? selectedFrame.bgStyle : 'linear-gradient(135deg, #F9FAF5 0%, #EBF2E3 100%)',
          border: `3px solid ${selectedFrame ? selectedFrame.borderColor : 'var(--matcha-primary)'}`
        }}
      >
        {/* Strip Header Brand & Stickers */}
        <div 
          className="live-strip-brand"
          style={{ color: selectedFrame?.textColor || 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <span>{selectedFrame?.decorations?.stickers?.[0] || '✨'}</span>
          <span>{selectedFrame?.decorations?.headerText || selectedFrame?.title || 'MatchaBox'}</span>
          <span>{selectedFrame?.decorations?.stickers?.[1] || '♡'}</span>
        </div>

        {/* Dynamic Slots (Vertical or Grid) */}
        <div className={`live-slots-container ${isGrid ? 'grid-layout' : ''}`}>
          {Array.from({ length: totalSlots }).map((_, index) => {
            const photoSrc = capturedPhotos[index];
            const isRecording = isSessionActive && activeSlotIndex === index;

            return (
              <div 
                key={index}
                className={`live-slot-item ${isRecording ? 'active-recording' : ''}`}
              >
                {photoSrc ? (
                  <>
                    <img 
                      src={photoSrc} 
                      alt={`Pose ${index + 1}`} 
                      className="live-slot-photo" 
                    />
                    {!isSessionActive && (
                      <button
                        className="slot-retake-btn"
                        onClick={() => onRetakeSingleSlot(index)}
                        title={`Retake Pose #${index + 1}`}
                      >
                        <RotateCcw size={13} />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="live-slot-empty">
                    <span>{isRecording ? '📸' : `Slot #${index + 1}`}</span>
                    <span style={{ fontSize: '0.65rem' }}>
                      {isRecording ? 'Posing...' : 'Ready'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Strip Footer with Date & Barcode */}
        <div style={{
          marginTop: '10px',
          paddingTop: '6px',
          borderTop: '1px dashed rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.65rem',
          color: selectedFrame?.textColor || 'var(--text-muted)'
        }}>
          <span>{todayFormatted}</span>
          <span style={{ fontWeight: 700 }}>
            {selectedFrame?.decorations?.footerStamp || 'MATCHABOX ♡'}
          </span>
        </div>
      </div>

      {/* Canvas Render Verification Button */}
      <div style={{ marginTop: '0.85rem', width: '100%' }}>
        <button
          onClick={handleTestCanvasRender}
          disabled={isRenderingCanvas || capturedPhotos.filter(Boolean).length === 0}
          className="btn btn-secondary"
          style={{ width: '100%', fontSize: '0.8rem', padding: '0.45rem' }}
          title="Uji render foto dan frame langsung ke Canvas API"
        >
          <Eye size={14} />
          {isRenderingCanvas ? 'Rendering Canvas...' : 'Uji Render Canvas Asli'}
        </button>
      </div>

      {/* Post-Session Controls when all photos are ready */}
      {isCompleted && (
        <div className="session-completed-actions">
          <button 
            className="btn btn-primary"
            onClick={onProceedToEditor}
            style={{ width: '100%', fontSize: '0.95rem' }}
          >
            <Sparkles size={16} />
            Lanjut ke Editor Foto
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn btn-secondary"
            onClick={onRetakeAll}
            style={{ width: '100%', fontSize: '0.85rem' }}
          >
            <RotateCcw size={14} />
            Retake Sesi Foto
          </button>
        </div>
      )}

      {/* Manual Upload Option if user wants to swap photos */}
      {!isSessionActive && (
        <div style={{ marginTop: '0.75rem', width: '100%', textAlign: 'center' }}>
          <button
            onClick={onUploadPhotos}
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <Upload size={13} />
            Upload foto dari galeri
          </button>
        </div>
      )}

      {/* Canvas Preview Modal */}
      {canvasModalUrl && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setCanvasModalUrl(null)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem',
              maxWidth: '450px',
              maxHeight: '90vh',
              overflowY: 'auto',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--matcha-dark)' }}>
              Hasil Render HTML5 Canvas
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Frame <strong>{selectedFrame?.title}</strong> berhasil di-render bersama foto pada Canvas beresolusi tinggi.
            </p>
            <img 
              src={canvasModalUrl} 
              alt="Canvas Strip Result" 
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.2)', marginBottom: '1rem' }} 
            />
            <button 
              className="btn btn-primary"
              onClick={() => setCanvasModalUrl(null)}
              style={{ width: '100%', fontSize: '0.9rem' }}
            >
              Tutup Preview Canvas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
