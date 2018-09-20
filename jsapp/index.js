
const urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvcDEuaXB0';
const urn2 = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvNTEwMTAyNzJEQjAxLmR3Zw==';
const urn3 = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvSW52ZW50b3JiZW5jaFBhcnQuaXB0';
const urn4 = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvcG5nLnppcA==';

document.getElementById('btnViewerToken').addEventListener('click', async function (event) {
	// var ret = await forgeAuth.authenticateViewer();
	// console.log(ret);
	// var ret2 = await forgeAuth.authenticateForge();
	// console.log(ret2);
	var ret3 = await forgeAuth.authForgeAzure();
	console.log(ret3);
});

document.getElementById('btnLoadModel1').addEventListener('click', async function (event) {
	launchViewer(urn, 'model1');
});


document.getElementById('btnLoadModel2').addEventListener('click', async function (event) {
	launchViewer(urn2, 'model2');
});


document.getElementById('btnLoadModel3').addEventListener('click', async function (event) {
	launchViewer(urn3, 'model3');
});

document.getElementById('btnLoadModel4').addEventListener('click', async function (event) {
	// swCommand.cacheCommand(true, 'model4');
	// const token = await forgeAuth.authenticateViewer();
	// window.location.href = '/viewer.html?urn=' + urn4 + '&token=' + token.access_token;

	launchViewer(urn4, 'model4');
});


document.getElementById('listModels').addEventListener('click', function (event) {
	console.log(event);
});


document.getElementById('btnAllParts').addEventListener('click', async function (event) {
	var data = await partDataService.getAllParts();
	console.log(data);
});


document.getElementById('btnExistPart').addEventListener('click', async function (event) {
	var data = await partDataService.getPartData('6551000060');
	console.log(data);
});

document.getElementById('btnMissingPart').addEventListener('click', async function (event) {
	var data = await partDataService.getPartData('part-6551000060');
	console.log(data);
});


document.getElementById('btnExistBom').addEventListener('click', async function (event) {
	var data = await partDataService.getBomForPart('6570050102');
	console.log(data);
});


document.getElementById('btnMissingBom').addEventListener('click', async function (event) {
	var data = await partDataService.getBomForPart('bom-6570050102');
	console.log(data);
});


document.getElementById('btnExistAml').addEventListener('click', async function (event) {
	var data = await partDataService.getAmlForPart('6553250052');
	console.log(data);
});

document.getElementById('btnMissingAml').addEventListener('click', async function (event) {
	var data = await partDataService.getAmlForPart('aml-6553250052');
	console.log(data);
});



(function () {

	// const customers = await customerService.getAllCustomers();
	// console.log(customers);
	console.log('place-holder for IIFE');



})();