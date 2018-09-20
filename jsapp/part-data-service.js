

var partDataService = (function () {
	const _baseUrl = 'http://localhost:49970/';


	const getPartData = async (id) => {
		const response = await fetch(_baseUrl + 'api/partdata/part/' + id);
		if (!response.ok) {
			return null;
		}

		const json = await response.json();
		return json;
	}


	const getAllParts = async () => {
		const response = await fetch(_baseUrl + 'api/partdata/parts');
		if (!response.ok) {
			return [];
		}

		const json = await response.json();
		return json;
	}


	const getAmlForPart = async (id) => {
		const response = await fetch(_baseUrl + 'api/partdata/aml/' + id);
		if (!response.ok) {
			return [];
		}

		const json = await response.json();
		return json;
	}


	const getBomForPart = async (id) => {
		const response = await fetch(_baseUrl + 'api/partdata/bom/' + id);
		if (!response.ok) {
			return [];
		}

		const json = await response.json();
		return json;
	}

	const getUrnForPart = async (id) => {
		const response = await fetch(_baseUrl + 'api/viewables/' + id);
		if (!response.ok) {
			return null;
		}

		const json = await response.json();
		return json;
	}

	return {
		getPartData: (getPartData),
		getAllParts: (getAllParts),
		getAmlForPart: (getAmlForPart),
		getBomForPart: (getBomForPart),
		getUrnForPart: (getUrnForPart),
	};
})();