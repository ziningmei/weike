(function($) {
	var class_introduction = function() {

		return {
			currentclass_introduction : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,

			init : function() {
				student.init();
				class_introduction.initData();
			},
			initData:function(){
				var id = class_introduction.getQueryString("id");
				commonAjax.ajaxPost("course/select.do", id, function(result){
					if(!result.success){
						return;
					}
					$("#course_name").html("《"+result.data.course_name+"》");
					$("#teacher_name").html(result.data.teacher_name);
					$("#course_describe").html(result.data.course_describe);
				});
			},
			insertCourse : function() {
				var vo=new Object();
				vo.student_id=sessionStorage.getItem("student_id");
				vo.course_id=class_introduction.getQueryString("id");
				commonAjax.ajaxPost("courseStudent/insert.do", vo, function(result){
					if(result.success){
						swal({title:"提示!",text: "课程加入成功!", type: "success",showCancelButton: false},function(){
							window.location.href="gointo_class.html?id="+class_introduction.getQueryString("id");
						});
					}else{
						swal({title:"提示!",text: "课程加入失败，请联系管理员!", type: "error",showCancelButton: false},function(){
							class_introduction.init();
						});
					}
				});
			},
			
			getQueryString : function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				
				if (r != null)
					return (r[2]);
				return "";
			},
		}

	}();
	window.class_introduction = class_introduction;
}(jQuery));