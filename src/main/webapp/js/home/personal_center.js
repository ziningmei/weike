(function($) {
	var personal_center = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 2,		// 每页记录数
			flag : 0,
			
			init : function() {
				student.init();
				personal_center.show();
			},
			getQueryString : function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				
				if (r != null)
					return (r[2]);
				return "";
			},
			show:function(){
				id=sessionStorage.getItem("student_id");
				commonAjax.ajaxPost("student/select.do", id, function(result){
					$("#student_id").html(id);
					$("#student_no").html(result.data.student_no);
					$("#student_name1").html(result.data.student_name);
					$("#student_sex").html(result.data.student_sex);
					$("#academy").html(result.data.academy);
					$("#major").html(result.data.major);
					$("#classroom").html(result.data.classroom);
					$("#phone").html(result.data.phone);
					$("#email").html(result.data.email);
				});
			},
		}

	}();
	window.personal_center = personal_center;
}(jQuery));