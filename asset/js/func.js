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
							if(inf.type == 0) mains[inf.data] = true;
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
	d.f.addGroup = function(e, clazz_) {
		var $this = $(this), item = $this.parent(), clazz = clazz_ || $this.data('addClass');

		item.parent().children(':first').clone().addClass(clazz).removeClass('hide').insertAfter(item.prev());

		d.f.refreshClick();
	};

	d.f.addItem = function(e, clazz_) {
		var $this = $(this), item = $this.parent().parent().parent().next(), clazz = clazz_ || $this.data('addClass');

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
			d.e.AddItemDomain.click();
			$('.iDomain:last>input').val(domain);
		});

		$('.iInfoGroup').remove();
		record.info.map(function(infoGroup) {
			d.e.AddGroupInfo.click();

			var group = $('.iInfoGroup:last'), addItem = group.find('.AddItem.Info');

			group.find('.iInfo').remove();

			group.find('input:first').val(infoGroup.name);

			infoGroup.info.map(function(info) {
				addItem.click();

				var iInfo = group.find('.iInfo:last');

				iInfo.find('input:first').val(info.name);

				if(info.type != 0) {
					var iInfoType = iInfo.find('a');

					if(info.type>0) {
						iInfoType.click();

						if(info.type>1) iInfoType.click();
					}
				}

				if(info.type != 2)
					iInfo.find('input:last').val(info.data);
				else
					iInfo.find('input:last').prop('checked', info.data);
			});
		});
debugger;
		$('.iElemGroup').remove();
		record.elem.map(function(elemGroup) {
			d.e.AddGroupElem.click();

			var group = $('.iElemGroup:last'), addItem = group.find('.AddItem.Elem');

			group.find('.iElem').remove();

			group.find('input:first').val(elemGroup.name);

			elemGroup.elem.map(function(elem) {
				addItem.click();

				group.find('.iElem:last').find('input').val(elem.data);
			});

		});

		d.v.recordNow = record;
	};

	d.f.checkRecord = function(record) {
		if(!record.domn || !record.domn.length)
			return '主域名不能为空';
	};

	d.f.saveRecord = function() {
		var record = d.v.recordNow;

		record.name = d.e.IName.val();
		record.domn = [];

		$('.iDomain>input').map(function() {
			var domn = $(this).val();

			if(domn) record.domn.push(domn);
		});

		record.info = [];

		$('.iInfoGroup').map(function() {
			var iGroup = $(this), group = {
				name: iGroup.find('input:first').val(),
				info: []
			};

			iGroup.find('.iInfo').map(function() {
				var iInfo = $(this), info = {
					type: iInfo.find('a').data('swierNow'),
					name: iInfo.find('input:first').val(),
				};

				if(info.type != 2)
					info.data = iInfo.find('input:last').val();
				else
					info.data = iInfo.find('input:last').prop('checked');

				group.info.push(info);
			});

			record.info.push(group);
		});


		var checkResult = d.f.checkRecord(record);
		if(checkResult) return alert(checkResult);

		d.t.post('af/mod', { record: JSON.stringify(record) }, function() {
			d.f.pageTurn(d.v.pager.record.now);
		});
	};
})();