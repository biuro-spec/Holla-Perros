// hOla Perros — Service Worker (PWA)
// Strategia: network-first dla stron (zawsze świeże), cache-first dla zdjęć,
// API (Apps Script) zawsze z sieci. Offline → wersja z cache.

const CACHE = 'hola-perros-v1';
const BASE = '/Hola-Perros/';
const PRECACHE = [
  BASE,
  BASE + 'manifest.json',
  BASE + 'favicon-192.png',
  BASE + 'favicon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // API i zewnętrzne usługi (Apps Script, Google Drive, mapy) — zawsze z sieci, bez cache
  if (url.hostname.includes('script.google.com') ||
      url.hostname.includes('googleusercontent.com') ||
      url.hostname.includes('google.com')) {
    return; // domyślna obsługa przeglądarki
  }

  // Zdjęcia / fonty — cache-first (szybkość), aktualizacja w tle
  if (/\.(webp|jpg|jpeg|png|svg|woff2?)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
          return res;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Strony / reszta — network-first, offline fallback do cache
  e.respondWith(
    fetch(req).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then((cached) => cached || caches.match(BASE)))
  );
});
