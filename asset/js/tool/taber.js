(function() {
	var clicker = function() {
		var $this = $(this);

		if(typeof($this.data('stop')) != 'undefined') return false;

		var data = $this.data(), key = data.taberKey, page = data.taberPage, func = data.taberFunc,
			taber = d.v.taber[key], eHeads = taber.eHeads, eItems = taber.eItems;

		if(page) {
			eHeads.filter('.active').removeClass('active');
			$this.addClass('active');

			eItems.filter(':not(.hide)').addClass('hide');
			eItems.filter('[data-taber-page='+page+']').removeClass('hide');
		}

		// if(func) {
		// 	eHeads.filter(':not([data-func='+func+'])').removeClass('active');
		// 	$(this).addClass('active');

		// 	kqf['tab'+key](func);
		// }
	};

	d.v.taber = {};

	d.t.taber = function(key, eHeads, eItems, activeClass) {
		eHeads.on('click', clicker).data('taberKey', key);

		d.v.taber[key] = {
			eHeads: eHeads, eItems: eItems,
			active: activeClass
		};
	};
})();