const cacheName = 'v1';
/**
 * Install the service worker
 */
const cachedElements = [
    '/index.html',
    '/restaurant.html',
    '/assets/main.js',
    '/assets/styles.css',
    '/assets/css/webfonts.scss',
    '/restaurant.html',
    '/assets/js/dbhelper.js',
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
self.addEventListener('install', function(e) {
    console.log('Service Worker installed');
    // Handle the cached objects
    e.waitUntil(
    caches
    .open(cacheName)
    .then (cache => {
        console.log('Service worker installed');
        cache.addAll(cachedElements)
    .then(() =>
        self.skipWaiting())
    }));
});

/**
 * Activate service worker
 */
self.addEventListener('activate', function(e) {
    console.log('Service worker activated');
});