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
			elem: [{ type: 0, selc: [''] }]
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
		pageTurn: function(page) {
			if(page > 0 && page <= this.pageMax)
				app.emit('list', (typeof page == 'number' && page ? page : 1));
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
			this.disp.domnDel = [];
			this.disp.infoDel = [];
			this.disp.elemDel = [];

			this.recoNow = reco;
		},
		saveRecord: function() {
			var checkResult = this.checkRecord(this.recoNow);
			if(checkResult) return alert(checkResult);

			app.emit('mod', this.recoNow);
		},
		swier: function(group, now) {
			return group.length-1 == now ? 0 : now+1;
		},
		checkRecord: function(record) {
			if(!record.domn || !record.domn.length)
				return '主域名不能为空';
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
			return { type: 0, selc: [''] };
		}
	}
});

