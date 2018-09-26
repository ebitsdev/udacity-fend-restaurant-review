const cacheName = 'v1';
/**
 * Install the service worker
 */
const cachedElements = [
    'index.html',
    'restaurant.html',
    '/assets/js/main.js',
    '/assets/css/styles.css',
    '/assets/css/webfonts.css',
    '/assets/js/dbhelper.js',
    '/assets/js/restaurant_info.js',
    '/assets/img/1.jpg',
    '/assets/img/2.jpg',
    '/assets/img/3.jpg',
    '/assets/img/4.jpg',
    '/assets/img/5.jpg',
    '/assets/img/6.jpg',
    '/assets/img/7.jpg',
    '/assets/img/8.jpg',
    '/assets/img/9.jpg',
    '/assets/img/10.jpg'
];
self.addEventListener('install', function (ev) {
    console.log('Service Worker installed');
    // Handle the cached objects
    ev.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Caching assets');
            cache.addAll(cachedElements)
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
        .then(cacheName => {
            return Promise.map(cache => {
                if (cache !== cacheName) {
                    // Delete all other caches that we are not dealing with at the moment
                    return caches.delete(cache);
                }
            });
        })
    );
});
// Show offline files
self.addEventListener('fetch', ev => {
    // check if there is network or not
    
    ev.respondWith(
        fetch(ev.request).catch(() => caches.match(ev.request)));
});