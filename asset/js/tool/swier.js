(function() {
	var clicker = function() {
		var $this = $(this), data = $this.data();

		var key = data.swierKey, now = ++data.swierNow,
			swier = d.v.swier[key], values = swier.values, len = swier.len, func = swier.func;

		if(now == len) now = data.swierNow = 0;

		$this.html(values[now]);

		if(func) func(now, $this, values);
	};

	d.v.swier = {};

	d.t.swier = function(key, eButton, values, func) {
		eButton.off('click').on('click', clicker).data('swierKey', key).each(function() {
			var $this = $(this), now = $this.data('swierNow') || 0;

			$this.html(values[now]);
			$this.data('swierNow', now);

			if(func) func(now, $this, values);
		});

		d.v.swier[key] = {
			eButton: eButton, func: func,
			values: values, len: values.length
		};
	};
})();