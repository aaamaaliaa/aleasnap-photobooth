import React, { useState } from 'react';
import { Download, QrCode, RotateCcw, Edit3, X, Sparkles } from 'lucide-react';
import QrModal from './QrModal';
import './FinalPreviewModal.css';

export default function FinalPreviewModal({
  isOpen,
  onClose,
  renderedImageUrl,
  onEditAgain,
  onRetake,
  frameTitle
}) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  if (!isOpen || !renderedImageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `ALEASNAP_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Real QR Modal */}
      <QrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        renderedImageUrl={renderedImageUrl}
      />

      <div className="preview-modal-backdrop" onClick={onClose}>
        <div className="preview-modal-card" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="preview-modal-header">
            <div className="preview-modal-title">
              <Sparkles size={22} color="var(--burgundy-deep)" />
              <span>Hasil Akhir Photo Strip</span>
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

            {/* Right: Actions */}
            <div className="preview-actions-sidebar">
              <div className="preview-info-box">
                <h4 style={{ color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>
                  Photo Strip Siap Diunduh
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Frame: <strong>{frameTitle}</strong> • Format PNG Resolusi Penuh.
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
                  onClick={() => setIsQrModalOpen(true)}
                >
                  <QrCode size={18} />
                  <span>Download Lewat QR Code (HP)</span>
                </button>

                {/* 3. Edit Again Button */}
                <button 
                  className="btn btn-secondary"
                  onClick={onEditAgain}
                  style={{ justifyContent: 'center' }}
                >
                  <Edit3 size={16} />
                  <span>Edit Kembali (Filter & Teks)</span>
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
                  <span>Ulangi Sesi Foto (Retake)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
