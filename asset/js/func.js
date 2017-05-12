(function() {
	d.f.addGroup = function(e, clazz_) {
		var $this = $(this), item = $this.parent(), clazz = clazz_ || $this.data('addClass');

		item.parent().children(':first').clone().addClass(clazz).removeClass('hide').insertAfter(item.prev());

		d.f.refreshClick();
	};

	d.f.addItem = function(e, clazz_) {
		var $this = $(this), item = $this.parent().parent().parent().next(), clazz = clazz_ || $this.data('addClass');

		item.children(':first').clone().addClass(clazz).removeClass('hide').appendTo(item);

		d.f.refreshClick();
	};
	d.f.delItems = function() {
		$(this).parent().parent().parent().next().find('.DelItem').toggleClass('hide');
	};
	d.f.delItem = function() {
		$(this).parent().remove();
	};
	d.f.delGroup = function() {
		$(this).parent().parent().parent().parent().remove();
	};

	d.f.refreshClick = function() {
		d.t.swier('infoType', $('.InfoType'), ['文本', '密码', '复选'], function(now, who) {
			who.next().next().attr('type', ['text', 'password', 'checkbox'][now]);
		});
		d.t.swier('elemType', $('.ElemType'), ['静态', '动态']);

		$('.AddItem').off('click').on('click', d.f.addItem);
		$('.DelItems').off('click').on('click', d.f.delItems);
		$('.DelItem').off('click').on('click', d.f.delItem);
		$('.DelGroup').off('click').on('click', d.f.delGroup);
	};

	d.f.checkRecord = function(record) {
		if(!record.domn || !record.domn.length)
			return '主域名不能为空';
	};
})();