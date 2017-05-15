(function() {
	var on = function(event, func) { app.io.on('af-'+event, func); };

	app.emit = function() {
		var args = Array.prototype.slice.call(arguments);

		args[0] = 'af-'+args[0];

		app.io.emit.apply(this, args);
	};

	on('mod', function() {
		app.pageTurn(app.pageNow);
	});
	on('list', function(result) {
		app.recos = result.records;
		app.pageNow = result.now;
		app.pageMax = result.max;
	});
})();

(function() {
	var first = true;

	app.io.on('ready', function() {
		clearInterval(itr);

		if(first) {
			first = false;

			app.pageTurn(1);
		}
	});

	var itr = setInterval(function() {
		app.io.emit('ready');
	}, 500);
})();