

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

