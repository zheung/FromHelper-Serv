let transDict = (raw) => {
	let dict = { arr: [], idx: {}, ids: {} };

	for(let r of raw) {
		for(let m of r.domn)
			if(!dict.idx[m])
				dict.idx[m] = r;
			else
				_l('warn: '+m+' has duplicate item');

		dict.ids[r.id] = r;
		dict.arr.push(r);
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