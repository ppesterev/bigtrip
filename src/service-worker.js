const CACHE_PREFIX = "bigtrip-cache";
const CACHE_VER = "v1";
const CACHE_NAME = `${CACHE_PREFIX}_${CACHE_VER}`;
const CACHE_FILES = [
  "/",
  "/index.html",
  "/index.js",
  "/index.css",
  "/css/style.css",
  "/img/header-bg.png",
  "/img/header-bg@2x.png",
  "/img/logo.png"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_FILES))
  );
});

self.addEventListener("activate", (evt) => {
  console.log("Service worker activated");
  evt.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) =>
            key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME
              ? caches.delete(key)
              : Promise.resolve(null)
          )
        )
      )
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse;
      }
      return fetch(evt.request).then((response) => {
        const clonedResponse = response.clone();
        if (response && response.status === 200 && response.type === "basic") {
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(evt.request, clonedResponse));
        }
        return response;
      });
    })
  );
});
