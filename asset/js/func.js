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
		var item = $(this).parent();
		item.parent().children(':first').clone().removeClass('hide').insertAfter(item.prev());

		d.t.swier('infoType', $('.InfoType'), ['文本', '密码', '复选'], function(now, who) {
			who.next().next().attr('type', ['text', 'password', 'checkbox'][now]);
		});

		$('.AddInfo').on('click', d.f.addInfo);
		$('.DelInfos').on('click', d.f.delInfos);
		$('.DelInfo').on('click', d.f.delInfo);
		$('.DelGroup').on('click', d.f.delGroup);
	};

	d.f.addInfo = function() {
		var item = $(this).parent().parent().parent().next(),
			target = item.children(':first').clone().removeClass('hide').appendTo(item);

		d.t.swier('infoType', target.children('.InfoType'), ['文本', '密码', '复选'], function(now, who) {
			who.next().next().attr('type', ['text', 'password', 'checkbox'][now]);
		});

		target.children('.DelInfo').on('click', d.f.delInfo);
	};
	d.f.delInfos = function() {
		$(this).parent().parent().parent().next().find('.DelInfo').toggleClass('hide');
	};
	d.f.delInfo = function() {
		$(this).parent().remove();
	};
	d.f.delGroup = function() {
		$(this).parent().parent().parent().parent().remove();
	};
})();