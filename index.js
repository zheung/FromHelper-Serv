let isIP = (host) => {
	let match = host.match(/\d+/g);

	if(
		match &&
		(match.length == 4 || match.length == 5) &&
		(1 < ~~match[0] && ~~match[0] < 255) &&
		(0 < ~~match[1] && ~~match[1] < 255) &&
		(0 < ~~match[2] && ~~match[2] < 255) &&
		(0 < ~~match[3] && ~~match[3] < 255) &&
		(!match[4] || (1 < ~~match[4] && ~~match[4] < 65535))
	)
		return true;

	return false;
};
module.exports = ($) => {
	$.rq('init');

	let app = koa(), router = koaRouter(), URL = require('url');

	app.use(require('koa-static')($.pa('asset')));

	router.get('/up', function*(next) {
		yield next;

		this.body = global.upDict();
	});

	router.get('/pwd', function*(next) {
		yield next;

		this.set('Access-Control-Allow-Origin', '*');
		this.set('Access-Control-Allow-Methods', 'GET');

		let query = qs.parse(this.req._parsedUrl.query);

		if(!query.c || !query.d)
			this.body = { s: false, r: 'param lack' };
		else if($.conf.key != query.c)
			this.body = { s: false, r: 'key incorrect' };
		else if(query.d) {
			let url = URL.parse(new Buffer(query.d, 'base64').toString(), true);

			if(isIP(url.host)) {
				let record = $.dict.idx[url.host];

				if(record) {
					for(let rule of record.rule) {
						let hitRule = 0;

						for(let matcher of rule.rule)
							if(
								(matcher.type == 't' && matcher.text == '*') ||
								(matcher.type == 'p' && url.path.indexOf(matcher.text)+1 == 1) ||
								(matcher.type == 'r' && RegExp(matcher.text).test(url.href)) ||
								false
							)
								hitRule++;

						if(hitRule == rule.rule.length) {
							this.body = { s: true, e: record.elem[rule.elem], i: record.info[rule.info[0]] };

							break;
						}
					}
				}
				else
					this.body = { s: false, r: 'record not found' };
			}
			else {
				url.domains = url.host.split('.').reverse();
				url.domains.unshift([url.domains.shift(), url.domains.shift()].reverse().join('.'));

				let record = $.dict.idx[url.domains[0]];

				if(record) {
					for(let rule of record.rule) {
						let hitRule = 0;

						for(let matcher of rule.rule)
							if(
								(matcher.type == 't' && matcher.text == '*') ||
								(matcher.type == 't' && matcher.text == url.domains[1]) ||
								(matcher.type == 'p' && url.path.indexOf(matcher.text)+1 == 1) ||
								(matcher.type == 'r' && RegExp(matcher.text).test(url.href)) ||
								false
							)
								hitRule++;

						if(hitRule == rule.rule.length) {
							this.body = { s: true, e: record.elem[rule.elem], i: record.info[rule.info[0]] };

							break;
						}
					}
				}
				else
					this.body = { s: false, r: 'record not found' };
			}
		}
	});

	router.get('/', function*(next) {
		yield next;

		this.body = fs.readFileSync($.pa('asset/html/index.html')).toString();
	});

	router.get('/ls', function*(next) {
		yield next;

		let page = qs.parse(this.req._parsedUrl.query).p;

		this.body = $.dict.arr.slice((page - 1) * 20, page * 20);
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