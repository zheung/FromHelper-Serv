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
			var r = JSON.parse(xhr.responseText), type, elem, info, ca;

			if(r.s && r && r.e && r.i) {
				type = r.e.type; elem = r.e.elem; info = r.i, ca = {};

				if(type == 'r') {
					info.map(function(i, idx) {
						qs(elem[idx]).value = i.text;
					});

					log('Aufoll Direct-Fill Done');
				}
				else if(type == 'l' && info.length) {
					document.onclick = function() {
						setTimeout(function() {
							var e;

							info.map(function(i, idx) {
								if(!ca[i]) {
									e = qs(elem[idx]);

									if(e) {
										ca[idx] = true;
										qs(elem[idx]).value = i.text;
										log('Aufoll Delay-Fill ' + nt(i.name));
									}
								}
							});

							if(Object.keys(ca).length == info.length) {
								log('Aufoll Delay-Fill Done');
								document.onclick = null;
							}
						}, 410);
					};
				}
			}
		}
	};

	xhr.open('GET', 'https://localhost/af/pwd?c=danor&d='+btoa(location.href), true);
	xhr.send();
})(); }