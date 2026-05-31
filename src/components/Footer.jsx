import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--pink)', color: 'var(--text-dark)', position: 'relative', zIndex: 10, borderTop: '2px solid var(--gold)' }}>
      <p style={{ fontSize: '0.95rem', letterSpacing: '1px', fontWeight: 400, margin: 0 }}>© 2026 hOla Perros. Wyrafinowana Pielęgnacja Zwierząt.</p>
    </footer>
  );
}
