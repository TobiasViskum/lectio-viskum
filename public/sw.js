const cacheName = "version-1.0.0";
const contentToCache = ["/"];

self.addEventListener("install", (e) => {
  e.waitUntil(async () => {
    const cache = await caches.open(cacheName);

    await cache.addAll(contentToCache);
  });
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);

      const fetchRequest = async () => {
        const response = await fetch(e.request);
        if (e.request.method === "GET") {
          cache.put(e.request, response.clone());
        }

        return response;
      };

      const networkFirst = async () => {
        try {
          const response = await fetchRequest();
          return response;
        } catch (err) {
          const r = await caches.match(e.request);
          if (r) {
            return r;
          }
        }
      };
      const cacheFirst = async () => {
        const r = await caches.match(e.request);
        if (r) {
          return r;
        }
        try {
          const response = await fetchRequest();
          return response;
        } catch (err) {
          const r = await caches.match(e.request);
          if (r) {
            return r;
          }
        }
      };

      if (e.request.url.includes("image")) {
        const response = await cacheFirst();
        return response;
      } else {
        const response = await networkFirst();
        return response;
      }
    })(),
  );
});

self.addEventListener("push", (event) => {
  const payload = event.data?.text() ?? "no payload";
  event.waitUntil(
    self.registration.showNotification("Title 1", {
      title: "Title 2",
      body: payload,
    }),
  );
});
