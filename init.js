module.exports = ($) => {
	for(let path of $.conf.pathDict)
		try {
			$.dict = $.rq(path);

			break;
		}
		catch(e) { continue; }
};