importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (self.workbox) {
  console.log("Yay! Workbox is loaded 🎉");
} else {
  console.log("Boo! Workbox didn't load 😬");
}

const CACHE_NAME = "football";
var urlsToCache = [
  {url: "/",revision : "2"},
  {url: "/pages/nav.html",revision : "2"},
  {url: "/index.html",revision : "2"},
  {url: "/pages/home.html",revision : "2"},
  {url: "/pages/about.html",revision : "2"},
  {url: "/pages/contact.html",revision : "2"},
  {url: "/pages/tim.html",revision : "2"},
  {url: "/pages/favmatch.html",revision : "2"},
  {url: "/pages/favtim.html",revision : "2"},
  {url: "/asset/css/materialize.min.css",revision : "2"},
  {url: "/asset/js/jquery-3.5.1.min.js",revision : "2"},
  {url: "/asset/js/materialize.min.js",revision : "2"},
  {url: "/asset/js/nav.js",revision : "2"},
  {url: "/asset/js/api.js",revision : "2"},
  {url: "/asset/js/thedb.js",revision : "2"},
  {url: "/manifest.json",revision : "2"},
];
var base_url = "https://api.football-data.org/v2/";



// Save cache 
// self.addEventListener("install", function (event) {
//   console.log("ServiceWorker: Menginstall..");

//   event.waitUntil(
//     caches.open(CACHE_NAME).then(function (cache) {
//       console.log("ServiceWorker: Membuka cache..");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });
workbox.precaching.precacheAndRoute(urlsToCache);
// cache binary
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images"
  })
);
workbox.routing.registerRoute(
  new RegExp("/asset/css/"),
  workbox.strategies.cacheFirst({
    cacheName: "styles"
  })
);
workbox.routing.registerRoute(
  new RegExp("/images/"),
  workbox.strategies.cacheFirst({
    cacheName: "images"
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp("#home"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);
workbox.routing.registerRoute(
  new RegExp("#total"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);
workbox.routing.registerRoute(
  new RegExp("#away"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);
workbox.routing.registerRoute(
  new RegExp("#about"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);
workbox.routing.registerRoute(
  new RegExp("#contact"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);
workbox.routing.registerRoute(
  new RegExp("#favtim"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);
workbox.routing.registerRoute(
  new RegExp("#tim"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "pages"
  })
);
// // ambil dari cache
// self.addEventListener("fetch", function (event) {
//   event.respondWith(
//     caches
//       .match(event.request, { cacheName: CACHE_NAME })
//       .then(function(response) {
//         if (response) {
//           // console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//           return response;
//         }
 
//         // console.log( "ServiceWorker: Memuat aset dari server: ", event.request.url );
//         var fetchRequest = event.request.clone();
//         return fetch(fetchRequest).then(
//           function(response) {
//             if(!response || response.status !== 200) {
//               return response;
//             }
//             var responseToCache = response.clone();
//             caches.open(CACHE_NAME)
//             .then(function(cache) {
//               cache.put(event.request, responseToCache);
//             });
//             return response;
//           }
//         );
//       })
//   );
  
//   // if (event.request.url.indexOf(base_url) > -1) {
//   //   event.respondWith(
//   //     caches.open(CACHE_NAME).then(function(cache) {
//   //       return fetch(event.request).then(function(response) {
//   //         cache.put(event.request.url, response.clone());
//   //         return response;
//   //       })
//   //     })
//   //   );
//   // } else {
//   //   event.respondWith(
//   //     caches.match(event.request).then(function(response) {
//   //       return response || fetch (event.request);
//   //     })
//   //   )
//   // }
// });


// //mekanisme menghapus cache lama
// self.addEventListener("activate", function (event) {
//   event.waitUntil(
//     caches.keys().then(function (cacheNames) {
//       return Promise.all(
//         cacheNames.map(function (cacheName) {
//           if (cacheName != CACHE_NAME && cacheName.startsWith("football")) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// workbox.routing.registerRoute(
//   new RegExp(base_url+"competitions/2021/teams"),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: "api-cache",
//     plugins: [
//       workbox.cacheableResponse.Plugin({
//         statuses: [200, 404]
//       })
//     ]
//   })
// );

// workbox.routing.registerRoute(
//   new RegExp(base_url+"competitions/2021/standings"),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: "api-cache",
//     plugins: [
//       new workbox.cacheableResponse.Plugin({
//         statuses: [200, 404]
//       })
//     ]
//   })
// );

// workbox.routing.registerRoute(
//   new RegExp(base_url+"/teams/"),
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: "api-cache",
//     plugins: [
//       workbox.cacheableResponse.Plugin({
//         statuses: [200, 404]
//       })
//     ]
//   })
// );

workbox.routing.registerRoute(
  new RegExp('/v2/'),
  workbox.strategies.cacheOnly()
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 

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