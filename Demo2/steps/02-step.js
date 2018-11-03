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

