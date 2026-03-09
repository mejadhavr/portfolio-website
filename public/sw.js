// public/sw.js
const CACHE_NAME = 'mejadhavr-v3';

self.addEventListener('install', event => {
  self.skipWaiting();
  // Pre-cache only the things we know won't change names frequently
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      '/',
      '/index.html',
      '/src/assets/fonts/bebas-neue-400.woff2',
      '/src/assets/fonts/cormorant-garamond-normal.woff2',
      '/src/assets/fonts/space-mono-400.woff2',
    ]))
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
  const url = new URL(event.request.url);
  
  // Skip non-GET and cross-origin analytics/tracking
  if (event.request.method !== 'GET') return;
  if (url.href.includes('googletagmanager') || url.href.includes('google-analytics')) return;
  if (url.href.includes('formspree')) return;
  
  const isHTML = event.request.headers.get('accept')?.includes('text/html');
  const isFont = url.pathname.includes('/assets/fonts/');
  const isAsset = url.pathname.includes('/assets/');
  const isVideo = url.pathname.includes('/videos/');
  
  if (isVideo) {
    // Don't cache video — too large
    event.respondWith(fetch(event.request));
    return;
  }
  
  if (isFont || isAsset) {
    // Cache-first for static assets (fonts, JS, CSS, images)
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200) return response;
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
          return response;
        });
      })
    );
    return;
  }
  
  if (isHTML) {
    // Network-first for HTML — always fresh content
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const toCache = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Default: stale-while-revalidate
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
        }
        return response;
      });
      return cached || fetchPromise;
    })
  );
});
