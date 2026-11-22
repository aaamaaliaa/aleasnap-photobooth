import React from 'react';
import { Camera, Heart } from 'lucide-react';
import { PAGES } from '../../constants/routes';
import './Footer.css';

export default function Footer({ setActivePage }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Camera size={22} color="var(--matcha-primary)" />
              <span>MatchaBox 🍵</span>
            </div>
            <p className="footer-desc">
              Capture your little moments into lovely memories. Cute Korean online photobooth with aesthetic frames and easy QR code downloads.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Menu</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav(PAGES.HOME)}>Home</button></li>
              <li><button onClick={() => handleNav(PAGES.ABOUT)}>About Us</button></li>
              <li><button onClick={() => handleNav(PAGES.HOW_IT_WORKS)}>How It Works</button></li>
              <li><button onClick={() => handleNav(PAGES.GALLERY)}>Frame Gallery</button></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Photobooth</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav(PAGES.PHOTOBOOTH)}>Start Session</button></li>
              <li><button onClick={() => handleNav(PAGES.GALLERY)}>Browse Frames</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} MatchaBox. All lovely rights reserved.</p>
          <p className="footer-tagline">
            Crafted with <Heart size={14} color="#E89898" fill="#E89898" /> for your cute memories
          </p>
        </div>
      </div>
    </footer>
  );
}
