'use strict';

self.addEventListener('install', function (event) {
    event.waitUntil(caches.open('newsmagnet-v1').then(function (cache) {
        return cache.addAll(['/', 'css/main.css', 'js/main.js', 'https://use.fontawesome.com/releases/v5.0.10/js/all.js', 'assets/fallback.jpeg', 'assets/logo.png']);
    }));
});

self.addEventListener('fetch', function (event) {
    //Replaces broken images with fallback image
    if (event.request.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        event.respondWith(fetch(event.request).then(function (response) {
            if (!response.ok) {
                return caches.match('assets/fallback.jpeg');
            }
            return response;
        }).catch(function (err) {
            return caches.match(event.request);
        }));
        return;
    }

    event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
    }));
});