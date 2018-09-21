
'use strict';

var cacheOn = false;
var modelCacheName;


var shellFilesToCacheTest = [
	'/pwaforgedevcon2018/favicon.ico'
];

var shellFilesToCache = [
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
	'/pwaforgedevcon2018/assets/plugins/jquery/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
	'https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css',
	'https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2',

	'/pwaforgedevcon2018/favicon.ico',
	
	'/pwaforgedevcon2018/about.html',
	'/pwaforgedevcon2018/customerdetails.html',
	'/pwaforgedevcon2018/customers.html',
	'/pwaforgedevcon2018/index.html',
	'/pwaforgedevcon2018/otherpage.html',
	'/pwaforgedevcon2018/partdetails.html',
	'/pwaforgedevcon2018/settings.html',
	'/pwaforgedevcon2018/spareparts.html',
	'/pwaforgedevcon2018/viewer.html',
	
	'/pwaforgedevcon2018/cssapp/stylesheet.css',
	
	'/pwaforgedevcon2018/jsapp/customer-service.js',
	'/pwaforgedevcon2018/jsapp/customerdetails.js',
	'/pwaforgedevcon2018/jsapp/customers.js',
	'/pwaforgedevcon2018/jsapp/forgeauth.js',
	'/pwaforgedevcon2018/jsapp/index.js',
	'/pwaforgedevcon2018/jsapp/part-data-service.js',
	'/pwaforgedevcon2018/jsapp/partdetails.js',
	'/pwaforgedevcon2018/jsapp/settings.js',
	'/pwaforgedevcon2018/jsapp/spareparts.js',
	'/pwaforgedevcon2018/jsapp/sw-messaging.js',
	'/pwaforgedevcon2018/jsapp/viewer.js',
];

const staticShellPrefix = 'app-shell-';
const staticShellCacheId = staticShellPrefix + '01';



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

