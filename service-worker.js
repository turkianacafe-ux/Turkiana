/* ============================================================
   TURKIANA — service-worker.js (v1.0.1)
   Offline support, cache-first for shell, network-first for
   images with fallback. Fixes #54, #73 from audit.
============================================================ */
'use strict';

const CACHE_VERSION = 'turkiana-v1';

const SHELL_ASSETS = [
  './',
  './index.html',
  './style.css',
  './style-enhancements.css',
  './app.js',
  './app-enhancements.js',
  './manifest.json',
];

const CACHE_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://turkianacafe-ux.github.io',
  'https://api.qrserver.com',
];

// ─── Install ────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ─── Activate ───────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_VERSION)
        .map((key) => {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        })
    ))
    .then(() => self.clients.claim())
  );
});

// ─── Fetch ──────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!['http:', 'https:'].includes(url.protocol)) return;

  // Strategy 1: Cache-first for same-origin (shell + JS/CSS)
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Strategy 2: Cache-first for fonts
  if (url.origin === 'https://fonts.gstatic.com' ||
      url.origin === 'https://fonts.googleapis.com') {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Strategy 3: Network-first for menu images (stale-while-revalidate)
  if (url.origin === 'https://turkianacafe-ux.github.io') {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Strategy 4: Network-first for other allowed origins (e.g., QR API)
  if (CACHE_ORIGINS.some((o) => url.origin === o)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default: pass through
});

// ─── Strategy helpers ───────────────────────────────────────

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return offlineFallback(request);
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || offlineFallback(request);
  }
}

async function networkFirstWithFallback(request) {
  const cached = await caches.match(request);
  const fetchPromise = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        const cache = await caches.open(CACHE_VERSION);
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  if (cached) {
    // Return cached immediately, refresh in background
    fetchPromise; // fire-and-forget
    return cached;
  }

  const response = await fetchPromise;
  return response || imageFallback();
}

async function offlineFallback(request) {
  if (request.destination === 'document') {
    const cached = await caches.match('./index.html');
    return cached || new Response(
      '<h1 style="font-family:sans-serif;text-align:center;padding:4rem">Offline — please reconnect</h1>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
  if (request.destination === 'image') {
    return imageFallback();
  }
  return new Response('', { status: 503, statusText: 'Service Unavailable' });
}

function imageFallback() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#1C1109"/>
    <g transform="translate(200,150)" opacity="0.3" stroke="#C4963E" stroke-width="1.5" fill="none">
      <rect x="-40" y="-30" width="80" height="60" rx="6"/>
      <circle cx="-12" cy="-8" r="8"/>
      <polyline points="40,-30 10,10 -20,-10 -40,30"/>
    </g>
    <text x="200" y="230" text-anchor="middle" font-family="sans-serif"
          font-size="11" fill="#B8A888" opacity="0.6">Image unavailable offline</text>
  </svg>`;
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store' },
  });
}

// ─── Message handler ─────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  if (event.data === 'clearCache') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});
