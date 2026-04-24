/* ================================================================
   Turkiana Service Worker — v1.0.0
   Strategy:
   • Core assets  → Cache-First (CSS, JS, HTML, icons)
   • Google Fonts → StaleWhileRevalidate (Font CSS + files)
   • Menu images  → Cache-First with network fallback
   • Navigation   → NetworkFirst with offline fallback
================================================================ */

const CACHE_VER   = 'v1';
const CORE_CACHE  = `turkiana-core-${CACHE_VER}`;
const FONT_CACHE  = `turkiana-fonts-${CACHE_VER}`;
const IMG_CACHE   = `turkiana-images-${CACHE_VER}`;

const ALL_CACHES = [CORE_CACHE, FONT_CACHE, IMG_CACHE];

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

/* ── Install ─────────────────────────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate ────────────────────────────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => !ALL_CACHES.includes(k))
          .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── Fetch ───────────────────────────────────────────────────── */
self.addEventListener('fetch', event => {
  const { request } = event;
  if (!request.url.startsWith('http')) return;

  const url = new URL(request.url);

  // Google Fonts CSS → Stale-While-Revalidate
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
    return;
  }

  // Google Fonts files → Cache-First
  if (url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // Menu images from CDN → Cache-First
  if (url.hostname === 'turkianacafe-ux.github.io') {
    event.respondWith(cacheFirst(request, IMG_CACHE));
    return;
  }

  // QR code API → Network-Only (skip cache)
  if (url.hostname === 'api.qrserver.com') {
    event.respondWith(fetch(request).catch(() =>
      new Response('', { status: 503 })
    ));
    return;
  }

  // Navigation requests → Network-First with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, CORE_CACHE));
    return;
  }

  // Static assets (JS/CSS/images) → Cache-First
  if (['script', 'style', 'image', 'font'].includes(request.destination)) {
    event.respondWith(cacheFirst(request, CORE_CACHE));
    return;
  }
});

/* ── Strategies ──────────────────────────────────────────────── */

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return caches.match('./index.html').then(r =>
      r || new Response(offlinePage(), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    );
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  return cached || await fetchPromise;
}

function offlinePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Turkiana — Offline</title>
<style>
  body { margin:0; min-height:100dvh; display:flex; align-items:center; justify-content:center;
         flex-direction:column; gap:1rem; font-family:Georgia,serif;
         background:#060402; color:#F0E6D0; text-align:center; padding:2rem; }
  h1 { color:#C4963E; font-size:2rem; letter-spacing:.2em; text-transform:uppercase; }
  p  { color:#B8A888; max-width:28ch; line-height:1.7; }
  a  { color:#C4963E; }
</style>
</head>
<body>
  <h1>Turkiana</h1>
  <p>You appear to be offline. Please check your connection and&nbsp;<a href="./">try again</a>.</p>
</body>
</html>`;
}