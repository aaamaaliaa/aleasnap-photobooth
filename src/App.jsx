import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { PAGES } from './constants/routes';
import { Sparkles, Camera, CheckCircle2, Heart, Palette, Layers, QrCode } from 'lucide-react';
import './styles/global.css';

export default function App() {
  const [activePage, setActivePage] = useState(PAGES.HOME);

  return (
    <div className="app-layout">
      {/* Navbar with working navigation and theme */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <main className="container" style={{ paddingTop: '2.5rem', minHeight: 'calc(100vh - 350px)' }}>
        {/* Tahap 1 Initialization Banner & Welcome Card */}
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-cute" style={{ marginBottom: '1rem' }}>
            <Sparkles size={16} color="var(--matcha-primary)" />
            <span>Tahap 1 — Project Initialization & Setup Complete</span>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--matcha-dark)' }}>
            Welcome to Matcha<span style={{ color: 'var(--matcha-primary)' }}>Box</span> 🍵
          </h1>
          <p style={{ maxWidth: '640px', margin: '0 auto 1.5rem', fontSize: '1.1rem' }}>
            Website Online Photobooth bergaya Cute Korean dengan palet visual Matcha Green yang estetik, segar, dan playful.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary"
              onClick={() => alert('Tahap 1 selesai! Fitur Photobooth akan diaktifkan penuh pada Tahap 3.')}
            >
              <Camera size={18} />
              Start Photobooth
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setActivePage(PAGES.HOW_IT_WORKS)}
            >
              How It Works
            </button>
          </div>
        </section>

        {/* Status Verifikasi Setup Tahap 1 */}
        <section className="card-cute" style={{ maxWidth: '840px', margin: '0 auto 3rem' }}>
          <h3 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CheckCircle2 color="var(--matcha-primary)" size={24} />
            Setup & Fondasi Tahap 1 Berhasil
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--matcha-soft)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--matcha-dark)', marginBottom: '0.35rem' }}>
                <Palette size={18} />
                Matcha Green Theme
              </div>
              <p style={{ fontSize: '0.875rem' }}>Tokens warna soft matcha green, sage, cream, dan tipografi Fredoka & Plus Jakarta Sans sudah aktif.</p>
            </div>

            <div style={{ background: 'var(--matcha-soft)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--matcha-dark)', marginBottom: '0.35rem' }}>
                <Layers size={18} />
                Struktur Modular
              </div>
              <p style={{ fontSize: '0.875rem' }}>Folder komponen common, home, photobooth, editor, gallery, utils, dan constants siap dikembangkan.</p>
            </div>

            <div style={{ background: 'var(--matcha-soft)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--matcha-dark)', marginBottom: '0.35rem' }}>
                <QrCode size={18} />
                Library Terpasang
              </div>
              <p style={{ fontSize: '0.875rem' }}>React, Vite, Lucide Icons, Canvas Confetti, dan QR Code library siap untuk tahap berikutnya.</p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Status Halaman Saat Ini: <strong style={{ color: 'var(--matcha-dark)' }}>{activePage.toUpperCase()}</strong>
            </span>
            <span className="badge-cute">
              <Heart size={14} color="#E89898" fill="#E89898" /> Siap untuk Tahap 2 (Landing Page)
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
