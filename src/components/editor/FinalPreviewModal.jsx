import React, { useState } from 'react';
import { Download, QrCode, RotateCcw, Edit3, X, Check, Sparkles, Smartphone, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import './FinalPreviewModal.css';

export default function FinalPreviewModal({
  isOpen,
  onClose,
  renderedImageUrl,
  onEditAgain,
  onRetake,
  frameTitle
}) {
  const [showQrSection, setShowQrSection] = useState(false);

  if (!isOpen || !renderedImageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `MatchaBox_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="preview-modal-backdrop" onClick={onClose}>
      <div className="preview-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="preview-modal-header">
          <div className="preview-modal-title">
            <Sparkles size={22} color="var(--matcha-primary)" />
            <span>Hasil Akhir Photo Strip ✨</span>
          </div>
          <button className="frame-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="preview-modal-body">
          {/* Left: Rendered Canvas Image */}
          <div className="preview-canvas-image-wrapper">
            <img 
              src={renderedImageUrl} 
              alt="Final Photo Strip" 
              className="preview-canvas-image"
            />
          </div>

          {/* Right: Actions & QR Section */}
          <div className="preview-actions-sidebar">
            <div className="preview-info-box">
              <h4 style={{ color: 'var(--matcha-dark)', marginBottom: '0.25rem' }}>
                Photo Strip Siap Diunduh! 📸
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Frame: <strong>{frameTitle}</strong> • Format PNG Kualitas Tinggi.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="preview-actions-buttons">
              {/* 1. Download Button */}
              <button className="btn-download-main" onClick={handleDownload}>
                <Download size={20} />
                <span>Download Photo Strip</span>
              </button>

              {/* 2. Generate QR Code Button */}
              <button 
                className="btn-qr-action"
                onClick={() => setShowQrSection(!showQrSection)}
              >
                <QrCode size={18} />
                <span>{showQrSection ? 'Sembunyikan QR Code' : 'Generate QR Code'}</span>
              </button>

              {/* QR Code Section */}
              {showQrSection && (
                <div style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  border: '2px solid #FFD48A',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  animation: 'modalScaleUp 0.25s ease'
                }}>
                  <QRCodeSVG 
                    value={window.location.origin} 
                    size={140}
                    fgColor="#273322"
                    bgColor="#FFFFFF"
                  />
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <Smartphone size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    Integrasi Cloud Storage & unduh via smartphone siap aktif penuh di <strong>Tahap 6</strong>!
                  </div>
                </div>
              )}

              {/* 3. Edit Again Button */}
              <button 
                className="btn btn-secondary"
                onClick={onEditAgain}
                style={{ justifyContent: 'center' }}
              >
                <Edit3 size={16} />
                <span>Edit Again (Ganti Filter/Stiker)</span>
              </button>

              {/* 4. Retake Button */}
              <button 
                className="btn"
                onClick={onRetake}
                style={{
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  padding: '0.6rem'
                }}
              >
                <RotateCcw size={15} />
                <span>Retake Photos (Ulangi Foto)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
