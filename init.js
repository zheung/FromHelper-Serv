let transDict = (raw) => {
	let dict = { arr: [], idx: {} };

	for(let r of raw) {
		let record = {
			name: r[0], mark: r[1],
			main: r[2], elem: r[3],
			rule: [], info: []
		};

		for(let ra of r[4]) {
			let item = { elem: ra.shift(), info: ra.shift(), rule: [] };

			for(let r of ra) {
				let rule = {};

				[rule.name, rule.type, rule.text] = r;

				item.rule.push(rule);
			}

			record.rule.push(item);
		}

		for(let ra of r[5]) {
			let item = [];

			for(let r of ra) {
				let info = {};

				[info.name, info.type, info.text] = r;

				item.push(info);
			}

			record.info.push(item);
		}

		for(let m of record.main)
			if(!dict.idx[m])
				dict.idx[m] = record;
			else
				_l('warn: '+m+' has duplicate item');

		dict.arr.push(record);
	}

	return dict;
};

module.exports = ($) => {
	global.upDict = (cbYeah, cbNope) => {
		let raw, type, path;

		for(let pathRaw of $.conf.pathDict)
			try {
				[type, path] = pathRaw.split(':');

				if(type == 'i')
					raw = $.rq(path, true);
				else if(type == 'o') {
					delete require.cache[require.resolve(path)];

					raw = require(path);
				}

				break;
			}
			catch(e) { continue; }

		if(raw) {
			$.dict = transDict(raw);

			return cbYeah ? cbYeah() : 'yeah';
		}
		else
			return cbNope ? cbNope() : 'nope';
	};

	global.upDict();
};