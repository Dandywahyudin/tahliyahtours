// Service Worker for Performance Optimization
const CACHE_NAME = 'tahliyah-tours-v3-performance';
const STATIC_CACHE = 'tahliyah-static-v3';
const DYNAMIC_CACHE = 'tahliyah-dynamic-v3';

// Critical resources untuk instant load
const criticalResources = [
  '/',
  '/images/logo.webp',
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force activate immediately
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return Promise.allSettled(
        criticalResources.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('Cache failed:', url);
          })
        )
      );
    })
  );
});
// Fetch event - Network first, fallback to cache (better for dynamic content)
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip untuk development URLs, dynamic JS/CSS with hash, dan external APIs
  if (url.hostname === 'localhost' || 
      url.hostname === '127.0.0.1' ||
      url.pathname.includes('@vite') ||
      url.pathname.includes('@react-refresh') ||
      url.pathname.includes('.hot-update') ||
      url.pathname.includes('/__vite') ||
      url.pathname.match(/\.(js|css)$/) || // Skip JS/CSS dengan hash
      url.hostname.includes('instagram.com') ||
      url.hostname.includes('google.com')) {
    return; // Let browser handle these
  }
  
  // Network first strategy untuk HTML pages (always fresh)
  if (request.mode === 'navigate' || url.pathname === '/') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback ke cache jika offline
          return caches.match(request);
        })
    );
    return;
  }

  // Cache first strategy untuk static assets (images, fonts)
  if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf)$/)) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }
});

// Activate event - cleanup old caches
self.addEventListener('activate', function(event) {
  self.clients.claim(); // Take control immediately
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // Delete old cache versions
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
