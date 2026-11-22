import React from 'react';
import { Heart, Sparkles, Smile, ShieldCheck, ArrowRight } from 'lucide-react';
import './MiniAbout.css';

export default function MiniAbout({ onLearnMore, onStartPhotobooth }) {
  return (
    <section className="mini-about-section">
      <div className="mini-about-card">
        <div className="mini-about-grid">
          <div className="mini-about-content">
            <div className="badge-cute">
              <Heart size={14} color="#E89898" fill="#E89898" />
              <span>About MatchaBox</span>
            </div>

            <h2 className="mini-about-title">
              Korean Photobooth Magic, <br />
              Right in Your Browser.
            </h2>

            <p className="mini-about-text">
              We brought the beloved Hongdae & Seongsu self-photobooth culture straight to your screens! Whether you are chilling in your room with friends, having a virtual hangout, or capturing a quick aesthetic selfie, MatchaBox makes it effortless.
            </p>

            <div className="mini-about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <Smile size={18} color="var(--matcha-dark)" />
                </div>
                <div>
                  <h4 className="highlight-title">No App Downloads</h4>
                  <p className="highlight-desc">Works directly in your desktop or mobile browser.</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <Sparkles size={18} color="var(--matcha-dark)" />
                </div>
                <div>
                  <h4 className="highlight-title">Cute Aesthetics</h4>
                  <p className="highlight-desc">Frames designed with love: matcha, floral, Y2K & pastel themes.</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <ShieldCheck size={18} color="var(--matcha-dark)" />
                </div>
                <div>
                  <h4 className="highlight-title">Instant QR Share</h4>
                  <p className="highlight-desc">Scan QR on your smartphone to download high-res photo strips directly.</p>
                </div>
              </div>
            </div>

            <div className="mini-about-actions">
              <button className="btn btn-secondary" onClick={onLearnMore}>
                Read Full Story
                <ArrowRight size={16} />
              </button>
              <button className="btn btn-primary" onClick={onStartPhotobooth}>
                Try It Now
              </button>
            </div>
          </div>

          <div className="mini-about-visual">
            <div className="mini-visual-box">
              <div className="visual-circle-bg"></div>
              <div className="mini-photo-polaroid polaroid-1">
                <div className="polaroid-inner">
                  <span style={{ fontSize: '3rem' }}>🌸</span>
                </div>
                <div className="polaroid-caption">Besties Time ♡</div>
              </div>
              <div className="mini-photo-polaroid polaroid-2">
                <div className="polaroid-inner">
                  <span style={{ fontSize: '3rem' }}>🍵</span>
                </div>
                <div className="polaroid-caption">Matcha Vibe ✌️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
