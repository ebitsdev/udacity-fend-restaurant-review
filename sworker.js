const cacheVersion = 'v1';
/**
 * Install the service worker
 * Inspiration from: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
 */
const cachedAssets = [

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
