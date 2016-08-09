(function($) {
	var student = function() {
		return {

			/**
			 * 获取登录的专家信息
			 */
			init : function(event) {
				commonAjax
						.ajaxPost(
								"student/initStudent.do",
								"",
								function(result) {
									if (result.success) {
										if (result.data.student_name == "") {
											swal(
													{
														title : "提示!",
														text : "初次登录请完善信息!",
														type : "warning",
														showCancelButton : false
													},
													function() {
														window.location.href = "complete_info.html?id="
																+ result.data.student_id;
													});
										}else if(sessionStorage.getItem("student_id") == null){
											swal(
													{
														title : "提示!",
														text : "登录超时，请重新登录!",
														type : "error",
														showCancelButton : false
													},
													function() {
														window.location.href = commonAjax.defaultOption.url
																+ "html/login.html";
													});
										} 
										else {
											$('#student_name').html(
													result.data.student_name);
											$('#student_name_p').html(
													result.data.student_name);
											$('#student_name')
													.click(
															function() {
																window.location.href = "personal_center.html?id="
																		+ result.data.student_id;
															});
										}
									} else {
										sessionStorage.clear();
										swal(
												{
													title : "提示!",
													text : "登录超时，请重新登录!",
													type : "error",
													showCancelButton : false
												},
												function() {
													window.location.href = commonAjax.defaultOption.url
															+ "html/login.html";
												});
									}
								});
				
				student.logout();
				$("#search-btn").click(function() {
					sessionStorage.setItem('search', $("#search-btn").parent().find('input').val());
					
					$("#search-btn").parent().find('input').val("");
					window.location.href = "search_result.html";
				})
			},
			/**
			 * 注销登录
			 * 
			 * @returns
			 */
			logout : function() {
				// 注销按钮
				$('#logout')
						.click(
								function() {
									sessionStorage.clear();
									swal(
											{
												title : "确认退出？",
												type : "warning",
												showCancelButton : true,
												confirmButtonColor : "#DD6B55",
												confirmButtonText : "确认",
												cancelButtonText : "取消",
												closeOnConfirm : false
											},
											function() {
												commonAjax
														.ajaxPost(
																"student/logout.do",
																"",
																function(result) {
																	if (result.success) {
																		window.location.href = '../login.html';
																	} else {
																		swal({
																			title : '系统错误请联系管理员！',
																			type : 'warning'
																		});
																	}
																});
											});
								});
			}
		}

	}();
	window.student = student;
})(jQuery);