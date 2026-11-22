import React from 'react';
import { Camera, Sparkles, Layout, Sliders, QrCode, ArrowRight, Sun, FlipHorizontal, RotateCcw } from 'lucide-react';
import './HowItWorksPage.css';

export default function HowItWorksPage({ onStartPhotobooth }) {
  const steps = [
    {
      number: '01',
      tag: 'Langkah 1 • Format',
      title: 'Pilih Tata Letak Foto',
      desc: 'Tentukan format photo strip yang Anda inginkan: 2 foto, 3 foto, atau format klasik 4 foto. Sesi kamera akan secara otomatis menyesuaikan jumlah jepretan.',
      visual: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '38px', height: '60px', background: 'var(--soft-ivory)', border: '1.5px solid var(--dusty-rose)', borderRadius: '6px', display: 'flex', flexDirection: 'column', padding: '3px', gap: '3px' }}>
            <div style={{ background: 'var(--warm-cream)', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: 'var(--warm-cream)', flex: 1, borderRadius: '2px' }}></div>
          </div>
          <div style={{ width: '42px', height: '80px', background: 'var(--soft-ivory)', border: '1.5px solid var(--burgundy-wine)', borderRadius: '6px', display: 'flex', flexDirection: 'column', padding: '3px', gap: '3px' }}>
            <div style={{ background: 'var(--dusty-rose-light)', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: 'var(--dusty-rose-light)', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: 'var(--dusty-rose-light)', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: 'var(--dusty-rose-light)', flex: 1, borderRadius: '2px' }}></div>
          </div>
        </div>
      )
    },
    {
      number: '02',
      tag: 'Langkah 2 • Sesi Pose',
      title: 'Ambil Foto Terbaik',
      desc: 'Berikan izin kamera, periksa preview, dan aktifkan mirror mode. Mulai sesi foto dengan hitungan mundur otomatis 3 detik untuk setiap jepretan pose.',
      visual: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '84px', height: '56px', background: 'var(--burgundy-deep)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Camera size={22} color="var(--dusty-rose-light)" />
          </div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--burgundy-deep)', textTransform: 'uppercase' }}>
            COUNTDOWN: 3... 2... 1
          </span>
        </div>
      )
    },
    {
      number: '03',
      tag: 'Langkah 3 • Kustomisasi',
      title: 'Pilih Frame & Filter',
      desc: 'Pilih tema frame eksklusif (ALEASNAP Signature, Cherry Coquette, Retro Airmail, Warm Ivory), terapkan filter estetis studio, dan sesuaikan kontras serta kecerahan.',
      visual: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ background: 'var(--soft-ivory)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--dusty-rose)', textAlign: 'center' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#4A1727', margin: '0 auto 4px' }}></div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--burgundy-deep)' }}>Burgundy</div>
          </div>
          <div style={{ background: 'var(--soft-ivory)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--dusty-rose)', textAlign: 'center' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#871626', margin: '0 auto 4px' }}></div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#871626' }}>Cherry</div>
          </div>
          <div style={{ background: 'var(--soft-ivory)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--dusty-rose)', textAlign: 'center' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#702D42', margin: '0 auto 4px' }}></div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--burgundy-wine)' }}>Ivory</div>
          </div>
        </div>
      )
    },
    {
      number: '04',
      tag: 'Langkah 4 • Unduh',
      title: 'Pindai QR & Simpan Hasil',
      desc: 'Lihat pratinjau final photo strip Anda. Unduh langsung ke komputer atau pindai kode QR menggunakan kamera ponsel untuk menyimpan foto langsung ke galeri.',
      visual: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--soft-ivory)', padding: '6px', borderRadius: '6px', border: '1px solid var(--dusty-rose)' }}>
            <QrCode size={44} color="var(--burgundy-deep)" />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Pindai dengan kamera ponsel<br />
            Simpan file PNG instan<br />
            Resolusi tajam siap cetak
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="how-page">
      {/* Header */}
      <div className="how-header">
        <div className="badge-cute" style={{ marginBottom: '0.8rem' }}>
          <Sparkles size={14} color="var(--burgundy-deep)" />
          <span>Panduan Penggunaan</span>
        </div>
        <h1 className="how-title">Cara Kerja ALEASNAP</h1>
        <p className="how-lead">
          Menciptakan photo strip digital berestetika studio dalam 4 langkah mudah dan cepat.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <div className="step-number-box">{step.number}</div>

            <div className="step-info">
              <span className="step-tag">{step.tag}</span>
              <h3 className="step-name">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>

            <div className="step-preview-box">
              {step.visual}
            </div>
          </div>
        ))}
      </div>

      {/* Photobooth Pro Tips */}
      <div className="tips-container">
        <div className="tips-header">
          <h2 style={{ fontSize: '1.8rem', color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
            Studio Pro Tips
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Tips memaksimalkan hasil foto strip yang jernih dan berkarakter</p>
        </div>

        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">
              <Sun size={24} color="var(--burgundy-deep)" />
            </div>
            <h4 className="tip-title">Pencahayaan Alami</h4>
            <p className="tip-text">Posisikan diri menghadap jendela atau lampu hangat agar wajah terlihat jelas dan merona.</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">
              <FlipHorizontal size={24} color="var(--burgundy-deep)" />
            </div>
            <h4 className="tip-title">Aktifkan Mirror Camera</h4>
            <p className="tip-text">Mode cermin mempermudah pengaturan komposisi dan gaya secara natural di depan lensa.</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">
              <Camera size={24} color="var(--burgundy-deep)" />
            </div>
            <h4 className="tip-title">Variasikan Pose</h4>
            <p className="tip-text">Gunakan ekspresi berbeda untuk setiap jepretan: tersenyum hangat, candid, dan pose ekspresif.</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">
              <RotateCcw size={24} color="var(--burgundy-deep)" />
            </div>
            <h4 className="tip-title">Ambil Ulang Bebas</h4>
            <p className="tip-text">Kurang puas dengan satu pose? Anda dapat mengambil ulang foto tanpa batas sebelum disimpan.</p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button 
          className="btn btn-primary"
          onClick={onStartPhotobooth}
          style={{ fontSize: '1.1rem', padding: '0.9rem 2.2rem' }}
        >
          <Camera size={20} />
          Mulai Sesi Photobooth
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
