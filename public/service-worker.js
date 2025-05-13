// Service Worker básico para PWA
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Cache-first para arquivos estáticos, fallback para network
  event.respondWith(
    caches.open('v1').then(cache =>
      cache.match(event.request).then(resp =>
        resp || fetch(event.request).then(response => {
          // Salva no cache apenas arquivos GET
          if (event.request.method === 'GET') {
            cache.put(event.request, response.clone());
          }
          return response;
        })
      )
    )
  );
});
