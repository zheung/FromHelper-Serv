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
	d.t.pager('record', d.e.RecordPrev, d.e.RecordNext, function(pager) { d.e.RecordPage.val(pager.now); }, d.e.RecordPageMax, d.f.pageTurn);
	d.t.taber('RightNavi', d.e.TabHeadRightNavi, d.e.TabItemRightNavi, ['Basic', 'Config', 'About'], 'active');
	d.t.taber('RightNavi2', d.e.TabHeadRightNavi2, d.e.TabItemRightNavi2, ['Basic', 'Info', 'Rule', 'Elem'], 'active');

	d.e.Search.on('click', d.f.pageTurn);
})();
(function() {
	d.t.pager('record', d.e.RecordPrev, d.e.RecordNext, function(pager) { d.e.RecordPage.val(pager.now); }, d.e.RecordPageMax, d.f.pageTurn);
	d.t.taber('RightNavi', d.e.TabHeadRightNavi, d.e.TabItemRightNavi, ['Basic', 'Config', 'About'], 'active');
	d.t.taber('RightNavi2', d.e.TabHeadRightNavi2, d.e.TabItemRightNavi2, ['Basic', 'Info', 'Rule', 'Elem'], 'active');

	d.e.Search.on('click', d.f.pageTurn);

	$('#AddItem').on('click', d.f.addItem);
	// $('.AddInfo').on('click', d.f.addInfo);
	// $('.DelInfos').on('click', d.f.delInfos);
	// $('.DelInfo').on('click', d.f.delInfo);
})();

// Init
(function() {
	d.e.Search.click();
	d.e.TabHeadRightNavi.first().click();
	d.e.TabHeadRightNavi2.first().next().click();
})();