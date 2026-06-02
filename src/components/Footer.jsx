import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--text-dark)', color: 'rgba(255,255,255,0.85)', position: 'relative', zIndex: 10, borderTop: '3px solid var(--gold)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 40px 0', textAlign: 'center' }}>

        {/* Logo */}
        <img
          src="./zdjecia/logo-stopka.png"
          alt="hOla Perros"
          style={{ height: '76px', width: 'auto', objectFit: 'contain', marginBottom: '24px' }}
        />

        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '36px' }}>
          Wyrafinowana Pielęgnacja Zwierząt w Raciborzu
        </p>

        {/* Złota linia */}
        <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--gold)', margin: '0 auto 36px', borderRadius: '2px', opacity: 0.6 }}></div>

        {/* Dane kontaktowe */}
        <div className="footer-info" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '28px', marginBottom: '32px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
            <MapPin size={17} className="text-gold" /> ul. Opawska 67, 47-400 Racibórz
          </span>
          <a href="tel:+48512501558" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>
            <Phone size={17} className="text-gold" /> +48 512 501 558
          </a>
        </div>

        {/* Social */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '44px' }}>
          <a href="https://www.instagram.com/holaperros_salon" target="_blank" rel="noreferrer" aria-label="Instagram"
            className="footer-social" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
            <InstagramIcon size={20} />
          </a>
          <a href="https://wa.me/48512501558" target="_blank" rel="noreferrer" aria-label="WhatsApp"
            className="footer-social" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
            <MessageCircle size={20} />
          </a>
          <a href="tel:+48512501558" aria-label="Telefon"
            className="footer-social" style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
            <Phone size={20} />
          </a>
        </div>
      </div>

      {/* Dolny pasek */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            © 2026 hOla Perros. Wszelkie prawa zastrzeżone.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/regulamin" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Regulamin</Link>
            <Link to="/blog" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
