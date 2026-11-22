import React from 'react';
import { Camera, Sparkles, Shield, Smartphone, Palette, ShieldCheck, ArrowRight } from 'lucide-react';
import './AboutPage.css';

export default function AboutPage({ onStartPhotobooth, onExploreFrames }) {
  return (
    <div className="about-page">
      {/* Header */}
      <div className="about-header">
        <div className="badge-cute" style={{ marginBottom: '0.8rem' }}>
          <Sparkles size={14} color="var(--burgundy-deep)" />
          <span>Studio Philosophy</span>
        </div>
        <h1 className="about-title">Capturing Memories with Timeless Elegance</h1>
        <p className="about-lead">
          ALEASNAP diciptakan dari hasrat untuk mengabadikan momen spontan, hangat, dan berharga dalam format photobooth digital berestetika tinggi.
        </p>
      </div>

      {/* Story Section */}
      <div className="about-story-grid">
        <div className="about-story-text">
          <h2>A Moment Worth Keeping</h2>
          <p>
            Photobooth adalah salah satu cara paling autentik untuk mengabadikan kebersamaan bersama sahabat, pasangan, maupun momen personal. Setiap jepretan menyimpan memori jujur dan berharga yang tak lekang oleh waktu.
          </p>
          <p>
            Dengan <strong>ALEASNAP</strong>, Anda dapat mengubah laptop, tablet, atau smartphone menjadi studio photobooth pribadi tanpa perlu mengantre di bilik foto fisik. Pilih frame editorial favorit Anda, atur filter pencahayaan studio, dan simpan photo strip beresolusi tinggi seketika melalui kode QR.
          </p>
        </div>

        <div className="about-story-visual">
          <div className="story-badge-grid">
            <div className="story-stat-card">
              <div className="story-stat-icon">
                <Camera size={26} color="var(--burgundy-deep)" />
              </div>
              <div className="story-stat-title">Studio Grade</div>
              <div className="story-stat-desc">Resolusi tajam siap simpan & cetak</div>
            </div>
            <div className="story-stat-card">
              <div className="story-stat-icon">
                <Palette size={26} color="var(--burgundy-deep)" />
              </div>
              <div className="story-stat-title">Curated Themes</div>
              <div className="story-stat-desc">Frame estetis bernuansa elegan</div>
            </div>
            <div className="story-stat-card">
              <div className="story-stat-icon">
                <Smartphone size={26} color="var(--burgundy-deep)" />
              </div>
              <div className="story-stat-title">Cross-Device</div>
              <div className="story-stat-desc">Pindai QR untuk simpan di ponsel</div>
            </div>
            <div className="story-stat-card">
              <div className="story-stat-icon">
                <ShieldCheck size={26} color="var(--burgundy-deep)" />
              </div>
              <div className="story-stat-title">Privacy First</div>
              <div className="story-stat-desc">Foto diproses lokal di browser</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', color: 'var(--burgundy-deep)' }}>Our Core Values</h2>
          <p style={{ color: 'var(--text-muted)' }}>Prinsip desain dan kenyamanan dalam setiap pengalaman foto</p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <Camera size={24} />
            </div>
            <h3 className="value-title">Seamless Simplicity</h3>
            <p className="value-desc">
              Tanpa registrasi akun yang rumit atau unduhan aplikasi. Cukup izinkan akses kamera pada browser dan sesi foto Anda siap dimulai.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Sparkles size={24} />
            </div>
            <h3 className="value-title">Editorial Aesthetics</h3>
            <p className="value-desc">
              Setiap detail tata letak, palet Deep Burgundy, dan Warm Cream dirancang untuk menghadirkan visual yang tenang, anggun, dan berkelas.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Shield size={24} />
            </div>
            <h3 className="value-title">Instant Mobile Access</h3>
            <p className="value-desc">
              Photo strip digenerate menggunakan HTML5 Canvas dengan presisi tinggi dan dapat langsung ditransfer ke smartphone lewat QR Code.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="about-cta-banner">
        <h2>A Moment Worth Keeping</h2>
        <p>Ajak sahabat atau abadikan momen terbaik Anda bersama studio photobooth ALEASNAP sekarang.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn"
            onClick={onStartPhotobooth}
            style={{ backgroundColor: 'var(--soft-ivory)', color: 'var(--burgundy-deep)', fontWeight: 600, border: 'none' }}
          >
            <Camera size={18} />
            Mulai Photobooth
          </button>
          <button 
            className="btn"
            onClick={onExploreFrames}
            style={{ backgroundColor: 'transparent', color: 'var(--soft-ivory)', border: '1px solid var(--dusty-rose)' }}
          >
            Jelajahi Frame
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
