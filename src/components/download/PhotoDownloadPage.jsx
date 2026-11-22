import React, { useState } from 'react';
import { Download, Share2, Sparkles, Camera, Heart, Check } from 'lucide-react';
import './PhotoDownloadPage.css';

export default function PhotoDownloadPage({ photoUrl, onNavigateHome }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    try {
      // Fetch image blob to force download directly on mobile browsers
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `MatchaBox_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      // Fallback: direct window open
      window.open(photoUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Photo Strip MatchaBox 🍵',
          text: 'Lihat hasil photo strip kenangan kita dari MatchaBox!',
          url: photoUrl
        });
      } catch (err) {
        // user cancelled share
      }
    } else {
      navigator.clipboard.writeText(photoUrl);
      alert('Tautan foto berhasil disalin ke papan klip!');
    }
  };

  return (
    <div className="download-page">
      <div className="download-card">
        {/* Header */}
        <div className="download-header">
          <div className="badge-cute">
            <Heart size={14} color="#E89898" fill="#E89898" />
            <span>Memori Kamu Siap Diunduh</span>
          </div>
          <h1 className="download-title">MatchaBox Photo Strip 🍵</h1>
          <p className="download-desc">
            Hasil foto photobooth studio beresolusi tinggi berhasil dibuka di smartphone kamu.
          </p>
        </div>

        {/* Photo Strip Image */}
        <div className="download-photo-wrapper">
          <img 
            src={photoUrl} 
            alt="Your Photobooth Strip" 
            className="download-photo-img" 
          />
        </div>

        {/* Tip for mobile users */}
        <div className="mobile-save-tip">
          💡 <strong>Tip Pengguna HP (iPhone & Android):</strong> Jika tombol download otomatis tidak merespons pada browser bawaan, kamu bisa <strong>tekan & tahan (hold) gambar di atas</strong> lalu pilih <em>"Simpan ke Foto"</em> atau <em>"Download Gambar"</em>.
        </div>

        {/* Action Buttons */}
        <div className="download-actions-group">
          <button className="btn-mobile-download" onClick={handleDownload}>
            {downloadSuccess ? (
              <>
                <Check size={20} />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Simpan ke Galeri HP</span>
              </>
            )}
          </button>

          <button className="btn-mobile-share" onClick={handleShare}>
            <Share2 size={16} />
            <span>Bagikan ke Teman / Salin Link</span>
          </button>

          <button
            onClick={onNavigateHome}
            style={{
              marginTop: '0.5rem',
              color: 'var(--matcha-dark)',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <Camera size={16} />
            Ambil Foto Baru di MatchaBox
          </button>
        </div>
      </div>
    </div>
  );
}
