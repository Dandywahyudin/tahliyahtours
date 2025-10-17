// Service Worker for Performance Optimization
const CACHE_NAME = 'tahliyah-tours-v2';
const urlsToCache = [
  '/',
  '/images/logo.png',
  '/images/caraousel1.png',
  'https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
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

  // Skip fetching for dynamic files and development URLs
  const url = event.request.url;
  if (url.includes('localhost') || 
      url.includes('127.0.0.1') ||
      url.includes('@vite') ||
      url.includes('@react-refresh') ||
      url.includes('.hot-update.') ||
      url.includes('/__vite') ||
      url.match(/\.(js|css)$/)) { // Skip JS/CSS files (they have hash names)
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
  self.clients.claim(); // Take control of all pages immediately
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
