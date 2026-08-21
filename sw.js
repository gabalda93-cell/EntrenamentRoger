/*
  Service worker · ALÈ · Roger
  Estratègia: xarxa primer quan hi ha connexió; còpia local com a reserva offline.
  Canvia CACHE a cada publicació.
*/
const CACHE = "ale-roger-meso1-approved-a1-a2-a3-v1";
const CORE = [
  "./",
  "./index.html",
  "./exercise-animations-off.js",
  "./app.js",
  "./coach-enhancements.js",
  "./ale-brand.css",
  "./animations/approved-exercise-animations.css",
  "./animations/approved-exercise-animations.js",
  "./animations/approved/a1-goblet/goblet-lateral-correcte.gif",
  "./animations/approved/a1-goblet/goblet-frontal-correcte.gif",
  "./animations/approved/a1-goblet/goblet-frontal-error-valg-de-genoll.gif",
  "./animations/approved/a2-bench/bench-lateral-correcte.gif",
  "./animations/approved/a2-bench/bench-obliqua-correcte.gif",
  "./animations/approved/a2-bench/bench-obliqua-error-colzes-massa-oberts.gif",
  "./animations/approved/a3-dbrow-banc-genoll/dbrow-banc-genoll-lateral-correcte.gif",
  "./animations/approved/a3-dbrow-banc-genoll/dbrow-banc-genoll-obliqua-correcte.gif",
  "./animations/approved/a3-dbrow-banc-genoll/dbrow-banc-genoll-obliqua-error-girar-torax.gif",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./robots.txt"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put("./index.html", copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match("./index.html").then((cached) => cached || Response.error()))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || Response.error()))
  );
});
