const CACHE_NAME = 'apoyo-emocional-cache-v1';
const urlsToCache = [
  '/ApoyoEmocionalAI/',
  '/ApoyoEmocionalAI/index.html',
  '/ApoyoEmocionalAI/manifest.json',
  '/ApoyoEmocionalAI/icon-192.png',
  '/ApoyoEmocionalAI/icon-512.png'
  // Puedes añadir aquí otros recursos como CSS, JS externos, etc.
];

// Instala el SW y almacena los recursos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activa el SW
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
});

// Manejo de fetch para servir recursos desde caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
