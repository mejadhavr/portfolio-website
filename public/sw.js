const CACHE_NAME = 'mejadhavr-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/fonts/bebasneue.ttf',
  '/assets/fonts/cormorantgaramond-italic-300.ttf',
  '/assets/fonts/cormorantgaramond-italic-400.ttf',
  '/assets/fonts/cormorantgaramond-normal-300.ttf',
  '/assets/fonts/cormorantgaramond-normal-400.ttf',
  '/assets/fonts/cormorantgaramond-normal-600.ttf',
  '/assets/fonts/spacemono-normal-400.ttf',
  '/assets/fonts/spacemono-normal-700.ttf',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  // Ignore external requests (like API calls or analytics) unless needed
  if (!event.request.url.startsWith(self.location.origin)) return;

  const isHTML = event.request.headers.get('accept')?.includes('text/html');
  
  if (isHTML) {
    // Network first for HTML to always get the latest version
    event.respondWith(
      fetch(event.request)
        .then(res => { 
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Cache first for assets
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        }))
    );
  }
});
