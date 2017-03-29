(function() {
	var clicker = function() {
		var $this = $(this), data = $this.data();

		var key = data.hoverKey, now = ++data.hoverNow,
			hover = d.v.hover[key], values = hover.values, len = hover.len, func = hover.func;

		if(now == len) now = data.hoverNow = 0;

		$this.html(values[now]);

		if(func) func(now, $this, values);
	};

	d.e.hoverText = $('<div>').attr('id', 'HoverText').css('position', 'absolute').appendTo('body');

	d.t.hoverText = function(ele) {
		ele.off('hover').on('hover', clicker).each(function() {
			var $this = $(this), text = text.data('hoverText');
		});
	};
})();