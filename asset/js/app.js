window.app = new Vue({
	el: '#app',
	data: {
		io:io(),
		recos: [],

		pageNow: 1,
		pageMax: 1,

		tab: {
			dash: 1,
			type: 1
		},

		recoEmpty: { name: '' },

		recoNow: {
			name: '',
			domn: [ '' ],
			info: [{
				name: '',
				info: [
					{ type: 0, name: '帐号', data: '' },
					{ type: 1, name: '密码', data: '' }
				]
			}],
			elem: [{ type: 0, selc: [] }]
		},

		disp: {
			domnDel: [],
			infoDel: [],
			elemDel: [],

			recoOver: []
		},

		infoType: ['文本', '密码', '复选'],
		inputType: ['text', 'password', 'checkbox'],
		elemType: ['静态', '动态']
	},
	methods: {
		// toggleDel: function(e, bool) {
		// 	e.currentTarget
		// 	debugger;
		// },
		pageTurn: function(page) {
			if(page > 0 && page <= this.pageMax)
				this.io.emit('af-list', (typeof page == 'number' && page ? page : 1));
		},
		mains: function(reco) {
			var mains = {};

			reco.info.map(function(info) {
				var first = true;
				info.info.map(function(inf) {
					if(inf.type == 0 && first) {
						mains[inf.data] = true;

						first = false;
					}
				});
			});

			return Object.keys(mains).join('; ');
		},
		editRecord: function(reco) {
			this.disp.infoDel = [];
			this.recoNow = reco;
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
		},
		swier: function(group, now) {
			return group.length-1 == now ? 0 : now+1;
		},
		newInfo: function() {
			return {
				name: '',
				info: [
					{ type: 0, name: '帐号', data: '' },
					{ type: 1, name: '密码', data: '' }
				]
			};
		},
		newElem: function() {
			return { type: 0, selc: [] };
		}
	}
});

