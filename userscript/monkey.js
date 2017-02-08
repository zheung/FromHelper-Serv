// ==UserScript==
// @name         Aufoll
// @description  Auto Fill
// @version      0.0.0
// @namespace    DanoR Script
// @author       DanoR
// @run-at       document-end
// @grant        none
// @include      *
// ==/UserScript==

if(self == top) { (function() {
	var debug = true;

	var qs = function(selector) { return document.querySelector(selector); },
		log = function(obj) { if(debug) console.log(obj); },
		nt = function(name) { return name == 'm' ? '主信息' : (name == 'p' ? '密码' : name); };

	log('Aufoll Go');

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var r = JSON.parse(xhr.responseText), drs, dls, i, ca;

			if(r && r.s && r.d) {
				drs = r.d.r; dls = r.d.l; ca = {};

				for(i in drs) if(drs.hasOwnProperty(i))
						qs(drs[i][2]).value = drs[i][1];

				log('Aufoll Direct-Fill Done');

				if(dls.length) {
					log('Aufoll Delay-Fill Gone');

					document.onclick = function() {
						setTimeout(function() {
							var e;

							for(i in dls) { if(dls.hasOwnProperty(i))
								if(!ca[i]) {
									e = qs(dls[i][2]);

									if(e) {
										ca[i] = true;
										e.value = dls[i][1];
										log('Aufoll Delay-Fill ' + nt(dls[i][0]));
									}
								}
							}

							if(Object.keys(ca).length == dls.length) {
								log('Aufoll Delay-Fill Done');
								document.onclick = null;
							}
						}, 700);
					};
				}
			}
		}
	};

	xhr.open('GET', 'https://danor.top/af/pwd?c=danor&d='+location.host, true);
	xhr.send();
})(); }