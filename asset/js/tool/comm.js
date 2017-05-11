(function() {
	window.comm = {
		lock: false
	};

	window.comm.request = function(method, url, data, done, fail, always) {
		if(!window.comm.lock) {
			window.comm.lock = true;

			return reqwest({
				method: method,
				url: url,
				data: data
			})
			.then(function(object) {
				window.comm.lock = false;

				if(done) done(object);
			})
			.fail(function() {
				window.comm.lock = false;

				if(fail) fail();
			})
			.always(function() {
				window.comm.lock = false;

				if(always) always();
			});
		}
	};

	window.comm.get = function(url, data, done, fail, always) {
		return window.comm.request('GET', url, data, done, fail, always);
	};
	window.comm.post = function(url, data, done, fail, always) {
		return window.comm.request('POST', url, data, done, fail, always);
	};
})();