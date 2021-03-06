
const urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvcDEuaXB0';
const urn2 = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvNTEwMTAyNzJEQjAxLmR3Zw';
const urn3 = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvSW52ZW50b3JiZW5jaFBhcnQuaXB0';
const urn4 = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bXlmaXJzdHZpZXdlcmFwcHBlcnNpc3RidWNrZXQvcG5nLnppcA';

document.getElementById('btnViewerToken').addEventListener('click', async function (event) {
	// var ret = await forgeAuth.authenticateViewer();
	// console.log(ret);
	// var ret2 = await forgeAuth.authenticateForge();
	// console.log(ret2);
	var ret3 = await forgeAuth.authForgeAzure();
	console.log(ret3);
});

document.getElementById('btnLoadModel1').addEventListener('click', async function (event) {
	launchViewer2(urn);
});


document.getElementById('btnLoadModel2').addEventListener('click', async function (event) {
	launchViewer2(urn2);
});


document.getElementById('btnLoadModel3').addEventListener('click', async function (event) {
	launchViewer2(urn3);
});

document.getElementById('btnLoadModel4').addEventListener('click', async function (event) {
	// swCommand.cacheCommand(true, 'model4');
	// const token = await forgeAuth.authenticateViewer();
	// window.location.href = '/viewer.html?urn=' + urn4 + '&token=' + token.access_token;
	launchViewer2(urn4);
});

document.getElementById('btnViewer2').addEventListener('click', function (event) {
	launchViewer2(urn);
});

document.getElementById('btnViewer2Model4').addEventListener('click', function (event) {
	console.log('setup caching first');
	setupCaching(urn4).then(function () {
		console.log('going to viewer page');
		window.location.href = '/pwaforgedevcon2018/viewer2.html?urn=' + urn4;
	})
	.catch(function (error) {
		console.log(error);
	});
});

function launchViewer2(urn) {
	console.log('setup caching first');
	setupCaching(urn).then(function () {
		console.log('going to viewer page');
		window.location.href = 'viewer2.html?urn=' + urn;
	}).catch(function (error) {
		console.error(error);
	});
}


function isCachingEnabled() {
	var cb = document.getElementById('cbCache');
	return cb.checked;
}


async function setupCaching(urn) {
	const cacheOn = isCachingEnabled();
	if (cacheOn) {
		await SwComms.cacheModel(urn);
	} else {
		await SwComms.cacheOff();
	}
}


