

const customerService = (function () {
	const _baseUrl = 'http://localhost:49970';



	const getAllCustomers = async () => {
		const response = await fetch(_baseUrl + '/api/customer');
		const json = await response.json();
		return json;
	}


	const getCustomer = async (id) => {
		const response = await fetch(_baseUrl + '/api/customer/' + id);
		const json = await response.json();
		return json;
	}


	return {
		getAllCustomers: (getAllCustomers),
		getCustomer: (getCustomer)
	}
})();

