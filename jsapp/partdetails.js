

(async function () {
	let urnInfo = null;

	function getPartId() {
		const txt = document.getElementById('txtPartId');
		const partId = txt.value;
		return partId;
	}

	
	document.getElementById('txtPartId').addEventListener('keypress', async function (event) {
		// don't need to prevent the default as we are not inside a form
		// and having to worry about submit.
		// event.preventDefault();
		if (event.keyCode === 13) {
			const partId = event.srcElement.value;
			console.log('load part details for', partId);
			await loadPartData(partId);
		}
	});

	document.getElementById('btnViewModel').addEventListener('click', function (event) {
		if (urnInfo !== null) {
			const partId = getPartId();
			const cacheKey = modelKey(partId);
			launchViewer(urnInfo.urn, cacheKey);
		}
	});






	function errorWellVis(visible) {
		const errorWell = document.getElementById('txtPartError');
		if (visible) {
			removeClass(errorWell, 'partDataNotFoundHidden');
		} else {
			addClass(errorWell, 'partDataNotFoundHidden');
		}
	}


	function makeSubDataVisible(messagePaneId, tableDataId, dataVisible) {
		const messagePane = document.getElementById(messagePaneId);
		const tableData = document.getElementById(tableDataId);

		if (dataVisible) {
			addClass(messagePane, 'hiddenMessagePanelBody');
			removeClass(tableData, 'hiddenTable');
		} else {
			removeClass(messagePane, 'hiddenMessagePanelBody');
			addClass(tableData, 'hiddenTable');
		}
	}

	function clearTableRows(table) {
		const rowCount = table.rows.length;
		for (let i = 0; i < rowCount; i++) {
			table.deleteRow(0);
		}
	}


	async function loadPartData(id) {
		const data = await partDataService.getPartData(id).catch(function (error) {
			console.error(error);
		});
		if (!data) {
			errorWellVis(true);
			return;
		}

		errorWellVis(false);
		document.getElementById('txtDescription').value = data.description;
		document.getElementById('txtRevision').value = data.revision;
		document.getElementById('txtStatus').value = data.status;
		document.getElementById('txtCost').value = data.standardCost;
		document.getElementById('txtOnHand').value = data.onHand;
		document.getElementById('txtLeadtime').value = data.leadtime;
		document.getElementById('cbIsApproved').checked = data.approvedSpare;

		const amlInfo = await partDataService.getAmlForPart(id).catch(function (error) {
			console.log(error);
		});
		if (amlInfo && amlInfo.length > 0) {
			makeSubDataVisible('noAmlMessageContainer', 'tableAml', true);

			const amlBody = document.getElementById('tableAmlBody');
			clearTableRows(amlBody);
			for (let i = 0; i < amlInfo.length; i++) {
				const row = amlBody.insertRow();
				row.insertCell().innerHTML = amlInfo[i].mfgName;
				row.insertCell().innerHTML = amlInfo[i].mfgPartId;
				row.insertCell().innerHTML = amlInfo[i].status;
			}
		} else {
			makeSubDataVisible('noAmlMessageContainer', 'tableAml', false);
		}


		const bomInfo = await partDataService.getBomForPart(id).catch(function (error) {
			console.error(error);
		});
		if (bomInfo && bomInfo.length > 0) {
			const bomBody = document.getElementById('tableBomBody');
			clearTableRows(bomBody);
			makeSubDataVisible('noBomMessageContainer', 'tableBom', true);
			for (let i = 0; i < bomInfo.length; i++) {
				const row = bomBody.insertRow();
				row.insertCell().innerHTML = bomInfo[i].itemNumber;
				row.insertCell().innerHTML = bomInfo[i].quantity;
				var childPartIdHtml = '<a href="/partdetails.html?id=' + bomInfo[i].partId + '">' + bomInfo[i].partId + '</a>';
				row.insertCell().innerHTML = childPartIdHtml;
				row.insertCell().innerHTML = bomInfo[i].partDescription;
			}
		} else {
			makeSubDataVisible('noBomMessageContainer', 'tableBom', false);
		}

		urnInfo = await partDataService.getUrnForPart(id)
		.catch(function (error) {
			urnInfo = null;
			btn.disabled = true;
		});

		const btn = document.getElementById('btnViewModel');
		if (urnInfo === null || urnInfo.urn === null || urnInfo.urn === undefined || urnInfo.urn === '') {
			btn.disabled = true;
		} else {
			btn.disabled = false;
		}
	}


	// -------------------------------------------------------------------
	// execute this when the page is loaded. It will try and get the 
	// part id from the url. If it finds one, it will load it.
	// -------------------------------------------------------------------
	var partId = getParameterByName('id');
	if (partId) {
		document.getElementById('txtPartId').value = partId;
		await loadPartData(partId);
	}
})();




