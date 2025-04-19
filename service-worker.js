const CACHE_NAME = "kurdolingo-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/style/style.css",
  "/js/app.js",
  "/dersler.html",
  "/style/dersler.css",
  "/js/dersler.js",
  "/ders-detay.html",
  "/style/detay.css",
  "/js/detay.js",
  "/quiz.html",
  "/style/quiz.css",
  "/js/quiz.js",
  "/admin/index.html",
  "/admin/admin.css",
  "/admin/admin.js",
  "/manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
