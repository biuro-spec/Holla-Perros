import React, { useState } from 'react';
import { Phone, PawPrint, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: 'rgba(252, 251, 248, 0.95)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 60px', backdropFilter: 'blur(8px)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
          <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '2px', textTransform: 'uppercase' }}>hOla Perros</h2>
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="navbar-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <a href="#omnie" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>O mnie</a>
        <a href="#uslugi" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Usługi</a>
        <a href="#cennik" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Cennik</a>
        <Link to="/blog" style={{ textDecoration: 'none', color: 'var(--pink)', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Blog</Link>
        <a href="#kontakt" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Kontakt</a>
        <Link to="/regulamin" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontWeight: 400, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Regulamin</Link>
        <a href="tel:+48512501558" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.8rem' }}>
            <Phone size={16} /> Umów wizytę
          </button>
        </a>
      </div>

      {/* Mobile Toggle */}
      <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={36} color="var(--text-dark)" /> : <PawPrint size={36} color="var(--pink)" />}
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
          <a href="tel:+48512501558" style={{ textDecoration: 'none', width: '100%' }} onClick={() => setIsOpen(false)}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
              <Phone size={18} /> Umów wizytę
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}
