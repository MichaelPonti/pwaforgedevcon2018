
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


document.getElementById('btnDeleteCaches').addEventListener('click', async function (event) {
	await swCommand.removeAllModelCaches();
});
