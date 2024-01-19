const cacheName = 'kalkulacka-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/favicon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(existingCacheName => {
            if (existingCacheName !== cacheName) {
              return caches.delete(existingCacheName);
            }
          })
        );
      })
  );
});