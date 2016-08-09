(function($) {
	var teacher = function() {
		return {

			/**
			 * 获取登录的专家信息
			 */
			init : function(event) {

				commonAjax.ajaxPost("teacher/initTeacher.do", "", function(
						result) {
					if (result.success) {
						$('#teacher_name').html(result.data.teacher_name);
						sessionStorage.setItem("teacher_id",result.data.teacher_id);
					} else {
						swal({
							title : "提示!",
							text : "登录超时，请重新登录!",
							type : "error",
							showCancelButton : false
						}, function() {
							window.location.href = commonAjax.defaultOption.url
									+ "html/login.html";
						});
					}
				});
				teacher.logout();
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
																"teacher/logout.do",
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
	window.teacher = teacher;
})(jQuery);