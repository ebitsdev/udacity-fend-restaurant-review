const version = 'alpha';
/**
 * Install the service worker
 */
const cachedElements = [
    './index.html',
    './assets/js.js',
    './assets/styles.css',
    './retaurant.html',
    './1.jpg',
    './2.jpg',
    './3.jpg',
    './4.jpg',
    './6.jpg',
    './7.2jpg',
    './8.2jpg',
    './9.2jpg',
    './10.2jpg'

];
self.addEventListener('install', function(e) {
    console.log(e);
    e.waitUntil();
    caches
    .open(cacheName)
    .then (cache =>{
        console.log(cachedElements);
    })
});

/**
 * Activate service worker
 */
self.addEventListener('activate', function(e) {
    console.log('Service worker activated');
});