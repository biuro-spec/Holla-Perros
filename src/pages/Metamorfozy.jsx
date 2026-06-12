import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const API_URL = 'https://script.google.com/macros/s/AKfycbwLo4yzCpgDPYx_d9Pxy3PmzM6BWWKDcYnV0zyp_7SimdfYtZXiaQg9jCrAb9iRjLXO/exec';

// Wbudowane przykłady (zawsze widoczne)
const SEED = [
  { ID: 'seed-1', Url: './zdjecia/metamorfozy/strzyzenie-owczarka-podhalanskiego-raciborz.webp',  Tytul: 'Kąpiel i pielęgnacja', Rasa: 'Owczarek Podhalański', Opis: 'Pełna pielęgnacja SPA z modelowaniem szaty.' },
  { ID: 'seed-2', Url: './zdjecia/metamorfozy/strzyzenie-shih-tzu-raciborz.webp', Tytul: 'Autorskie strzyżenie',  Rasa: 'Shih-tzu',         Opis: 'Strzyżenie z wymodelowaną główką i uszami.' },
  { ID: 'seed-3', Url: './zdjecia/metamorfozy/strzyzenie-owczarka-szetlandzkiego-raciborz.webp', Tytul: 'Pielęgnacja',     Rasa: 'Border Collie', Opis: 'Kąpiel, suszenie i pielęgnacja długiej szaty.' },
];

export default function Metamorfozy() {
  const [items, setItems] = useState(SEED);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(API_URL + '?action=getMetamorfozy')
      .then(r => r.json())
      .then(res => {
        if (res.ok && Array.isArray(res.data) && res.data.length) {
          // Najpierw przykłady (od razu się ładują), nowe zdjęcia na dole — zdążą doczytać się zanim klient przewinie
          setItems([...SEED, ...res.data]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Blokuj przewijanie strony, gdy podgląd (lightbox) jest otwarty
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <div className="blog-page-wrapper" style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <div className="container" style={{ paddingBottom: '100px' }}>

        {/* Nagłówek */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Galeria prac</p>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 400, marginBottom: '24px', lineHeight: 1.05 }}>Metamorfozy <i className="text-italic text-pink">hOla Perros</i></h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.15rem', maxWidth: '560px', margin: '0 auto 24px', lineHeight: 1.7 }}>
            Zobacz efekty mojej pracy — każdy piesek wychodzi ode mnie zadbany, piękny i szczęśliwy.
          </p>
          <div style={{ width: '120px', height: '3px', backgroundColor: 'var(--gold)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        {/* Galeria */}
        <div className="meta-grid" style={{ columnCount: 3, columnGap: '20px' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.ID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (i % 9) * 0.06 }}
              className="meta-card"
              style={{ breakInside: 'avoid', marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', position: 'relative', backgroundColor: 'var(--bg-color-alt)', boxShadow: '0 6px 20px rgba(0,0,0,0.06)' }}
              onClick={() => setActive(item)}
            >
              <img
                src={item.FileId ? `https://lh3.googleusercontent.com/d/${item.FileId}=w600` : item.Url}
                alt={item.Tytul || 'Metamorfoza psa'}
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{ width: '100%', display: 'block', borderRadius: '8px', minHeight: '180px', backgroundColor: 'var(--bg-color-alt)' }}
                onError={(e) => {
                  if (!e.target.dataset.retry) { e.target.dataset.retry = 1; const s = e.target.src; e.target.src = ''; setTimeout(() => { e.target.src = s; }, 2500); }
                  else { e.target.parentElement.style.display = 'none'; }
                }}
              />
              <div className="meta-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,26,23,0.92) 0%, rgba(30,26,23,0.35) 45%, transparent 70%)', opacity: 0, transition: 'opacity 0.35s ease', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px' }}>
                {item.Rasa && <span style={{ color: '#E8C766', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{item.Rasa}</span>}
                {item.Tytul && <span style={{ color: '#F4ADC8', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{item.Tytul}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        {loading && <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '24px', fontStyle: 'italic' }}>Wczytuję najnowsze prace…</p>}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(45,40,37,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', cursor: 'pointer' }}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Zamknij"
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px' }}
            >
              <X size={36} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '700px', width: '100%', textAlign: 'center' }}
            >
              <img src={active.FileId ? `https://lh3.googleusercontent.com/d/${active.FileId}=w1400` : active.Url} alt={active.Tytul} referrerPolicy="no-referrer" style={{ maxWidth: '100%', maxHeight: '75vh', borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }} />
              {(active.Tytul || active.Opis) && (
                <div style={{ marginTop: '20px', color: '#fff' }}>
                  {active.Rasa && <p style={{ color: '#E8C766', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>{active.Rasa}</p>}
                  {active.Tytul && <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 400, marginBottom: '8px', color: '#F4ADC8' }}>{active.Tytul}</h3>}
                  {active.Opis && <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>{active.Opis}</p>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (hover: hover) {
          .meta-card:hover .meta-overlay { opacity: 1; }
          .meta-card:hover img { transform: scale(1.04); }
        }
        .meta-card img { transition: transform 0.5s ease; }
        @media (max-width: 900px) { .meta-grid { column-count: 2 !important; } }
        @media (max-width: 560px) { .meta-grid { column-count: 1 !important; } }
      `}</style>
    </div>
  );
}
