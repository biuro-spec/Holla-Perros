import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('hp_cookies_ok')) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('hp_cookies_ok', '1');
    setShow(false);
    navigate('/');
  };

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9000, background: 'rgba(45,40,37,0.97)', color: '#fff', padding: '16px 20px', boxShadow: '0 -4px 20px rgba(0,0,0,0.2)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, flex: '1 1 320px' }}>
          🍪 Ta strona używa plików cookies, aby działać poprawnie oraz wyświetlać mapę dojazdu. Korzystając z niej, akceptujesz ich użycie.{' '}
          <Link to="/polityka-prywatnosci" style={{ color: 'var(--pink)', textDecoration: 'underline' }}>Polityka prywatności</Link>
        </p>
        <button onClick={accept} style={{ background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px 26px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)' }}>
          Akceptuję
        </button>
      </div>
    </div>
  );
}
