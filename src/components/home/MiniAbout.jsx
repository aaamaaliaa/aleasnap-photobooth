import React from 'react';
import { Camera, Sparkles, Smile, ShieldCheck, ArrowRight } from 'lucide-react';
import './MiniAbout.css';

export default function MiniAbout({ onLearnMore, onStartPhotobooth }) {
  return (
    <section className="mini-about-section">
      <div className="mini-about-card">
        <div className="mini-about-grid">
          <div className="mini-about-content">
            <div className="badge-cute">
              <Camera size={14} color="var(--burgundy-deep)" />
              <span>About ALEASNAP</span>
            </div>

            <h2 className="mini-about-title">
              Studio Experience, <br />
              Right in Your Browser.
            </h2>

            <p className="mini-about-text">
              ALEASNAP menghadirkan pengalaman photobooth studio berestetika tinggi langsung ke layar Anda. Abadikan momen berharga bersama orang terdekat secara praktis dengan frame eksklusif dan hasil cetak digital berkualitas tinggi.
            </p>

            <div className="mini-about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <Smile size={18} color="var(--burgundy-deep)" />
                </div>
                <div>
                  <h4 className="highlight-title">Tanpa Unduh Aplikasi</h4>
                  <p className="highlight-desc">Dapat langsung digunakan melalui browser di laptop maupun smartphone.</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <Sparkles size={18} color="var(--burgundy-deep)" />
                </div>
                <div>
                  <h4 className="highlight-title">Desain & Frame Elegan</h4>
                  <p className="highlight-desc">Pilihan frame berestetika mewah dengan palet warna yang harmonis dan modern.</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <ShieldCheck size={18} color="var(--burgundy-deep)" />
                </div>
                <div>
                  <h4 className="highlight-title">Instant QR Share</h4>
                  <p className="highlight-desc">Pindai kode QR melalui smartphone untuk mengunduh photo strip beresolusi tinggi seketika.</p>
                </div>
              </div>
            </div>

            <div className="mini-about-actions">
              <button className="btn btn-secondary" onClick={onLearnMore}>
                Read Full Story
                <ArrowRight size={16} />
              </button>
              <button className="btn btn-primary" onClick={onStartPhotobooth}>
                Start Photobooth
              </button>
            </div>
          </div>

          <div className="mini-about-visual">
            <div className="mini-visual-box">
              <div className="visual-circle-bg"></div>
              <div className="mini-photo-polaroid polaroid-1">
                <div className="polaroid-inner">
                  <Camera size={36} color="var(--burgundy-deep)" strokeWidth={1.5} />
                </div>
                <div className="polaroid-caption">Timeless Memories</div>
              </div>
              <div className="mini-photo-polaroid polaroid-2">
                <div className="polaroid-inner">
                  <Sparkles size={36} color="var(--burgundy-wine)" strokeWidth={1.5} />
                </div>
                <div className="polaroid-caption">Studio Archive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
