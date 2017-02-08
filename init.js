module.exports = ($) => {
	for(let path of $.conf.pathDict)
		try {
			let paths = path.split(':');
			$.dict = paths[0]=='i' ? $.rq(paths[1]) : require(paths[1]);

			break;
		}
		catch(e) { continue; }
};