window.app = new Vue({
	el: '#app',
	data: {
		io:io(),
		recos: []
	},
	methods: {
		pageTurn: function(page) {
			this.io.emit('af-list', (typeof page == 'number' && page ? page : 1));
		},
		mains: function(reco) {
			var mains = {};

			reco.info.map(function(info) {
				info.info.map(function(inf) {
					if(inf.type == 0) mains[inf.data] = true;
				});
			});

			return Object.keys(mains).join('; ');
		},
		editRecord: function(record) {
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

			$('.iElemGroup').remove();
			record.elem.map(function(elemGroup) {
				d.e.AddGroupElem.click();

				var group = $('.iElemGroup:last'), addItem = group.find('.AddItem.Elem');

				group.find('.iElem').remove();

				group.find('input:first').val(elemGroup.name);

				if(elemGroup.type == 1)
					group.find('.elemType').click();

				elemGroup.selc.map(function(elem) {
					addItem.click();

					group.find('.iElem:last>input').val(elem);
				});

			});

			d.v.recordNow = record;
		},
		saveRecord: function() {
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

			app.emit('mod', record);
		}
	}
});

