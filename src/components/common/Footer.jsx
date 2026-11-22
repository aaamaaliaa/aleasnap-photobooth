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
              <Camera size={22} color="var(--burgundy-deep)" />
              <span>ALEASNAP</span>
            </div>
            <p className="footer-desc">
              An elegant online photobooth studio designed to capture your special moments with timeless aesthetic frames and instant mobile downloads.
            </p>
          </div>

          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav(PAGES.HOME)}>Home</button></li>
              <li><button onClick={() => handleNav(PAGES.ABOUT)}>About Us</button></li>
              <li><button onClick={() => handleNav(PAGES.HOW_IT_WORKS)}>How It Works</button></li>
              <li><button onClick={() => handleNav(PAGES.GALLERY)}>Frame Gallery</button></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Studio</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleNav(PAGES.PHOTOBOOTH)}>Start Photobooth</button></li>
              <li><button onClick={() => handleNav(PAGES.GALLERY)}>Explore Frames</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} ALEASNAP. All rights reserved.</p>
          <p className="footer-tagline">
            A Moment Worth Keeping
          </p>
        </div>
      </div>
    </footer>
  );
}
