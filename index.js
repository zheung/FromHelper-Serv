let isIP = (host) => {
	let match = host.match(/\d+/g);

	if(
		match &&
		match.length == 4 &&
		(1 < ~~match[0] && ~~match[0] < 255) &&
		(1 < ~~match[1] && ~~match[1] < 255) &&
		(1 < ~~match[2] && ~~match[2] < 255) &&
		(1 < ~~match[3] && ~~match[3] < 255)
	)
		return true;

	return false;
};

module.exports = ($) => {
	$.rq('init');

	let app = koa(), router = koaRouter();

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
					i: record.i, c: record.c
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
							i: record.i, c: record.c
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

	return app.use(router.routes()).use(router.allowedMethods());
};