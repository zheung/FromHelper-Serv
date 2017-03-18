//翻页
(function() {
	d.f.pageTurn = function(page) {
		d.t.get('af/ls', { p: (typeof page == 'number' && page ? page : 1) }, function(obj) {
			d.e.records.map(function(eRecord, i) {
				var record = obj.records[i];

				if(record) {
					var infos = record.info, mains = {};

					infos.map(function(info) {
						info.map(function(inf) {
							if(inf.name == 'm') mains[inf.text] = true;
						});
					});

					eRecord.find('.sName').html(record.name);
					eRecord.find('.sLink').attr('href', 'http://'+record.main[0]);
					eRecord.find('.sMain').html(Object.keys(mains).join('; '));
				}

				eRecord.children()[record ? 'removeClass' : 'addClass']('hide');
				eRecord[record ? 'removeClass' : 'addClass']('hidden');
			});

			d.t.pagerDeal(obj.now, obj.max, d.v.pager['record']);
		});
	};
})();
(function() {
	d.f.addItem = function() {
		var item = $('#AddItem').parent();
		item.parent().children(':first').clone().insertAfter(item.prev());
	};
})();