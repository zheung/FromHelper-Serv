(function() {
	var clicker = function() {
		var $this = $(this);

		if(typeof($this.data('stop')) != 'undefined') return false;

		var data = $this.data(), key = data.taberKey, page = data.taberPage,
			taber = d.v.taber[key], eHeads = taber.eHeads, eItems = taber.eItems;

		if(page) {
			eHeads.filter('.active').removeClass('active');
			$this.addClass('active');

			eItems.filter(':not(.hide)').addClass('hide');
			eItems.filter('[data-taber-page='+page+']').removeClass('hide');
		}
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