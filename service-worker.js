
'use strict';

var cacheOn = false;
var modelCacheName;


var shellFilesToCache = [
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
	'/assets/plugins/jquery/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
	'https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css',
	'https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2',

	'/favicon.ico',
	
	'/about.html',
	'/customerdetails.html',
	'/customers.html',
	'/index.html',
	'/otherpage.html',
	'/partdetails.html',
	'/settings.html',
	'/spareparts.html',
	'/viewer.html',
	
	'/cssapp/stylesheet.css',
	
	'/jsapp/customer-service.js',
	'/jsapp/customerdetails.js',
	'/jsapp/customers.js',
	'/jsapp/forgeauth.js',
	'/jsapp/index.js',
	'/jsapp/part-data-service.js',
	'/jsapp/partdetails.js',
	'/jsapp/settings.js',
	'/jsapp/spareparts.js',
	'/jsapp/sw-messaging.js',
	'/jsapp/viewer.js',
];

const staticShellPrefix = 'app-shell-';
const staticShellCacheId = staticShellPrefix + '02';



self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(staticShellCacheId).then(function (cache) {
			return cache.addAll(shellFilesToCache);
		}).catch(function (error) {
			console.error(error);
		})
	);
});



self.addEventListener('activate', function (event) {
	console.log('activating service worker');
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName !== staticShellCacheId && cacheName.startsWith(staticShellPrefix)) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});



self.addEventListener('fetch', function (event) {
	const requestedUrl = event.request.url;
	console.log('fetch event: ' + requestedUrl);
	if (cacheOn) {
		console.log('cache: on => ' + modelCacheName);
	} else {
		console.log('cache: off');
	}

	event.respondWith(
		caches.match(event.request).then(function (response) {
			if (response) {
				/// we found our response in the cache, so we can just return it.
				/// however, at this point, we should also check to see if the
				/// token is being retrieved. If so we should still go online
				/// for the token if we are online.
				console.log('Cache fetch: ' + requestedUrl);
				if (navigator.onLine && requestedUrl.endsWith('/api/forgeauth/viewer')) {
					console.log('still want the token from the web');
					return fetch(event.request).then(function (response) {
						cacheRequest(requestedUrl, response.clone());
						return response;
					})
				}
				return response;
			}

			console.log('fetching from the interwebz');
			return fetch(event.request).then(function (response) {
				cacheRequest(requestedUrl, response.clone());
				return response;
			}).catch(function (error) {
				console.error('SERVICEWORKER fetch error: ' + error);
				return new Response();
			});
		})
	);
});


function cacheRequest(url, response) {
	if (cacheOn && modelCacheName !== undefined && modelCacheName.length > 0) {
		return caches.open(modelCacheName).then(function (cache) {
			cache.put(url, response);
		});
	}
}



self.addEventListener('message', function (event) {
	console.log('from messageevent in service worker: ');
	console.log(event.data);

	if (event.data.command === 'cacheCommand') {
		cacheOn = event.data.data.cache;
		modelCacheName = event.data.data.name;
	}
});

