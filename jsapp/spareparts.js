
(async function () {


	const partsData = await partDataService.getAllParts();
	if (partsData !== undefined) {
		const lst = $("#listParts");
		for (let i = 0; i < partsData.length; i++) {
			let p = partsData[i];
			let item = '<li class="list-group-item" data-id="' + p.partId + '">';
			item = item + '<h4>' + p.partId + ' rev: ' + p.revision + '</h4>';
			item = item + p.description;
			item = item + "</li>";
			lst.append(item);
		}
	}



	document.getElementById('listParts').addEventListener('click', function (event) {
		event = event || window.event;
		const item = event.target || event.srcElement;

		console.log(item);
		var parentListItem = domUtils.getParentElement(item, 'li');
		if (parentListItem) {
			const partId = parentListItem.getAttribute('data-id');
			console.log('selected: ' + partId);
			window.location.href = '/partdetails?id=' + partId;
		}
	});




})();
