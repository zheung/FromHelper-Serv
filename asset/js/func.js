//翻页
(function() {
	d.f.pageTurn = function(page) {
		d.t.get('af/ls', { p: (typeof page == 'number' && page ? page : 1) }, function(obj) {
			d.e.records.map(function(eRecord, i) {
				var record = obj.records[i];

				eRecord.data('record', record);

				if(record) {
					var infos = record.info, mains = {};

					infos.map(function(info) {
						info.info.map(function(inf) {
							if(inf.type == 'm') mains[inf.data] = true;
						});
					});

					eRecord.find('.sName').html(record.name);
					eRecord.find('.sLink').attr('href', 'http://'+record.domn[0]);
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
	d.f.addGroup = function() {
		var item = $(this).parent();

		item.parent().children(':first').clone().removeClass('hide').insertAfter(item.prev());

		d.f.refreshClick();
	};

	d.f.addItem = function(e, clazz) {
		var item = $(this).parent().parent().parent().next();

		item.children(':first').clone().addClass(clazz).removeClass('hide').appendTo(item);

		d.f.refreshClick();
	};
	d.f.delItems = function() {
		$(this).parent().parent().parent().next().find('.DelItem').toggleClass('hide');
	};
	d.f.delItem = function() {
		$(this).parent().remove();
	};
	d.f.delGroup = function() {
		$(this).parent().parent().parent().parent().remove();
	};

	d.f.refreshClick = function() {
		d.t.swier('infoType', $('.InfoType'), ['文本', '密码', '复选'], function(now, who) {
			who.next().next().attr('type', ['text', 'password', 'checkbox'][now]);
		});

		$('.AddItem').off('click').on('click', d.f.addItem);
		$('.DelItems').off('click').on('click', d.f.delItems);
		$('.DelItem').off('click').on('click', d.f.delItem);
		$('.DelGroup').off('click').on('click', d.f.delGroup);
	};

	d.f.editRecord = function() {
		var record = $(this).data('record');

		d.e.IName.val(record.name);

		$('.iDomain').remove();
		record.domn.map(function(domain) {
			d.e.AddDomain.trigger('click', ['iDomain']);
			$('.iDomain:last>input').val(domain);
		});
	};

	d.f.saveRecord = function() {

	};
})();