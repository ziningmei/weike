(function($) {
	var search_result = function() {

		return {
			currentsearch_result : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,

			init : function() {
				student.init();
				if(sessionStorage.getItem("search")!=""){
					$("#search-input").val(sessionStorage.getItem("search"));
					sessionStorage.setItem("search","");
				}
				search_result.initCourse();
				$("#search-btn1").click(function(){
					search_result.initCourse();
					return false;
				});
			},
			clear:function(){
				sessionStorage.setItem("search","");
				$("#search-input").val("")
				search_result.initCourse();
			},
			initCourse : function() {
				var vo = new Object();
				vo.course_name=$("#search-input").val();
				maskUtil.showMask("main");
				commonAjax.ajaxPost("course/getAllCourse.do",vo,function(result) {
					maskUtil.hideMask("main")
					var list = result;
					var html = "";
					var tbody = "";
					tbody += '<div class="col-md-3">';
					tbody += '<div class="course_img">';
					tbody += '<a href="gointo_class.html?id={0}"><img class=""';
					tbody += 'src="{1}" alt="chrome"></a>';
					tbody += '</div>';
					tbody += '<div class="course_info clearfix shadow">';
					tbody += '<h4 class="mb5">{2}</h4>';
					tbody += '<p>';
					tbody += '<span class="pull-left color-gray">{3}</span>';
					tbody += '<span class="pull-right color-gray">{4}人学习</span>';
					tbody += '</p>';
					tbody += '</div>';
					tbody += '</div>';
					var html = "";
					for (var i = 0; i < list.length; i++) {
						var _obj = list[i];
						html += tbody.replace("{0}",
								_obj.course_id).replace("{1}",
								_obj.img).replace("{2}",
								_obj.course_name).replace(
								"{3}", _obj.teacher_name)
								.replace("{4}", _obj.count);
					}
					$("#course").html(html);
				});
			},
		}

	}();
	window.search_result = search_result;
}(jQuery));