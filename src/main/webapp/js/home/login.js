(function($) {
	var login = function() {

		return {

			flag : 0,
			
			init : function() {

				login.input_init();
				login.btn_click();
			},
			input_init:function(){
				$("#student_no").val("");
				$("#student_pwd").val("");
				$("#teacher_no").val("");
				$("#teacher_pwd").val("");
				
			},
			
			studentLogin : function() {
				
				maskUtil1.showMask("main");
				var student_no = $.trim($('#student_no').val());
				var student_pass = $.trim($('#student_pwd').val());
				var vo = new Object();
				vo.student_no = student_no;
				vo.student_pass = student_pass;
				commonAjax.ajaxPost("student/login.do", vo,function(result) {
					if (result.success) {
						sessionStorage.setItem("student_id",result.data.student_id);
						window.location.href="student/index.html";
					} else {
						swal({title:"提示!",text: "账号密码错误，请重新输入!", type: "error",showCancelButton: false},function(){
							login.input_init();
						});
					}
					maskUtil1.hideMask("main");
				});
			},
			teacherLogin : function() {
				maskUtil1.showMask("main");
				var teacher_no = $.trim($('#teacher_no').val());
				var teacher_pass = $.trim($('#teacher_pwd').val());
				var vo = new Object();
				vo.teacher_no = teacher_no;
				vo.teacher_pass = teacher_pass;
				commonAjax.ajaxPost("teacher/login.do", vo,function(result) {
					if (result.success) {
						sessionStorage.setItem("teacher_id",result.data.teacher_id);
						window.location.href="teacher/course_manager.html";
					} else {
						swal({title:"提示!",text: "账号密码错误，请重新输入!", type: "error",showCancelButton: false},function(){
							login.input_init();
						});
					}
					
					maskUtil1.hideMask("main");
				});
			},
			studentValidate:function(){
				var reg=/^[0-9]*$/;
				var reg1=/^\w{6,20}$/;
				if($.trim($('#student_no').val())==""){
					swal({title:"提示!",text: "学号不能为空!", type: "error",showCancelButton: false},function(){
						$('#student_no').focus();
					});
				}else if(!reg.test($.trim($('#student_no').val()))){
					swal({title:"提示!",text: "学号只能为数字!", type: "error",showCancelButton: false},function(){
						$('#student_no').focus();
					});
				}else if($.trim($('#student_pwd').val())==""){
					swal({title:"提示!",text: "密码不能为空!", type: "error",showCancelButton: false},function(){
						$('#student_pwd').focus();
					});
				}else if(!reg1.test($.trim($('#student_pwd').val()))){
					swal({title:"提示!",text: "密码长度在6~18之间，只能包含字符、数字和下划线!", type: "error",showCancelButton: false},function(){
						$('#student_pwd').focus();
					});
				}else{
					return true;
				}
			},
			teacherValidate:function(){
				var reg=/^[0-9]*$/;
				var reg1=/^\w{6,20}$/;
				if($.trim($('#teacher_no').val())==""){
					swal({title:"提示!",text: "工号不能为空!", type: "error",showCancelButton: false},function(){
						$('#teacher_no').focus();
					});
				}else if(!reg.test($.trim($('#teacher_no').val()))){
					swal({title:"提示!",text: "工号只能为数字!", type: "error",showCancelButton: false},function(){
						$('#teacher_no').focus();
					});
				}else if($.trim($('#teacher_pwd').val())==""){
					swal({title:"提示!",text: "密码不能为空!", type: "error",showCancelButton: false},function(){
						$('#teacher_pwd').focus();
					});
				}else if(!reg1.test($.trim($('#teacher_pwd').val()))){
					swal({title:"提示!",text: "密码长度在6~18之间，只能包含字符、数字和下划线!!", type: "error",showCancelButton: false},function(){
						$('#teacher_pwd').focus();
					});
				}else{
					return true;
				}
			},
			btn_click : function() {

				$('#student').click(function() {
					if(!login.studentValidate()){
						return;
					}
					login.studentLogin();
				});
				$('#teacher').click(function() {
					if(!login.teacherValidate()){
						return;
					}
					login.teacherLogin();
				});
				
			},
		}

	}();
	window.login = login;
}(jQuery));