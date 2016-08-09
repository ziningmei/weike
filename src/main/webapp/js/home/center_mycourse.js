(function($) {
	var center_mycourse = function() {

		return {
			currentcenter_mycourse : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,

			init : function() {
				student.init();
				center_mycourse.initMyCourse();
			},

			initMyCourse : function() {
				var vo = new Object();
				vo.student_id=sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("course/getMyCourse.do",vo,function(result) {
					maskUtil.hideMask("main")
					var list = result;
					var html = "";
					var tbody = "";
					tbody += '<div class="col-md-4">';
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
	window.center_mycourse = center_mycourse;
}(jQuery));