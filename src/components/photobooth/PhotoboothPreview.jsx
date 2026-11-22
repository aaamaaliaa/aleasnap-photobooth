import React, { useState } from 'react';
import { Camera, Sparkles, Layout, Palette, ArrowLeft, Check, Shield } from 'lucide-react';

export default function PhotoboothPreview({ selectedFrame, onNavigateGallery, onNavigateHome }) {
  const [selectedLayout, setSelectedLayout] = useState(selectedFrame?.slots || 4);

  const layouts = [
    { slots: 2, label: '2 Photos', desc: 'Duo Moments' },
    { slots: 3, label: '3 Photos', desc: 'Trio Classic' },
    { slots: 4, label: '4 Photos', desc: 'Classic 4-Cut' },
  ];

  return (
    <div style={{ padding: '2.5rem 0 4rem', maxWidth: '850px', margin: '0 auto' }}>
      {/* Top Breadcrumb / Back button */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={onNavigateHome}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        <span className="badge-cute">
          <Sparkles size={14} color="var(--burgundy-deep)" />
          ALEASNAP Studio Ready
        </span>
      </div>

      {/* Main Preview Card */}
      <div className="card-cute" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'var(--dusty-rose-light)',
          color: 'var(--burgundy-deep)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <Camera size={32} />
        </div>

        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.75rem', color: 'var(--burgundy-deep)', fontFamily: 'var(--font-serif)' }}>
          Photobooth Session Studio
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
          Navigasi ke Photobooth berhasil! Pilih tata letak foto dan frame sebelum memulai sesi pemotretan.
        </p>

        {/* Selected Frame Info */}
        <div style={{
          background: selectedFrame ? selectedFrame.bgStyle : 'linear-gradient(135deg, #4A1727 0%, #702D42 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: `2px solid ${selectedFrame ? selectedFrame.borderColor : 'var(--dusty-rose)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
              Active Frame
            </span>
            <h3 style={{ margin: '0.2rem 0', color: selectedFrame?.textColor || 'var(--soft-ivory)' }}>
              {selectedFrame?.title || 'ALEASNAP Signature'}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
              {selectedFrame?.description || 'Signature deep burgundy palette with dusty rose accents.'}
            </p>
          </div>

          <button 
            className="btn btn-secondary"
            onClick={onNavigateGallery}
            style={{ backgroundColor: 'white' }}
          >
            <Palette size={16} />
            Change Frame
          </button>
        </div>

        {/* Layout Selection Preview */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-serif)', color: 'var(--burgundy-deep)' }}>
            <Layout size={20} color="var(--burgundy-deep)" />
            Choose Photo Strip Layout
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {layouts.map((layout) => {
              const isSelected = selectedLayout === layout.slots;

              return (
                <div
                  key={layout.slots}
                  onClick={() => setSelectedLayout(layout.slots)}
                  style={{
                    border: isSelected ? '2px solid var(--burgundy-deep)' : '1px solid var(--dusty-rose)',
                    background: isSelected ? 'var(--dusty-rose-light)' : 'white',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-bounce)',
                    boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--burgundy-deep)' }}>{layout.slots}x</span>
                    {isSelected && <Check size={18} color="var(--burgundy-deep)" />}
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--burgundy-deep)' }}>{layout.label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{layout.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
