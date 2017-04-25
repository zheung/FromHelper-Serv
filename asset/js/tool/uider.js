(function() {
	d.t.uider = function(ids_, n, add) {
		var ids = ids_ || [],
			dict = [], temp = [], cnt = ids.length, tnt = 0;

		ids.map(function(id) {
			dict[id] = true;
		});

		return {
			md: function(notTemp) {
				var id;

				if(cnt+tnt >= n) return -1;

				while(id == undefined || dict[id] || temp[id]) id = ~~(Math.random() * n) + ~~add;

				if(!notTemp) {
					temp[id] = true;

					tnt++;
				}

				return id;
			},
			cm: function(id) {
				if(!dict[id]) cnt++;
				if(temp[id]) tnt--;

				dict[id] = true;
				temp[id] = false;

				return id;
			},
			rm: function(id) {
				if(temp[id]) tnt--;

				temp[id] = false;

				return id;
			},

			has: function(id) { return !!(dict[id] || temp[id]); },
			flu: function() {
				cnt += tnt;

				for(var i in temp)
					dict[temp[i]] = true;

				temp = [];
				tnt = 0;
			},
			rse: function() {
				tnt = 0;

				temp = [];
			},
		};
	};
})();