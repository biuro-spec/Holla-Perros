import React, { useState, useEffect } from 'react';
import { Phone, PawPrint, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const getScrollY = () =>
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const onScroll = () => setScrolled(getScrollY() > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navBg = scrolled
    ? 'rgba(252, 251, 248, 0.55)'
    : 'rgba(252, 251, 248, 0.97)';

  const navBlur = scrolled ? 'blur(18px) saturate(180%)' : 'blur(8px)';
  const navShadow = scrolled ? '0 2px 24px rgba(184,146,42,0.08)' : 'none';

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: navBg, borderBottom: '1px solid var(--gold)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 60px', backdropFilter: navBlur, WebkitBackdropFilter: navBlur, boxShadow: navShadow, transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            border: '2.5px solid var(--gold)',
            boxShadow: '0 0 0 1px rgba(184,146,42,0.2)',
            overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent'
          }}>
            <img src="./zdjecia/logo.png" alt="hOla Perros" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="navbar-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <a href="#omnie" className="nav-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>O mnie</a>
        <a href="#uslugi" className="nav-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Usługi</a>
        <a href="#cennik" className="nav-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Cennik</a>
        <Link to="/blog" className="nav-link" style={{ textDecoration: 'none', color: 'var(--pink)', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Blog</Link>
        <a href="#kontakt" className="nav-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Kontakt</a>
        <Link to="/regulamin" className="nav-link" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Regulamin</Link>
        <a href="./rezerwacja/" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.8rem' }}>
            <Phone size={16} /> Umów wizytę
          </button>
        </a>
      </div>

      {/* Mobile Toggle */}
      <div className="mobile-menu-btn hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={38} color="var(--text-dark)" /> : <PawPrint size={44} color="var(--pink)" />}
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', padding: '30px 20px', gap: '24px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
          <a href="#omnie" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>O mnie</a>
          <a href="#uslugi" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>Usługi</a>
          <a href="#cennik" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>Cennik</a>
          <Link to="/blog" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'var(--pink)', fontWeight: 500, fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>Blog</Link>
          <a href="#kontakt" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>Kontakt</a>
          <Link to="/regulamin" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '1.2rem', letterSpacing: '1px', textTransform: 'uppercase', textAlign: 'center' }}>Regulamin</Link>
          <a href="./rezerwacja/" style={{ textDecoration: 'none', width: '100%' }} onClick={() => setIsOpen(false)}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
              <Phone size={18} /> Umów wizytę
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}
