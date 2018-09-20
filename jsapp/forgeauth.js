

var forgeAuth = (function () {
	const _baseUrl = 'http://localhost:49970';

	function readJson(response) {
		var ret = response.json();
		return ret;
	}

	function logError(error) {
		console.error('Error: ' + error);
	}

	function validateResponse(response) {
		if (!response.ok) {
			throw Error(response);
		}
	}

	// https://dev.to/johnpaulada/synchronous-fetch-with-asyncawait
	const authenticateViewer = async () => {
		const response = await fetch(_baseUrl + '/api/forgeauth/viewer');
		const json = await response.json();
		return json;
	}


	const authenticateForge = async () => {
		const response = await fetch(_baseUrl + '/api/forgeauth');
		const json = await response.json();
		return json;
	}


	const authForgeAzure = async () => {
		const response = await fetch('https://auauth2018.azurewebsites.net/api/Function1');
		const json = await response.json();
		console.log(json);
		return json;
	}


	return {
		authenticateViewer: (authenticateViewer),
		authenticateForge: (authenticateForge),
		authForgeAzure: (authForgeAzure)
	}
})();




