// ================================================
// SERVICE WORKER - CBT Online PWA v2
// ================================================
const CACHE_NAME = 'cbt-online-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Abaikan request non-GET
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Request ke Google — selalu pakai network, jangan cache
  if (
    url.hostname.includes('script.google.com') ||
    url.hostname.includes('googleusercontent.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('cdn.tailwindcss.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Aset lokal — Cache First
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      if (event.request.destination === 'document') {
        return caches.match('./index.html');
      }
    })
  );
});
