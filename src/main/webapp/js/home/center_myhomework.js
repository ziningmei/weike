(function($) {
	var center_myhomework = function() {

		return {
			currentcenter_myhomework : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,

			init : function() {
				student.init();
				center_myhomework.initNewHomework();
				center_myhomework.initSubmitted();
			},
			initNewHomework:function(){
				var vo = new Object();
				vo.student_id = sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/getUnsubmitHomework.do", vo, function(
						result) {
					maskUtil.hideMask("main")
					var html = "";
					var tr = "";
					tr += '<li>';
					tr += '《{0}》{5}';
					tr += ' <a class="btn btn-info pull-right white" role="button" href="do_homework.html?id={1}" {4}>{2}</a>';
					tr += ' <span class="deadline">期返日期{3}</span>';
					tr += '</li>';
					var message;
					var disabled;
					for (var i = 0; i < result.length; i++) {
						var _obj = result[i];
						if(_obj.flag=='1'){
							message="立即完成";
							disabled="";
						}else{
							message="已过期";
							disabled="disabled";
						}
						html += tr.replace("{0}", _obj.course_name)
						.replace("{1}",_obj.homework_id)
						.replace("{2}",message)
						.replace("{4}",disabled)
						.replace("{5}",_obj.homework_name)
						.replace("{3}",_obj.endDate);
					}
					$("#new_homework").html(html);
				});
			},
			initSubmitted:function(){
				var vo = new Object();
				vo.student_id = sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/getSubmit.do", vo, function(
						result) {
					maskUtil.hideMask("main")
					var html = "";
					var html1="";
					var tr = "";
					tr += '<li>';
					tr += '《{0}》{3}';
					tr += ' <a class="btn btn-info pull-right white" role="button" href="do_homework.html?id={1}">重新提交</a>';
					tr += ' <span class="deadline">期返日期{2}</span>';
					tr += '</li>';
					tr1="";
					tr1 += '<li>';
					tr1 += '《{0}》{1} ';
					tr1 += '<a class="btn btn-success pull-right white" role="button" href="homework_grade.html?id={2}">查看成绩</a>';
					tr1 += '</li>';
					for (var i = 0; i < result.length; i++) {
						var _obj = result[i];
						var message,disabled;
						if(_obj.flag!='0'){
							html += tr.replace("{0}", _obj.course_name)
							.replace("{1}",_obj.homework_id)
							.replace("{3}",_obj.homework_name)
							.replace("{2}",_obj.endDate);
						}else{
							html1 += tr1.replace("{0}", _obj.course_name)
							.replace("{2}",_obj.homework_id)
							.replace("{1}",_obj.homework_name);
						}
					}
					$("#submited").html(html);
					$("#history").html(html1);
				});
			},
		}

	}();
	window.center_myhomework = center_myhomework;
}(jQuery));