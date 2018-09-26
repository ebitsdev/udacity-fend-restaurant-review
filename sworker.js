const cacheVersion = 'v1';
/**
 * Install the service worker
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
// self.addEventListener('fetch', ev => {
//     ev.respondWith(
//         fetch(ev.request).catch(() => caches.match(ev.request)));
// });
self.addEventListener('fetch', ev => {
    console.log('Fetchind response data');
    ev.respondWith(
        fetch(ev.request)
        // Cache the response data instead of caching only some of the files
        .then(resData => {
            // We need to clone the resData
            const resDataClone = resData.clone();
            caches
            .open(cacheVersion)
            .then(cache => {
                // Adding the resData to the cache
                cache.put(ev.request, resDataClone);
            });
            return resData;
        })
        .catch(error = caches.match(ev.request).then(resData => resData))
    );
})