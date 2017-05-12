// 固定主界面宽度
(function() {
	var resizer = function() {
		$('.Main').width(document.body.clientWidth-450);
		$('.TabItem.RightNavi').height(document.body.clientHeight-45);
	};

	$(window).resize(resizer);
	resizer();
})();
// 功能Div入库
(function() {
	d.e.Search = $('#Search');

	d.e.RecordPrev = $('#RecordPrev');
	d.e.RecordNext = $('#RecordNext');
	d.e.RecordPage = $('#RecordPage');
	d.e.RecordPageMax = $('#RecordPageMax');

	d.e.TabHeadRightNavi = $('.TabHead.RightNavi');
	d.e.TabItemRightNavi = $('.TabItem.RightNavi');

	d.e.TabHeadRightNavi2 = $('.TabHead.RightNavi2');
	d.e.TabItemRightNavi2 = $('.TabItem.RightNavi2');

	d.e.AddItemDomain = $('.AddItem.Domain');
	d.e.AddGroupInfo = $('.AddGroup.Info');
	d.e.AddGroupElem = $('.AddGroup.Elem');

	d.e.IName = $('.iName');
})();