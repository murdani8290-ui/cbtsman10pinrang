// ================================================
// SERVICE WORKER - CBT Online PWA
// ================================================
const CACHE_NAME = 'cbt-online-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: cache semua aset statis
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: hapus cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: strategi Network First untuk GAS, Cache First untuk aset lokal
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Untuk request ke Google Apps Script — selalu Network (tidak di-cache)
  if (url.hostname.includes('script.google.com') || url.hostname.includes('googleusercontent.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({ error: true, message: 'Tidak ada koneksi internet.' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Untuk aset lokal — Cache First
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      // Fallback offline page
      if (event.request.destination === 'document') {
        return caches.match('./index.html');
      }
    })
  );
});
