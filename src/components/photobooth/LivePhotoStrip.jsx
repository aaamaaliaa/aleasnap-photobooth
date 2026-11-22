import React from 'react';
import { RotateCcw, Check, Sparkles, ArrowRight, Upload } from 'lucide-react';

export default function LivePhotoStrip({
  selectedFrame,
  layout,
  capturedPhotos,
  activeSlotIndex,
  isSessionActive,
  onRetakeAll,
  onRetakeSingleSlot,
  onProceedToEditor,
  onUploadPhotos
}) {
  const isGrid = layout.type === 'grid';
  const totalSlots = layout.slots;
  const isCompleted = capturedPhotos.filter(Boolean).length === totalSlots && !isSessionActive;

  const todayFormatted = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();

  return (
    <div className="live-strip-stage">
      <div className="live-strip-header">
        <div className="live-strip-title">
          <span>Live Photo Strip</span>
          <span>{selectedFrame?.stickerSample || '🍵'}</span>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {capturedPhotos.filter(Boolean).length}/{totalSlots} shots
        </span>
      </div>

      {/* The Styled Frame Strip Preview */}
      <div 
        className={`live-strip-card ${isGrid ? 'grid-mode' : ''}`}
        style={{
          background: selectedFrame ? selectedFrame.bgStyle : 'linear-gradient(135deg, #F9FAF5 0%, #EBF2E3 100%)',
          border: `3px solid ${selectedFrame ? selectedFrame.borderColor : 'var(--matcha-primary)'}`
        }}
      >
        {/* Strip Header Brand */}
        <div 
          className="live-strip-brand"
          style={{ color: selectedFrame?.textColor || 'var(--text-main)' }}
        >
          MatchaBox • {selectedFrame?.title || 'Studio'}
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
          <span style={{ fontWeight: 700 }}>MATCHABOX ♡</span>
        </div>
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
        <div style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
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
    </div>
  );
}
