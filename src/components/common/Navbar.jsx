import React, { useState } from 'react';
import { Camera, Menu, X, Sparkles } from 'lucide-react';
import { PAGES } from '../../constants/routes';
import './Navbar.css';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: PAGES.HOME, label: 'Home' },
    { id: PAGES.ABOUT, label: 'About' },
    { id: PAGES.HOW_IT_WORKS, label: 'How It Works' },
    { id: PAGES.GALLERY, label: 'Gallery' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div 
          className="navbar-brand" 
          onClick={() => handleNavClick(PAGES.HOME)}
          role="button"
          tabIndex={0}
        >
          <div className="navbar-logo-icon">
            <Camera size={20} />
          </div>
          <span>ALEASNAP</span>
        </div>

        {/* Navigation Links */}
        <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Start Photobooth button inside dropdown */}
          <button
            className="btn btn-primary nav-mobile-btn"
            onClick={() => handleNavClick(PAGES.PHOTOBOOTH)}
          >
            <Sparkles size={16} />
            Start Photobooth
          </button>
        </nav>

        {/* Desktop CTA Action */}
        <div className="navbar-actions">
          <button
            className="btn btn-primary"
            onClick={() => handleNavClick(PAGES.PHOTOBOOTH)}
          >
            <Sparkles size={16} />
            Start Photobooth
          </button>

          {/* Mobile Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
