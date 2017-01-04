module.exports = ($) => {
	let app = koa(), router = koaRouter();

	let time = new Date();

	router.get('/pwd', function*(next) {
		yield next;

		let query = qs.parse(this.req._parsedUrl.query);

		if($.conf.key === query.k) {
			this.body = {
				u: 'zheung14',
				p: '213'
			};

			this.set('Access-Control-Allow-Origin', '*');
			this.set('Access-Control-Allow-Methods', 'GET');
		}
	});

	router.get('/time', function*(next) {
		yield next;

		this.body = Math.round((new Date().getTime() - time.getTime()) / 1000);
	});

	return app.use(router.routes()).use(router.allowedMethods());
};