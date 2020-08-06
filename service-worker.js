const CACHE_NAME = "football";
var urlsToCache = [
  "/",
  "/pages/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/tim.html",
  "/pages/favmatch.html",
  "/pages/favtim.html",
  "/asset/css/materialize.min.css",
  "/asset/js/jquery-3.5.1.min.js",
  "/asset/js/materialize.min.js",
  "/asset/js/nav.js",
  "/asset/js/api.js",
  "/asset/js/thedb.js",
  "/manifest.json",
];
var base_url = "https://api.football-data.org/v2/";

// Save cache 
self.addEventListener("install", function (event) {
  console.log("ServiceWorker: Menginstall..");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

// ambil dari cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          // console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        // console.log( "ServiceWorker: Memuat aset dari server: ", event.request.url );
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200) {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          }
        );
      })
  );
  
  // if (event.request.url.indexOf(base_url) > -1) {
  //   event.respondWith(
  //     caches.open(CACHE_NAME).then(function(cache) {
  //       return fetch(event.request).then(function(response) {
  //         cache.put(event.request.url, response.clone());
  //         return response;
  //       })
  //     })
  //   );
  // } else {
  //   event.respondWith(
  //     caches.match(event.request).then(function(response) {
  //       return response || fetch (event.request);
  //     })
  //   )
  // }
});


//mekanisme menghapus cache lama
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME && cacheName.startsWith("football")) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/notif.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});