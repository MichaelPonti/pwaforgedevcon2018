
'use strict';

self.importScripts('jsapp/idb.js');
self.importScripts('jsapp/appdb.js');
self.importScripts('jsapp/batchDownload.js');




const SHELL_CACHE_NAME_PREFIX = 'app-shell-';
const SHELL_CACHE_NAME = SHELL_CACHE_NAME_PREFIX + '042';


const SERVER_PREFIX = '/';
// const SERVER_PREFIX = '/pwaforgedevcon2018-2/';


var shellFilesToCache = [
	// CDN URLS
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/fonts/glyphicons-halflings-regular.woff2',

	// Forge URLS

	
	
	// app local URLS
	`${SERVER_PREFIX}`,
	`${SERVER_PREFIX}index.html`,
	`${SERVER_PREFIX}assets/plugins/jquery/jquery.min.js`,
	`${SERVER_PREFIX}favicon.ico`,
	
	`${SERVER_PREFIX}about.html`,
	`${SERVER_PREFIX}customers.html`,
	`${SERVER_PREFIX}index.html`,
	`${SERVER_PREFIX}viewer2.html`,
	
	`${SERVER_PREFIX}cssapp/stylesheet.css`,
	
	`${SERVER_PREFIX}jsapp/appcommander.js`,
	`${SERVER_PREFIX}jsapp/appdb.js`,
	`${SERVER_PREFIX}jsapp/batchdownload.js`,
	`${SERVER_PREFIX}jsapp/generalutils.js`,
	`${SERVER_PREFIX}jsapp/idb.js`,
	`${SERVER_PREFIX}jsapp/index.js`,
	`${SERVER_PREFIX}jsapp/viewer2.js`,
];




self.addEventListener('error', function (error) {
	console.error(error);
});



self.addEventListener('install', function (event) {
	console.log('sw: install event');
	event.waitUntil(installAsync(event));
});

async function installAsync(event) {
	// it is easier to add to the cache using addAll, but it
	// is hard to find any problem url's if you do it that way.
	return caches.open(SHELL_CACHE_NAME).then(function (cache) {
		return Promise.all(
			shellFilesToCache.map(function (url) {
				return cache.add(url).catch(function (reason) {
					return console.log(`${url} failed: ${reason}`);
				});
			})
		);
	});
}



self.addEventListener('activate', function (event) {
	console.log('activating service worker');
	event.waitUntil(activateAsync(event));
});

async function activateAsync(event) {
	const keys = await caches.keys();
	keys.map(async function (cacheName) {
		console.log(`checking ${cacheName}`);
		if (cacheName !== SHELL_CACHE_NAME && cacheName.startsWith(SHELL_CACHE_NAME_PREFIX)) {
			await caches.delete(cacheName);
		}
	});
}


self.addEventListener('fetch', function (event) {
	console.log(`fetch: ${event.request.url}`);
	event.respondWith(fetchAsync(event));
});

let cacheOn = true;
let urnToCache = null;


async function fetchAsync(event) {
	return fetch(event.request);
}


async function removeExistingResponse(url) {
	const cache = await caches.open('models');
	if (cache) {
		await cache.delete(url);
	}
}



async function cacheRequest(url, response) {
	if (cacheOn) {
		const modelCache = await caches.open('models');
		await modelCache.put(url, response);
	}
}


async function cleanModelFromCacheAsync(urn) {
	await appDb.removeUrnFromDictAsync(urn);
	const cache = await caches.open('models');
	const urls = await cache.keys();
	const urlsToDelete = urls.filter(req => req.url.includes(urn));
	return Promise.all(urlsToDelete.map(req => cache.delete(req)));
}



async function addUrnToOffline(urn) {
	await appDb.saveUrnToDictAsync(urn);
}




