<script>
	
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js')
		.then(function (registration) {
			console.log('Service worker registration successful with scope: ' + registration.scope);
		})
		.catch(function (error) {
			console.error('Service worker registration failed: ' + error);
		});
}


</script>
