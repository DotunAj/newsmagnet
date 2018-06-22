self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('newsmagnet-v1')
        .then((cache) => {
            return cache.addAll([
                '/',
                'css/main.css',
                'js/main.js',
                'https://use.fontawesome.com/releases/v5.0.10/js/all.js',
                'assets/fallback.jpeg',
                'assets/logo.png'
            ]);
        })
    )
})

self.addEventListener('fetch', (event) => {
    //Replaces broken images with fallback image
    if (event.request.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        event.respondWith(fetch(event.request)
        .then((response) => {
            if(!response.ok){
                return caches.match('assets/fallback.jpeg');
            }
            return response;
        })
        .catch((err) => {
            return caches.match(event.request)
        }))
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    )
})


