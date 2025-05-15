const CACHE_NAME = "indigo-flight-cache-v1"; // Updated cache name to reflect IndiGo flights
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Install event: Cache app shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Add all specified URLs to the cache
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve cached content if offline, otherwise fetch from network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // If a cached response is found, return it
      // Otherwise, fetch the resource from the network
      return response || fetch(event.request);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // Delete old caches that don't match the current cache name
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
