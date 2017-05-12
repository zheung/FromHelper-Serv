module.exports = ($) => {
	return (emit) => {
		return {
			list: (page) => {
				let len = $.dict.arr.length, start = (page - 1) * 20, end = page*20, max = Math.ceil(len / 20);

				emit('list', { s:true, now: end>len ? 0 : page, max: max, records: $.dict.arr.slice(start, end) });
			},
			mod: (record) => {
				let now = record,
					old = $.dict.ids[now.id],
					idx = $.dict.arr.indexOf(old);

				$.dict.ids[now.id] = now;

				old.domn.map((d) => {
					delete $.dict.idx[d];
				});
				now.domn.map((d) => {
					let oldDomain = $.dict.idx[d];

					if(oldDomain) {
						_l('warn: '+oldDomain+' has duplicate item');
					}

					$.dict.idx[d] = now;
				});

				$.dict.arr.splice(idx, 1, now);

				fs.writeFileSync($.pa('aufoll.json'), JSON.stringify($.dict.arr, null, '\t'));

				emit('mod');
			}
		};
	};
};