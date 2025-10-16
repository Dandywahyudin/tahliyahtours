// Service Worker for Performance Optimization
const CACHE_NAME = 'tahliyah-tours-v1';
const urlsToCache = [
  '/',
  '/css/app.css',
  '/js/app.js',
  '/images/logo.png',
  '/images/caraousel1.png',
  'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('Gagal cache:', url, err);
          })
        )
      );
    })
  );
});
// Fetch event
self.addEventListener('fetch', function(event) {
  // Skip fetching for non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip fetching for localhost and development URLs
  if (event.request.url.includes('localhost') || 
      event.request.url.includes('127.0.0.1') ||
      event.request.url.includes('@vite') ||
      event.request.url.includes('@react-refresh')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).catch(function() {
          // Return a default response if fetch fails
          return new Response('', { status: 404 });
        });
      })
      .catch(function(error) {
        console.warn('Fetch error:', error);
        return new Response('', { status: 500 });
      })
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
