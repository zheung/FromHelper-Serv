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
	console.log('Aufoll Go');

	var itr = setInterval(function() {
		var u = document.querySelector('input.pass-text-input-userName'), p = document.querySelector('input.pass-text-input-password');

		if(!u) return;

		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var r = JSON.parse(xhr.responseText);

				u.value = r.u;
				p.value = r.p;
			}
		};

		xhr.open('GET', 'http://localhost/fh/pwd?k=danor&s='+location.host, true);
		xhr.send();

		clearInterval(itr);
		console.log('FromHelper Done');
	}, 500);
})(); }
