async function fetchAsync(event) {
	// we need to handle the auth endpoint separately.
	// as long as we are online, keep getting your token from
	// forge and not the cache, otherwise you will have an
	// expired token.
	if (event.request.url.endsWith('api/forgeauth')) {
		console.log('fetching viewer token online');
		try {
			const authResponse = await fetch(event.request);
			const authCache = await caches.open('authtokens');
			await authCache.put(event.request, authResponse.clone());
			return authResponse;
		}
		catch(err) {
			console.log(err);
			return caches.match(event.request);
		}
	}

	// after that, let's try and pull from the cache.
	const response = await caches.match(event.request, { 'ignoreSearch': true });
	if (response) {
		console.log(`cached: ${event.request.url}`);
		return response;
	}

	// it's not in the cache, so lets pull from online, and if we are currently
	// caching, we can add it to our models cache.
	const freshResponse = await fetch(event.request);
	if (freshResponse && cacheOn) {
		await cacheRequest(event.request.url, freshResponse.clone());
	}

	if (freshResponse) {
		return freshResponse;
	} else {
		return new Response();
	}
}
