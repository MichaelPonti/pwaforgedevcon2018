
self.addEventListener('message', function (event) {
	console.log('sw: message');
	messageAsync(event);
});


async function messageAsync(event) {
	switch(event.data.command) {
		case 'cacheModel':
			// message from app telling service worker that we should
			// either turn on or off caching. We want the urn so we
			// can store it in the indexeddb
			cacheOn = event.data.data.cacheOn;
			urnToCache = event.data.data.urn;
			console.log(`caching status: ${cacheOn} ${urnToCache}`);
			await addUrnToOffline(urnToCache);
			event.ports[0].postMessage({ status: 'ok' });
			break;
		case 'preloadModel':
			// message from app asking the service worker to
			// pre-download the urls required for caching a
			// model.
			const urn = event.data.data.urn;
			await addUrnToOffline(urn);
			var downloadUrls = await downloadModelFiles(urn);
			console.log(downloadUrls);
			event.ports[0].postMessage({ status: 'ok' });
			break;
		case 'deleteModel':
			// message from app asking the service worker to
			// remove a model from cache.
			await cleanModelFromCacheAsync(event.data.data.urn);
			event.ports[0].postMessage({ status: 'ok' });
			break;
		case '':
			break;
	}
}

