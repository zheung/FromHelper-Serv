(function() {
	var clicker = function() {
		var $this = $(this);

		if(typeof($this.data('stop')) != 'undefined') return false;

		var data = $this.data(), key = data.taberKey, page = data.taberPage, func = data.taberFunc,
			taber = d.v.taber[key], eHeads = taber.eHeads, eItems = taber.eItems;

		if(page) {
			eHeads.filter(':not(.active)').removeClass('active');
			$this.addClass('active');

			eItems.filter(':not(.hide)').addClass('hide');
			eItems.filter('[data-page='+page+']').removeClass('hide');
		}

		if(func) {
			eHeads.filter(':not([data-func='+func+'])').removeClass('active');
			$(this).addClass('active');

			kqf['tab'+key](func);
		}
	};

	d.v.taber = {};

	d.t.taber = function(key, eHeads, eItems, activeClass) {
		eHeads.on('click', clicker);

		d.v.pager[key] = {
			eHeads: eHeads, eItems: eItems,
			active: activeClass
		};
	};
})();