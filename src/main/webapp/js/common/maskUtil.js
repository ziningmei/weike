(function($) {
	var loading_html = '<div id="loading_div"><div id="loading_over" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-color: #f5f5f5;opacity: 0.5;z-index: 10000;"></div><div id="loading_layout" style="position: absolute;top: 40%;left: 40%;width: 20%;height: 20%;z-index: 10001;	text-align: center;"><img src="../../images/loading.gif" alt="" /></div></div>';
	var maskUtil = function() {
		return {
			// 显示loading
			showMask : function(id) {
				$("#"+id).css("position","relative");
				$("#" + id).append(loading_html);
			},
			
			// 隐藏loading
			hideMask : function(id) {
				$("#" + id).find("div[id=loading_div]").remove();
			}
		}
	}();
	window.maskUtil = maskUtil;
})(jQuery);