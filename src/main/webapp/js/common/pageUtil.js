(function($) {
	
	var pageUtil = function() {

		var sum_pages = 0;

		return {

			/**
			 * 计算分页，改变页码的样式
			 */
			createpagesIndex : function(sum, pages, count) {

				/** 计算分几页 */
				if (sum % count == 0) {
					sum_pages = sum / count;
				} else {
					sum_pages = sum / count + 1;
				}
				sum_pages = Math.floor(sum_pages);

				/** 显示总页数，当前页数 */
				$('#now_pages').text(pages);
				if (sum_pages == 0) {
					$('#total_pages').text(1);
				} else {
					$('#total_pages').text(sum_pages);
				}

				/* 当数据只有一页时，全部禁用 */
				if (sum_pages > 1) {
					/* 禁用首页和上一页 */
					if (pages == 1) {
						$("#first_pages").attr({
							style : "color: gray;"
						});
						$("#before_pages").attr({
							style : "color: gray;"
						});
					} else {
						$("#first_pages").attr({
							style : "color: #428bca;"
						});
						$("#before_pages").attr({
							style : "color: #428bca;"
						});
					}

					/* 禁用尾页和下一页 */
					if (pages == sum_pages) {
						$("#next_pages").attr({
							style : "color: gray;"
						});
						$("#last_pages").attr({
							style : "color: gray;"
						});
					} else {
						$("#next_pages").attr({
							style : "color: #428bca;"
						});
						$("#last_pages").attr({
							style : "color: #428bca;"
						});
					}
				} else {
					$("#first_pages").attr({
						style : "color: gray;"
					});
					$("#before_pages").attr({
						style : "color: gray;"
					});
					$("#next_pages").attr({
						style : "color: gray;"
					});
					$("#last_pages").attr({
						style : "color: gray;"
					});
				}

			},

			/**
			 * 跳至首页
			 */
			gotoFirstPages : function(pages,event) {
				if (pages != 1) {
					pages = 1;
					event(pages);
				}

			},
			/**
			 * 跳至上一页
			 */
			gotoPrvePages : function(pages,event) {
				if (pages > 1) {
					pages--;
					event(pages);
				}

			},
			/**
			 * 跳至下一页
			 */
			gotoNextPages : function(pages,event) {
				if (pages < sum_pages) {
					pages++;
					event(pages);
				}
			},
			/**
			 * 跳至尾页
			 */
			gotoEndPages : function(pages,event) {
				if (pages != sum_pages) {
					pages = sum_pages;
					event(pages);
				}
			},
		}

	}();
	window.pageUtil = pageUtil;
})(jQuery);