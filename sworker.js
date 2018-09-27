const cacheVersion = 'v1';
/**
 * Install the service worker
 * Inspiration from: https://developers.google.com/web/fundamentals/primers/service-workers/
 * Inspiration from: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 */
const cachedAssets = [
    './index.html',
    './restaurant.html',
    './assets/js/main.js',
    './assets/css/styles.css',
    './assets/css/webfonts.css',
    './assets/js/dbhelper.js',
    './assets/js/restaurant_info.js',
    './assets/img/1.jpg',
    './assets/img/2.jpg',
    './assets/img/3.jpg',
    './assets/img/4.jpg',
    './assets/img/5.jpg',
    './assets/img/6.jpg',
    './assets/img/7.jpg',
    './assets/img/8.jpg',
    './assets/img/9.jpg',
    './assets/img/10.jpg'
];

self.addEventListener('install', function (ev) {
    // Handle the cached objects
    ev.waitUntil(
        caches
        .open(cacheVersion)
        .then(cache => {
            cache.addAll(cachedAssets)
                .then(() => self.skipWaiting());
        }));
});

/**
 * Activate service worker
 */
self.addEventListener('activate', function (ev) {

    // Removed unwanted caches
    ev.waitUntil(
        caches.keys()
        .then(cacheVersion => {
            return Promise.map(cache => {
                if (cache !== cacheVersion) {
                    // Delete unwanted cached versions in our cache storage
                    return caches.delete(cache);
                }
            });
        })
    );
});

// Get the site assets and cache for offline availability
self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(ev.request)
        .then(resData => {
            if (resData){
                return resData;
            }
            // Clone the request
            const requestClone = ev.request.clone();

            return fetch(requestClone)
            .then(resData => {
                if (!resData || resData.status !== 200 || resData.type !== 'basic'){
                    return resData;
                }
                // clone the response
                const resDataClone = resData.clone();

                caches.open(cacheVersion)
                .then(cache => {
                    cache.put(ev.request, resDataClone);
                });
                return resData;
            })
        })
    )
})
