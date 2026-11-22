import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  uploadToCloudinary, 
  uploadToDemoHost,
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
  ShieldCheck,
  Download
} from 'lucide-react';
import './QrModal.css';

export default function QrModal({ isOpen, onClose, renderedImageUrl }) {
  const [status, setStatus] = useState('idle'); // 'uploading' | 'success' | 'error' | 'not_configured'
  const [downloadTargetUrl, setDownloadTargetUrl] = useState('');
  const [rawCloudinaryUrl, setRawCloudinaryUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // In-modal optional configuration form inputs
  const [inputCloudName, setInputCloudName] = useState('');
  const [inputPreset, setInputPreset] = useState('');

  // Load existing config if any
  useEffect(() => {
    const config = getCloudinaryConfig();
    setInputCloudName(config.cloudName || '');
    setInputPreset(config.uploadPreset || '');
  }, [isOpen]);

  // Seamless Automatic Upload: No setup required!
  const initiateUpload = async () => {
    if (!renderedImageUrl) return;

    setStatus('uploading');
    setErrorMessage('');

    const config = getCloudinaryConfig();
    let res = null;

    // 1. If valid Cloudinary credentials exist, try Cloudinary first
    if (config.isConfigured && !/^\d{8,}$/.test(config.cloudName)) {
      res = await uploadToCloudinary(renderedImageUrl);
      // If Cloudinary fails, fallback to automatic instant host so QR code always appears!
      if (!res.success) {
        console.warn('Cloudinary upload issue, fallback to instant free host:', res.error);
        res = await uploadToDemoHost(renderedImageUrl);
      }
    } else {
      // 2. Zero-setup instant host (100% free, no account, no API key needed)
      res = await uploadToDemoHost(renderedImageUrl);
    }

    if (res.success) {
      setRawCloudinaryUrl(res.url);
      const mobilePageUrl = `${window.location.origin}/?photo=${encodeURIComponent(res.url)}`;
      setDownloadTargetUrl(mobilePageUrl);
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Gagal menyiapkan QR Code. Pastikan koneksi internet Anda aktif.');
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

  const handleDirectDownload = () => {
    const link = document.createElement('a');
    link.href = renderedImageUrl;
    link.download = `ALEASNAP_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <h4 style={{ color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)' }}>
                Menyiapkan QR Code...
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Sedang memproses photo strip dan membuat QR Code instan untuk HP Anda.
              </p>
            </div>
          )}

          {/* 2. Success State: Real QR Code Always Appears */}
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
                  Arahkan Kamera HP ke QR Code di Atas
                </p>
                <p>
                  Ponsel Anda akan otomatis membuka halaman foto untuk menyimpan photo strip langsung ke Galeri Foto HP.
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

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => window.open(downloadTargetUrl, '_blank')}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                  >
                    <ExternalLink size={14} />
                    Uji Buka Halaman HP
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={handleDirectDownload}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                  >
                    <Download size={14} />
                    Download Langsung ke Laptop
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--burgundy-deep)" />
                QR Code Siap Digunakan Tanpa Perlu Setup Akun
              </div>
            </>
          )}

          {/* 3. Optional Cloudinary Settings Form */}
          {status === 'not_configured' && (
            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--burgundy-wine)', marginBottom: '0.75rem' }}>
                <Settings size={20} />
                <h4 style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>Pengaturan Cloudinary (Opsional)</h4>
              </div>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: '1.5' }}>
                Jika Anda ingin menyimpan ke akun Cloudinary pribadi, masukkan Cloud Name dan Preset Unsigned di bawah. Jika tidak, QR Code bisa langsung digunakan secara otomatis.
              </p>

              <form onSubmit={handleSaveConfigAndRetry} className="qr-config-form">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: 'var(--burgundy-deep)' }}>
                    Cloud Name (Contoh: dyx123abc — BUKAN angka API Key)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan Cloud Name (teks)"
                    value={inputCloudName}
                    onChange={(e) => setInputCloudName(e.target.value)}
                    className="qr-config-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem', color: 'var(--burgundy-deep)' }}>
                    Upload Preset (Wajib Unsigned, Contoh: aleasnap_preset)
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

                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '0.9rem', padding: '0.7rem' }}
                  >
                    Simpan Akun
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={initiateUpload}
                    style={{ fontSize: '0.9rem', padding: '0.7rem' }}
                  >
                    Pakai Mode Otomatis
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. Error State */}
          {status === 'error' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem', width: '100%' }}>
              <AlertCircle size={42} color="var(--burgundy-wine)" />
              <h4 style={{ color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>
                Kendala Koneksi Internet
              </h4>
              
              <div style={{
                background: 'var(--soft-ivory)',
                border: '1px solid var(--dusty-rose)',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--burgundy-deep)',
                lineHeight: '1.5',
                textAlign: 'left',
                width: '100%',
                maxWidth: '420px'
              }}>
                {errorMessage}
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <button
                  className="btn btn-primary"
                  onClick={initiateUpload}
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                >
                  <RefreshCw size={14} />
                  Coba Buat QR Lagi
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={handleDirectDownload}
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', gap: '0.4rem' }}
                >
                  <Download size={15} color="var(--burgundy-deep)" />
                  Download Langsung (Tanpa QR)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
