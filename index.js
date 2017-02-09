let isIP = (host) => {
	let match = host.match(/\d+/g);

	if(
		match &&
		(match.length == 4 || match.length == 5) &&
		(1 < ~~match[0] && ~~match[0] < 255) &&
		(0 < ~~match[1] && ~~match[1] < 255) &&
		(0 < ~~match[2] && ~~match[2] < 255) &&
		(0 < ~~match[3] && ~~match[3] < 255) &&
		(1 < ~~match[4] && ~~match[4] < 65535)
	)
		return true;

	return false;
};

module.exports = ($) => {
	$.rq('init');

	let app = koa(), router = koaRouter();

	app.use(require('koa-static')($.pa('asset')));

	let paths = $.pathNow.split(':'), pathWatch;

	if(paths[0] == 'i')
		pathWatch = $.rq(paths[1], false, true);
	else if(paths[0] == 'o')
		pathWatch = paths[1];

	fs.watch(pathWatch, () => {
		_l('af dict changed');
		try {
			if(paths[0] == 'i')
				$.dict = $.rq(paths[1], true);
			else if(paths[0] == 'o') {
				delete require.cache[require.resolve(paths[1])];

				$.dict = require(paths[1]);
			}

			return;
		}
		catch(e) { true; }

		$.dict = [];
		_l('warn: af dict is empty');
	});

	router.get('/pwd', function*(next) {
		yield next;

		this.set('Access-Control-Allow-Origin', '*');
		this.set('Access-Control-Allow-Methods', 'GET');

		let query = qs.parse(this.req._parsedUrl.query);

		if(!query.c || !query.d)
			this.body = { s: false, r: 'param lack' };
		else if(isIP(query.d)) {
			let record = $.dict[query.d];

			if(record) {
				this.body = {
					s: true,
					d: record
				};
			}
			else
				this.body = { s: false, r: 'record not found' };
		}
		else {
			let domain = query.d.split('.').reverse();
			domain.unshift([domain.shift(), domain.shift()].reverse().join('.'));

			if($.conf.key == query.c) {
				if($.dict[domain[0]]) {
					let record = $.dict[domain[0]][domain[1]] || $.dict[domain[0]]['*'];

					if(record)
						this.body = {
							s: true,
							d: record
						};
					else
						this.body = { s: false, r: 'record not found' };
				}
				else
					this.body = { s: false, r: 'record not found' };
			}
			else
				this.body = { s: false, r: 'key incorrect' };
		}
	});

	router.get('/', function*(next) {
		yield next;

		this.body = fs.readFileSync($.pa('asset/html/index.html')).toString();
	});

	let cleancss = new CleanCSS({restructuring:false});
	fs.writeFileSync($.pa('asset/css/kq.all.min.css'),
		cleancss.minify(fs.readFileSync($.pa('../pub/asset/css/flex.css')).toString()).styles + '\r\n' +
		cleancss.minify(fs.readFileSync($.pa('../pub/asset/css/small.css')).toString()).styles + '\r\n' +
		cleancss.minify(fs.readFileSync($.pa('asset/css/style.css')).toString()).styles + '\r\n' +
		cleancss.minify(fs.readFileSync($.pa('asset/css/test.css')).toString()).styles + '\r\n' +
		cleancss.minify(fs.readFileSync($.pa('asset/css/color.css')).toString()).styles
	);
	fs.writeFileSync($.pa('asset/js/kq.all.min.js'),
		UglifyJS.minify($.pa('asset/js/kq.js')).code + '\r\n' +
		UglifyJS.minify($.pa('asset/js/init.js')).code
	);

	return app.use(router.routes()).use(router.allowedMethods());
};