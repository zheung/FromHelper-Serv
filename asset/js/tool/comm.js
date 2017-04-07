(function() {
	d.v.lockComm = false;

	d.t.get = function(url, data, done, fail, always) {
		if(!d.v.lockComm) {
			d.v.lockComm = true;

			return $.get({
				url: url,
				data: data,
			})
			.done(function(object) {
				d.v.lockComm = false;

				if(done) done(object);
			})
			.fail(function() {
				d.v.lockComm = false;

				if(fail) fail();
			})
			.always(function() {
				d.v.lockComm = false;

				if(always) always();
			});
		}
	};

	d.t.post = function(url, data, done, fail, always) {
		if(!d.v.lockComm) {
			d.v.lockComm = true;

			return $.post({
				url: url,
				data: data,
			})
			.done(function(object) {
				d.v.lockComm = false;

				if(done) done(object);
			})
			.fail(function() {
				d.v.lockComm = false;

				if(fail) fail();
			})
			.always(function() {
				d.v.lockComm = false;

				if(always) always();
			});
		}
	};
})();