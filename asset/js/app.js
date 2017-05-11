window.app = new Vue({
	el: '#app',
	data: {
		recos: [],
	},
	methods: {
		pageTurn: function(page) {
			window.comm.get('af/ls', { p: (typeof page == 'number' && page ? page : 1) }, function(obj) {
				app.recos = obj.records;
				d.t.pagerDeal(obj.now, obj.max, d.v.pager['record']);
			});
		},
		mains: function(reco) {
			var mains = {};

			reco.info.map(function(info) {
				info.info.map(function(inf) {
					if(inf.type == 0) mains[inf.data] = true;
				});
			});

			return Object.keys(mains).join('; ');
		}
	},
	mounted: function() {
		// window.keyInit();
	}
});

app.pageTurn(1);