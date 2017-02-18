(function() {
	var clicker = function() {
		var $this = $(this);

		if(typeof($this.data('stop')) != 'undefined') return false;

		var data = $this.data(), key = data.swierKey, now = ++data.swierNow,
			swier = d.v.swier[key], values = swier.values, len = swier.len, func = swier.func;

		if(now == len) now = data.swierNow = 0;

		$this.html(values[now]);

		if(func) func(values, now);
	};

	d.v.swier = {};

	d.t.swier = function(key, eButton, values, now, func) {
		eButton.on('click', clicker).data('swierKey', key).data('swierNow', now || -1);

		d.v.swier[key] = {
			eButton: eButton, func: func,
			values: values, len: values.length
		};
	};
})();