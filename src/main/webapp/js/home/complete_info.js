(function($) {
	var complete_info = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 2,		// 每页记录数
			flag : 0,
			
			init : function() {
				complete_info.btn_click();
				complete_info.initValidate();
				complete_info.show(complete_info.getQueryString("id"));
			},
			getQueryString : function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null)
					return (r[2]);
				return "";
			},
			show:function(id){
				commonAjax.ajaxPost("student/select.do", id, function(result){
					$("#student_id").html(id);
					$("#student_no").html(result.data.student_no);
				});
			},
			initValidate:function(){
				$('#form').validate({
					ignore:'',
		            rules: {
		            	student_name: {
		                    required: true,
		                    maxlength: 20
		                },
		                classroom: {
		                	required: true,
		                	maxlength: 20
		                },
		                academy: {
		                	required: true,
		                	maxlength: 20
		                },
		                major: {
		                	required: true,
		                	maxlength: 20
		                },
		                email: {
		                	required: true,
		                	isEmail: true
		                },
		                phone: {
		                	required: true,
		                	isMobile: true
		                },
		            },
		            messages: {
		            	student_name: {
		                    required: "学生姓名不能为空",
		                    maxlength: "学生姓名不能超过20字"
		                },
		                classroom: {
		                	required: "班级不能为空",
		                	maxlength: "班级名称不能超过20字"
		                },
		                academy: {
		                	required: "学院不能为空",
		                	maxlength: "学院名称不能超过20字"
		                },
		                major: {
		                	required: "专业不能为空",
		                	maxlength: "专业名称不能超过20字"
		                },
		                email: {
		                	required: "邮箱不能为空",
		                	isEmail: "请输入正确的邮箱"
		                },
		                phone: {
		                	required: "手机号码不能为空",
		                	isMobile: "请输入正确的手机号"
		                },
		            },
		            highlight: function (element) { 
		                //$(element).parent().addClass('has-error'); 
		            },
		            success: function (label) {
		                //label.prev().removeClass('has-error');
		            },
		            errorPlacement: function (error, element) {
		                error.addClass('validate_message').insertAfter(element.parent());
		            }
				});
			},
			save:function(){
				$(".validate_message").remove();
				if(!$("#form").valid()){
					return;
				}
				var vo=new Object();
				vo.student_id=$.trim($("#student_id").html());
				vo.student_name=$.trim($("#student_name").val());
				vo.student_sex=$.trim($("#student_sex").val());
				vo.classroom=$.trim($("#classroom").val());
				vo.academy=$.trim($("#academy").val());
				vo.major=$.trim($("#major").val());
				vo.email=$.trim($("#email").val());
				vo.phone=$.trim($("#phone").val());
				maskUtil.showMask("main");
				commonAjax.ajaxPost("student/update.do", vo, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "完善成功,请重新登陆!", type: "success",showCancelButton: false},function(){
							window.location.href="../login.html";
						});
					}else{
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			btn_click : function() {
				$("#search-btn").click(function(){
					localStorage.setItem('search', $("#search-input").val());
					window.location.href="search_result.html";
				});
				$("#save").click(function(){
					complete_info.save();
				});
			},

		}

	}();
	window.complete_info = complete_info;
}(jQuery));