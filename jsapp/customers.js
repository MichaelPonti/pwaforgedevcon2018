
(async function () {


	var customers = await customerService.getAllCustomers();
	const myList = $("#customerList");
	for (var i = 0; i < customers.length; i++) {
		var c = customers[i];
		var item = '<li class="list-group-item" data-id="' + c.id + '">';
		if (c.outstandingOrders > 0) {
			item = item + '<span class="badge badge-error">' + c.outstandingOrders + '</span>';
		}
		item = item + '<h4>' + c.companyName + '</h4>' + c.contactName + '</li>';
		myList.append(item);
	}




	document.getElementById('customerList').addEventListener('click', function (event) {
		event = event || window.event;
		const item = event.target || event.srcElement;

		console.log(item);
		var parentListItem = domUtils.getParentElement(item, 'li');
		if (parentListItem) {
			const customerId = parentListItem.getAttribute("data-id");
			console.log('selected: ' + customerId);
			window.location.href = '/customerdetails?id=' + customerId;
		}
	});
})();