module.exports = ($) => {
	for(let path of $.conf.pathDict)
		try {
			let paths = path.split(':');

			if(paths[0] == 'i')
				$.dict = $.rq(paths[1], true);
			else if(paths[0] == 'o') {
				delete require.cache[require.resolve(paths[1])];

				$.dict = require(paths[1]);
			}

			return;
		}
		catch(e) { continue; }

	$.dict = [];
	_l('warn: af dict is empty');
};