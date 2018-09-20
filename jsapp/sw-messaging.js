

const swCommand = (function () {
	
	/// ********************************************************************************************
	/// this command will send a message to the service worker. It should be in the following
	/// format. This is a private function that will ensure a proper structure for the message
	/// handler in the service worker.
	/// {
	/// 	command: string,
	///		data: any	
	///	}
	/// -----------------------------------------
	/// cmd: string, name of the command
	/// data: data used by the command. could be any format
	/// ********************************************************************************************
	function sendMessageToServiceWorker(cmd, data) {
		navigator.serviceWorker.controller.postMessage({ command: cmd, data: data });
	}


	/// ********************************************************************************************
	/// controls the caching in the service worker. Send in the cache name and whether the cache
	/// should be turned on or not.
	/// -------------------------------------
	/// cacheOn: true/false turn cache on or off
	/// cacheName: name of cache. not used if cache is being turned off
	/// ********************************************************************************************
	function cacheCommand(cacheOn, cacheName) {
		const data = {
			cache: cacheOn,
			name: cacheName
		};
		sendMessageToServiceWorker('cacheCommand', data);
	}



	/// ********************************************************************************************
	/// Delete a single cache
	/// ------------------------------
	/// cacheName: name of cache to delete
	/// ********************************************************************************************
	function cacheDelete(cacheName) {
		const data = {
			name: cacheName
		};
		sendMessageToServiceWorker('cacheDelete', data);
	}



	/// members returned by the IIFE object
	/// swCommand.cacheCommand(...);
	return {
		cacheCommand: (cacheCommand),
		cacheDelete: (cacheDelete)
	};
})();




