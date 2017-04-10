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

module.exports = ($, router) => {
	$.rq('init');

	$.st($.pa('asset'));

	router.get('/up', async(ctx, next) => {
		await next();

		ctx.body = global.upDict();
	});

	router.get('/pwd', async(ctx, next) => {
		await next();

		ctx.set('Access-Control-Allow-Origin', '*');
		ctx.set('Access-Control-Allow-Methods', 'GET');

		let query = qs.parse(ctx.req._parsedUrl.query);

		if(!query.c || !query.d)
			ctx.body = { s: false, r: 'param lack' };
		else if($.conf.key != query.c)
			ctx.body = { s: false, r: 'key incorrect' };
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
							ctx.body = { s: true, e: record.elem[rule.elem], i: record.info[rule.info[0]] };

							break;
						}
					}
				}
				else
					ctx.body = { s: false, r: 'record not found' };
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
							ctx.body = { s: true, e: record.elem[rule.elem], i: record.info[rule.info[0]] };

							break;
						}
					}
				}
				else
					ctx.body = { s: false, r: 'record not found' };
			}
		}
	});

	router.get('/', async(ctx, next) => {
		await next();

		ctx.body = fs.readFileSync($.pa('asset/html/index.html')).toString();
	});

	router.get('/ls', async(ctx, next) => {
		await next();

		let page = ~~qs.parse(ctx.req._parsedUrl.query).p, len = $.dict.arr.length,
			start = (page - 1) * 20, end = page*20, max = Math.ceil(len / 20);

		ctx.body = { s:true, now: end>len ? 0 : page, max: max, records: $.dict.arr.slice(start, end) };
	});

	router.post('/mod', async(ctx, next) => {
		await next();

		let now = JSON.parse(ctx.request.body.record),
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

		ctx.body = { s:true };
	});

	return router;
};