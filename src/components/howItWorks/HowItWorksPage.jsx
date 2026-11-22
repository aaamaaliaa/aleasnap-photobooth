import React from 'react';
import { Camera, Sparkles, Layout, Sliders, QrCode, ArrowRight } from 'lucide-react';
import './HowItWorksPage.css';

export default function HowItWorksPage({ onStartPhotobooth }) {
  const steps = [
    {
      number: '01',
      tag: 'Step 1 • Planning',
      title: 'Choose Your Layout',
      desc: 'Select your preferred photo strip format: 2 photos, 3 photos, or classic Korean 4-cut layout. The camera session will automatically adjust snapshot counts.',
      visual: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '38px', height: '60px', background: 'white', border: '2px solid var(--matcha-primary)', borderRadius: '6px', display: 'flex', flexDirection: 'column', padding: '3px', gap: '3px' }}>
            <div style={{ background: '#E2EBD8', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: '#E2EBD8', flex: 1, borderRadius: '2px' }}></div>
          </div>
          <div style={{ width: '42px', height: '80px', background: 'white', border: '2px solid var(--matcha-dark)', borderRadius: '6px', display: 'flex', flexDirection: 'column', padding: '3px', gap: '3px' }}>
            <div style={{ background: '#D2E3C4', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: '#D2E3C4', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: '#D2E3C4', flex: 1, borderRadius: '2px' }}></div>
            <div style={{ background: '#D2E3C4', flex: 1, borderRadius: '2px' }}></div>
          </div>
        </div>
      )
    },
    {
      number: '02',
      tag: 'Step 2 • Action',
      title: 'Take Your Photos',
      desc: 'Grant camera access, check your live preview, and enable mirror camera mode if you like. Hit start and pose with automatic 3-second countdowns between shots.',
      visual: (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '80px', height: '56px', background: '#273322', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
            <Camera size={22} color="#C2D7B4" />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--matcha-dark)' }}>COUNTDOWN: 3... 2... 1... 📸</span>
        </div>
      )
    },
    {
      number: '03',
      tag: 'Step 3 • Creativity',
      title: 'Customize Your Photos',
      desc: 'Choose your dream frame theme (matcha, kawaii, floral, Y2K, retro), apply warm or cool tone filters, fine-tune brightness and contrast, and add cute stickers.',
      visual: (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ background: '#FFF0F3', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #F299AC', textAlign: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>🌸</span>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#6B2D3B' }}>Sakura</div>
          </div>
          <div style={{ background: '#E9F2E2', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #769864', textAlign: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>🍵</span>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#334426' }}>Matcha</div>
          </div>
          <div style={{ background: '#F3EEFF', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #9381FF', textAlign: 'center' }}>
            <span style={{ fontSize: '1.2rem' }}>💿</span>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#3C2E77' }}>Y2K</div>
          </div>
        </div>
      )
    },
    {
      number: '04',
      tag: 'Step 4 • Keepsake',
      title: 'Scan QR & Save Your Memories',
      desc: 'Preview your final high-resolution photo strip. Download directly to your computer or scan the instant QR Code with your smartphone to save it straight to your camera roll!',
      visual: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'white', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
            <QrCode size={48} color="var(--matcha-dark)" />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            📱 Scan with phone<br />
            💾 Instant PNG save<br />
            ✨ Ready to share
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
          <Sparkles size={14} color="var(--matcha-primary)" />
          <span>Simple & Fun Guide</span>
        </div>
        <h1 className="how-title">How It Works</h1>
        <p className="how-lead">
          Creating your personalized Korean photo strip takes less than two minutes. Follow these 4 easy steps!
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
          <h2 style={{ fontSize: '1.8rem', color: 'var(--matcha-dark)', marginBottom: '0.4rem' }}>
            🍵 Photobooth Pro Tips
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>Get the crispest, cutest photo strips with these quick hacks</p>
        </div>

        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h4 className="tip-title">Face Natural Light</h4>
            <p className="tip-text">Position yourself facing a window or soft warm lamp for clear, glowy skin.</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🪞</div>
            <h4 className="tip-title">Enable Mirror Camera</h4>
            <p className="tip-text">Mirroring makes framing feel natural, just like looking in a real vanity mirror.</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">✌️</div>
            <h4 className="tip-title">Plan Your 4 Poses</h4>
            <p className="tip-text">Try: 1. Big smile, 2. Cheek heart, 3. Winking peace sign, 4. Silly face!</p>
          </div>

          <div className="tip-card">
            <div className="tip-icon">🔄</div>
            <h4 className="tip-title">Retake Freely</h4>
            <p className="tip-text">Not happy with a shot? You can retake unlimited times before finalizing.</p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button 
          className="btn btn-primary"
          onClick={onStartPhotobooth}
          style={{ fontSize: '1.15rem', padding: '0.9rem 2.2rem' }}
        >
          <Camera size={20} />
          Let's Start Your Photo Session
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
