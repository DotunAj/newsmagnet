'use strict';

self.addEventListener('install', function (event) {
    event.waitUntil(caches.open('newsmagnet-v1').then(function (cache) {
        return cache.addAll(['/', 'css/main.css', 'js/bundle.js', 'https://use.fontawesome.com/releases/v5.0.10/js/all.js', 'assets/fallback.jpeg', 'assets/logo.png']);
    }));
});

self.addEventListener('fetch', function (event) {
    //Replaces broken images with fallback image
    if (event.request.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        if (event.request.url.includes('www.vanguardngr.com')) {
            event.respondWith(caches.match('assets/fallback.jpeg'));
            return;
        }

        event.respondWith(fetch(event.request).then(function (response) {
            if (response.status >= 300) {
                return caches.match('assets/fallback.jpeg');
            }
            return response;
        }).catch(function (err) {
            console.log(err);
            return caches.match('assets/fallback.jpeg');
        }));

        return;
    }

    if (event.request.url.includes('null')) {
        event.respondWith(caches.match('assets/fallback.jpeg'));
        return;
    }

    event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
    }));
});