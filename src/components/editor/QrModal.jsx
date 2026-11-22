import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  uploadToCloudinary, 
  getCloudinaryConfig, 
  saveCloudinaryConfig 
} from '../../utils/cloudinary';
import { 
  QrCode, 
  X, 
  Smartphone, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  RefreshCw, 
  Settings,
  ShieldCheck 
} from 'lucide-react';
import './QrModal.css';

export default function QrModal({ isOpen, onClose, renderedImageUrl }) {
  const [status, setStatus] = useState('idle'); // 'uploading' | 'success' | 'error' | 'not_configured'
  const [downloadTargetUrl, setDownloadTargetUrl] = useState('');
  const [rawCloudinaryUrl, setRawCloudinaryUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // In-modal configuration form inputs
  const [inputCloudName, setInputCloudName] = useState('');
  const [inputPreset, setInputPreset] = useState('');

  const initiateUpload = async () => {
    if (!renderedImageUrl) return;

    setStatus('uploading');
    setErrorMessage('');

    const res = await uploadToCloudinary(renderedImageUrl);

    if (res.success) {
      setRawCloudinaryUrl(res.url);
      // Link directed to dedicated mobile download page
      const mobilePageUrl = `${window.location.origin}/?photo=${encodeURIComponent(res.url)}`;
      setDownloadTargetUrl(mobilePageUrl);
      setStatus('success');
    } else if (res.notConfigured) {
      setStatus('not_configured');
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Terjadi kesalahan saat mengunggah foto ke Cloudinary.');
    }
  };

  useEffect(() => {
    if (isOpen && renderedImageUrl) {
      initiateUpload();
    }
  }, [isOpen, renderedImageUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadTargetUrl || rawCloudinaryUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveConfigAndRetry = (e) => {
    e.preventDefault();
    if (!inputCloudName.trim() || !inputPreset.trim()) {
      alert('Harap isi Cloud Name dan Upload Preset.');
      return;
    }
    saveCloudinaryConfig(inputCloudName, inputPreset);
    initiateUpload();
  };

  return (
    <div className="qr-modal-backdrop" onClick={onClose}>
      <div className="qr-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="qr-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)' }}>
            <QrCode size={20} color="var(--burgundy-deep)" />
            <span>Pindai QR untuk Download di Smartphone</span>
          </div>
          <button className="frame-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="qr-modal-body">
          {/* 1. Uploading State */}
          {status === 'uploading' && (
            <div className="qr-loading-box">
              <div className="qr-spinner"></div>
              <h4 style={{ color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)' }}>Menyimpan Foto ke Cloudinary...</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Sedang memproses photo strip beresolusi tinggi dan menyiapkan QR Code instan.
              </p>
            </div>
          )}

          {/* 2. Success State: Real QR Code */}
          {status === 'success' && (
            <>
              <div className="qr-code-box">
                <QRCodeSVG
                  value={downloadTargetUrl}
                  size={200}
                  level="M"
                  includeMargin={true}
                  fgColor="#4A1727"
                  bgColor="#FFFFFF"
                />
              </div>

              <div className="qr-instructions">
                <p style={{ fontWeight: 600, color: 'var(--burgundy-deep)', marginBottom: '0.3rem' }}>
                  Buka Kamera HP & Arahkan ke QR Code
                </p>
                <p>
                  Smartphone Anda akan diarahkan ke halaman unduh khusus untuk menyimpan photo strip langsung ke Galeri Foto ponsel.
                </p>
              </div>

              {/* Copy URL & Open Test */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
                <div className="qr-link-preview">
                  <span className="qr-link-text">{downloadTargetUrl}</span>
                  <button 
                    onClick={handleCopy} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--burgundy-deep)', display: 'flex' }}
                    title="Salin tautan"
                  >
                    {copied ? <Check size={16} color="green" /> : <Copy size={16} />}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => window.open(downloadTargetUrl, '_blank')}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                  >
                    <ExternalLink size={14} />
                    Uji Buka Halaman HP
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--burgundy-deep)" />
                Cloudinary Storage Aman • Tanpa API Secret di Frontend
              </div>
            </>
          )}

          {/* 3. Not Configured State */}
          {status === 'not_configured' && (
            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--burgundy-wine)', marginBottom: '0.75rem' }}>
                <Settings size={20} />
                <h4 style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>Pengaturan Cloudinary Diperlukan</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                Untuk mengunggah foto lintas perangkat secara gratis tanpa server backend, masukkan <strong>Cloud Name</strong> dan <strong>Unsigned Upload Preset</strong> Cloudinary Anda (atau atur di file <code>.env</code>).
              </p>

              <form onSubmit={handleSaveConfigAndRetry} className="qr-config-form">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: 'var(--burgundy-deep)' }}>
                    Cloud Name (cth: mycloud)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan Cloud Name"
                    value={inputCloudName}
                    onChange={(e) => setInputCloudName(e.target.value)}
                    className="qr-config-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: 'var(--burgundy-deep)' }}>
                    Upload Preset (Unsigned, cth: aleasnap_preset)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan Upload Preset"
                    value={inputPreset}
                    onChange={(e) => setInputPreset(e.target.value)}
                    className="qr-config-input"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '0.5rem', fontSize: '0.9rem' }}
                >
                  Simpan & Lanjutkan Generate QR
                </button>
              </form>
            </div>
          )}

          {/* 4. Error State */}
          {status === 'error' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
              <AlertCircle size={40} color="var(--burgundy-wine)" />
              <h4 style={{ color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)' }}>Gagal Mengunggah ke Cloudinary</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '360px' }}>
                {errorMessage}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-primary"
                  onClick={initiateUpload}
                  style={{ fontSize: '0.85rem' }}
                >
                  <RefreshCw size={14} />
                  Coba Upload Lagi
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setStatus('not_configured')}
                  style={{ fontSize: '0.85rem' }}
                >
                  Ubah Pengaturan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
