//-------------------------------------------------------------
// Most of this code was taken from forge sample applications
// such as the bucket manager.
//
//-------------------------------------------------------------




//-------------------------------------------------------------
// when the window unloads, we want to tell the service
// worker to stop caching data.
//-------------------------------------------------------------
window.addEventListener('unload', function (event) {
	console.log('viewer window unloaded');
	swCommand.cacheCommand(false, '');
});




var urn = getParameterByName('urn');
var token = getParameterByName('token');

if (urn != null && token != null) {
	showModel(urn, token);
}



var viewerApp;
function showModel(urn, token) {
	var options = {
		env: 'AutodeskProduction',
		accessToken: token

	};
	var documentId = 'urn:' + urn;
	Autodesk.Viewing.Initializer(options, function onInitialized() {
		viewerApp = new Autodesk.Viewing.ViewingApplication('MyViewerDiv');
		viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
		viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
	});
}

function onDocumentLoadSuccess(doc) {

	// We could still make use of Document.getSubItemsWithProperties()
	// However, when using a ViewingApplication, we have access to the **bubble** attribute,
	// which references the root node of a graph that wraps each object from the Manifest JSON.
	var viewables = viewerApp.bubble.search({ 'type': 'geometry' });
	if (viewables.length === 0) {
		alert('File not translated or not viewable');
		return;
	}

	// Choose any of the avialble viewables
	viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
	alert('File not translated or not viewable');
	console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onItemLoadSuccess(viewer, item) {
	console.log('onItemLoadSuccess()!');
	console.log(viewer);
	console.log(item);

	// Congratulations! The viewer is now ready to be used.
	console.log('Viewers are equal: ' + (viewer === viewerApp.getCurrentViewer()));

	// swCommand.cacheCommand(false, '');
}

function onItemLoadFail(errorCode) {
	console.error('onItemLoadFail() - errorCode:' + errorCode);
}

