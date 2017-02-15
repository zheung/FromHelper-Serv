// (function() {
// 	kqe.toggles.click(function(eve, man) {
// 		var $this = $(this), cond = this.dataset.cond,
// 			x = this.dataset.x, y = this.dataset.y, z = this.dataset.z,
// 			isAll = $this.hasClass('all');

// 		if(man) isAll = true;

// 		if(x == 's') {
// 			gDict.dynmSearch = false;

// 			kqe.toggles.filter('[data-cond='+cond+']:not([data-x=s])').each(function() {
// 				$(this).addClass(isAll ? 'on' : 'off').removeClass(isAll ? 'off' : 'on').click();
// 			});

// 			if(!man) gDict.dynmSearch = true;

// 			$this.toggleClass('all');

// 			if(!man) kq.query(function(param) { param.page = 1; }, kqf.dealer);
// 		}
// 		else {
// 			if(eve.ctrlKey && !eve.shiftKey) {
// 				gDict.dynmSearch = false;

// 				kqe.toggles.filter('[data-cond='+cond+']:not([data-x='+x+'][data-y='+y+'][data-z='+z+']):not([data-x=s])').each(function() {
// 					$(this).addClass('on').removeClass('off').click();
// 				});

// 				if(!man) gDict.dynmSearch = true;

// 				$this.removeClass('on').addClass('off').click();
// 			}
// 			else if(!eve.ctrlKey && eve.shiftKey) {
// 				gDict.dynmSearch = false;

// 				kqe.toggles.filter('[data-cond='+cond+']:not([data-x='+x+'][data-y='+y+'][data-z='+z+']):not([data-x=s])').each(function() {
// 					$(this).addClass('off').removeClass('on').click();
// 				});

// 				if(!man) gDict.dynmSearch = true;

// 				$this.removeClass('off').addClass('on').click();
// 			}
// 			else {
// 				kqe.toggles.filter('[data-cond='+cond+'][data-x='+x+'][data-y='+y+'][data-z='+z+']').toggleClass('on').toggleClass('off');

// 				if(cond && x && y && z) {
// 					if($this.hasClass('on'))
// 						kq.conds.mark[x][y] |= z;
// 					else
// 						kq.conds.mark[x][y] &= ~z;

// 					if(gDict.dynmSearch) kq.query(function(param) { param.page = 1; }, kqf.dealer);
// 				}
// 			}

// 			if(man) gDict.dynmSearch = true;
// 		}
// 	});
// })();

// (function() {
// 	// Global Key Event
// 	$(document).keydown(function(e) {
// 		var ae = document.activeElement;

// 		if(ae.id == 'CondName') {
// 			if(e.keyCode == 13) {
// 				if(e.shiftKey)
// 					$('[data-cond][data-x=s]').trigger('click', { fourceON: true });

// 				kqe.search.click();

// 				return false;
// 			}
// 		}
// 		else if(ae == $('.sPage')[0]) {
// 			if(e.keyCode == 13) {
// 				var $this = $(e.target), page = $this.html();

// 				if(page > 0 && page <= gDict.pageMax)
// 					kq.query(function(param) { param.page = page; },kqf.dealer);
// 				else
// 					$this.html(gDict.page);

// 				return false;
// 			}
// 		}
// 		else {
// 			if(e.keyCode == 9) {
// 				var next = kqe.rightNavi.filter('.active'), notFind = true;

// 				while(notFind) {
// 					next = next[e.shiftKey?'prev':'next']();

// 					if(!next.length)
// 						next = kqe.rightNavi[e.shiftKey?'last':'first']();

// 					if(next[0].dataset.notab !== '')
// 						notFind = false;
// 				}

// 				next.click();

// 				return false;
// 			}
// 			else if(e.keyCode == 33 || e.keyCode == 74) { kqe.pagePrev.click(); return false; }
// 			else if(e.keyCode == 34 || e.keyCode == 75) { kqe.pageNext.click(); return false; }
// 			else if(e.keyCode == 35 || e.keyCode == 78) {
// 				kq.query(function(param) { param.page = gDict.pageMax; }, kqf.dealer);

// 				return false;
// 			}
// 			else if(e.keyCode == 36 || e.keyCode == 77) {
// 				kq.query(function(param) { param.page = 1; }, kqf.dealer);

// 				return false;
// 			}
// 			else if(e.keyCode == 81 && e.ctrlKey) {
// 				kqe.condName.focus();

// 				return false;
// 			}
// 			else if(e.keyCode == 13 && e.shiftKey) {
// 				$('[data-cond][data-x=s]').trigger('click', {});

// 				kqe.search.click();

// 				return false;
// 			}
// 		}
// 	});
// })();

(function() {
	d.e.Search.click(function() {
		d.t.get('af/ls', { p: 1 }, function(records) {
			records.map(function(record, i) {
				var eRecord = d.e.records[i];

				var infos = record.info, mains = {};

				infos.map(function(info) {
					info.map(function(inf) {
						if(inf.name == 'm') mains[inf.text] = true;
					});
				});

				eRecord.find('.sName').html(record.name);
				eRecord.find('.sLink').attr('href', 'http://'+record.main[0]);
				eRecord.find('.sMain').html(Object.keys(mains).join('; '));
			});

		});
	});
	// kqe.pagePrev.click(function() {
	// 	if(gDict.page > 1)
	// 		kq.query(function(param) { param.page--; }, kqf.dealer);
	// });
	// kqe.pageNext.click(function() {
	// 	if(gDict.page < gDict.pageMax)
	// 		kq.query(function(param) { param.page++; }, kqf.dealer);
	// });
})();

// (function() {
// 	$('.sThumb').bind('error', function() {
// 		var src = this.src;

// 		if(/20\//.test(src)) {
// 			this.src = src.replace(/20\//g, '21/');

// 			return;
// 		}
// 		if(/21\//.test(src)) {
// 			this.src = './kq/img/no20.png';

// 			return;
// 		}
// 	});
// })();

// Init
(function() {
	// kqf.retab();
	// $('.TabHead').filter('.active').click();
	d.e.Search.click();
})();