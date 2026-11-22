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
  Zap,
  HelpCircle
} from 'lucide-react';
import './QrModal.css';

export default function QrModal({ isOpen, onClose, renderedImageUrl }) {
  const [status, setStatus] = useState('idle'); // 'uploading' | 'success' | 'error' | 'not_configured'
  const [downloadTargetUrl, setDownloadTargetUrl] = useState('');
  const [rawCloudinaryUrl, setRawCloudinaryUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // In-modal configuration form inputs
  const [inputCloudName, setInputCloudName] = useState('');
  const [inputPreset, setInputPreset] = useState('');
  const [isInputNumericWarning, setIsInputNumericWarning] = useState(false);

  // Load initial configuration
  useEffect(() => {
    const config = getCloudinaryConfig();
    setInputCloudName(config.cloudName || '');
    setInputPreset(config.uploadPreset || '');
  }, [isOpen]);

  const initiateUpload = async () => {
    if (!renderedImageUrl) return;

    setStatus('uploading');
    setErrorMessage('');
    setIsDemoMode(false);

    const res = await uploadToCloudinary(renderedImageUrl);

    if (res.success) {
      setRawCloudinaryUrl(res.url);
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

  // Instant demo upload fallback (no registration needed)
  const handleInstantDemoUpload = async () => {
    setStatus('uploading');
    setErrorMessage('');
    setIsDemoMode(true);

    const res = await uploadToDemoHost(renderedImageUrl);

    if (res.success) {
      setRawCloudinaryUrl(res.url);
      const mobilePageUrl = `${window.location.origin}/?photo=${encodeURIComponent(res.url)}`;
      setDownloadTargetUrl(mobilePageUrl);
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(res.error || 'Server demo sementara tidak merespons.');
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

  const handleCloudNameChange = (val) => {
    setInputCloudName(val);
    // Warning if user enters purely numbers (API key)
    setIsInputNumericWarning(/^\d{8,}$/.test(val.trim()));
  };

  const handleSaveConfigAndRetry = (e) => {
    e.preventDefault();
    if (!inputCloudName.trim() || !inputPreset.trim()) {
      alert('Harap isi Cloud Name dan Upload Preset.');
      return;
    }
    if (/^\d{8,}$/.test(inputCloudName.trim())) {
      alert('Perhatian: Kolom Cloud Name tidak boleh diisi dengan API Key (deretan angka). Masukkan Cloud Name akun Anda (contoh: dxy123abc).');
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
              <h4 style={{ color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)' }}>
                {isDemoMode ? 'Mengunggah ke Server Demo...' : 'Menyimpan Foto ke Cloudinary...'}
              </h4>
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
                    className="btn"
                    onClick={() => setStatus('not_configured')}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem', color: 'var(--text-muted)' }}
                  >
                    <Settings size={14} />
                    Ubah Akun Cloudinary
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} color="var(--burgundy-deep)" />
                {isDemoMode ? 'Mode Demo Aktif • Siap di-scan & diunduh' : 'Cloudinary Unsigned Storage Aman • Tanpa API Secret'}
              </div>
            </>
          )}

          {/* 3. Not Configured / Edit Settings State */}
          {status === 'not_configured' && (
            <div style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--burgundy-wine)', marginBottom: '0.75rem' }}>
                <Settings size={20} />
                <h4 style={{ margin: 0, fontFamily: 'var(--font-serif)' }}>Pengaturan Cloudinary (Unsigned Upload)</h4>
              </div>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: '1.5' }}>
                Masukkan <strong>Cloud Name</strong> dan <strong>Upload Preset (Unsigned)</strong> dari akun Cloudinary Anda agar foto tersimpan secara online dan bisa di-scan dari HP mana pun.
              </p>

              {/* Step-by-Step Guide Toggle */}
              <div style={{ marginBottom: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowGuide(!showGuide)}
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--burgundy-deep)',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  <HelpCircle size={14} />
                  {showGuide ? 'Sembunyikan Panduan Cloudinary' : 'Lihat Cara Menemukan Cloud Name & Unsigned Preset'}
                </button>

                {showGuide && (
                  <div style={{
                    marginTop: '0.6rem',
                    padding: '0.75rem',
                    background: 'var(--soft-ivory)',
                    borderRadius: '8px',
                    border: '1px solid var(--dusty-rose)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.5'
                  }}>
                    <strong style={{ color: 'var(--burgundy-deep)', display: 'block', marginBottom: '4px' }}>1. Cloud Name (Bukan API Key):</strong>
                    Lihat di dashboard <a href="https://cloudinary.com/console" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'var(--burgundy-wine)' }}>Cloudinary Console</a> di pojok kiri atas bertuliskan <em>"Cloud name"</em> (biasanya teks unik seperti <code>dyxabcdef</code>). <u>Jangan masukkan API Key (angka panjang)</u>.
                    
                    <strong style={{ color: 'var(--burgundy-deep)', display: 'block', marginTop: '6px', marginBottom: '4px' }}>2. Upload Preset (Wajib Unsigned):</strong>
                    Buka menu <em>Settings (ikon gerigi)</em> &gt; pilih tab <em>Upload</em> &gt; scroll ke bawah ke bagian <em>Upload presets</em> &gt; klik <em>Add upload preset</em>. Pastikan kolom <strong>Signing Mode</strong> diubah dari <em>Signed</em> menjadi <strong>Unsigned</strong> &gt; klik Save. Masukkan nama preset tersebut ke kolom di bawah.
                  </div>
                )}
              </div>

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
                    onChange={(e) => handleCloudNameChange(e.target.value)}
                    className="qr-config-input"
                  />
                  {isInputNumericWarning && (
                    <div style={{ color: '#9E2A2B', fontSize: '0.75rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={13} />
                      Nilai ini adalah angka API Key! Masukkan nama cloud (Cloud name) di dashboard akun Anda.
                    </div>
                  )}
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
                    Simpan & Buat QR Code
                  </button>
                </div>
              </form>

              {/* Instant Demo Option */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed var(--dusty-rose)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Belum punya akun Cloudinary? Anda tetap bisa menguji QR Code sekarang juga:
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleInstantDemoUpload}
                  style={{ width: '100%', fontSize: '0.85rem', padding: '0.6rem', gap: '0.4rem' }}
                >
                  <Zap size={16} color="var(--burgundy-deep)" />
                  Gunakan Mode Demo Instan (Coba Scan Sekarang)
                </button>
              </div>
            </div>
          )}

          {/* 4. Error State */}
          {status === 'error' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem', width: '100%' }}>
              <AlertCircle size={42} color="var(--burgundy-wine)" />
              <h4 style={{ color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)', fontSize: '1.15rem' }}>
                Gagal Mengunggah ke Cloudinary
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
                <strong>Penyebab:</strong> {errorMessage}
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setStatus('not_configured')}
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}
                >
                  <Settings size={14} />
                  Perbaiki Cloud Name / Preset
                </button>

                <button 
                  className="btn btn-secondary"
                  onClick={handleInstantDemoUpload}
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem', gap: '0.4rem' }}
                  title="Coba buat QR Code sekarang menggunakan server demo gratis tanpa konfigurasi"
                >
                  <Zap size={15} color="var(--burgundy-deep)" />
                  Coba Mode Demo Instan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
