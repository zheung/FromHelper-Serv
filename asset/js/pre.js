(function() {
	$(window).resize(function() {
		$('.Main').width(document.body.clientWidth-450);
	});
	$('.Main').width(document.body.clientWidth-450);
})();

(function() {
	var eRecords = $('.Records'), eRecord = eRecords.children('.Record'),
		records = [$(eRecord)], record;

	for(var i=2; i<=20; i++) {
		record = eRecord.clone();

		eRecords.append(record);
		records.push($(record));
	}

	d.e.records = records;
})();

(function() {
	d.e.Search = $('#Search');

	d.e.RecordPrev = $('#RecordPrev');
	d.e.RecordNext = $('#RecordNext');
	d.e.RecordPage = $('#RecordPage');
	d.e.RecordPageMax = $('#RecordPageMax');

	d.e.RightNaviHead = $('.TabHead.RightNavi');
	d.e.RightNaviItem = $('.TabItem.RightNavi');

})();
