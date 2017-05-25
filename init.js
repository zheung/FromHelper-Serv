let transDict = async(raw) => {
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

module.exports = async($) => {
	global.upDict = async(cbYeah, cbNope) => {
		let raw, type, path;

		for(let pathRaw of $.conf.pathDict)
			try {
				[type, path] = pathRaw.split(':');

				if(type == 'i')
					raw = await $.rq(path, true);
				else if(type == 'o') {
					delete require.cache[require.resolve(path)];

					raw = require(path);
				}

				break;
			}
			catch(e) { continue; }

		if(raw) {
			$.dict = await transDict(raw);

			return cbYeah ? cbYeah() : 'yeah';
		}
		else
			return cbNope ? cbNope() : 'nope';
	};

	await global.upDict();
};