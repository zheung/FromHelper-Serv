(function() {
	d.v.lockComm = false;

	d.t.get = function(url, data, done, fail, always) {
		if(!d.v.lockComm) {
			d.v.lockComm = true;

			return $.get({
				url: url,
				data: data,
			})
			.done(done).fail(fail)
			.always(function() {
				d.v.lockComm = false;

				if(always) always();
			});
		}
	};
})();