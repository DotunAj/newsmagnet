'use strict';

self.addEventListener('install', function (event) {
    event.waitUntil(caches.open('newsmagnet-v1').then(function (cache) {
        return cache.addAll(['/', 'css/main.css', 'js/main.js', 'https://use.fontawesome.com/releases/v5.0.10/js/all.js', 'assets/fallback.jpeg']);
    }));
});

self.addEventListener('fetch', function (event) {
    //Replaces broken images with fallback image
    event.respondWith(caches.match(event.request).then(function (response) {
        //if(response.status >= 300  && (response.url.match(/\.(jpeg|jpg|git|png)$/) != null) ) return caches.match('assets/fallback.jpeg');
        return response || fetch(event.request);
    }));
});