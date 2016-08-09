(function($) {
	var teacher_info = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 2,		// 每页记录数
			flag : 0,
			
			init : function() {
				teacher.init();
				teacher_info.btn_click();
				teacher_info.initValidate();
				teacher_info.show();
			},
			getQueryString : function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				
				if (r != null)
					return (r[2]);
				return "";
			},
			show:function(){
				id=sessionStorage.getItem("teacher_id");
				commonAjax.ajaxPost("teacher/select.do", id, function(result){
					$("#teacher_id").html(id);
					$("#teacher_no").html(result.data.teacher_no);
					$("#teacher_name1").val(result.data.teacher_name);
					$("#phone").val(result.data.phone);
					$("#email").val(result.data.email);
				});
			},
			initValidate:function(){
				$('#form').validate({
					ignore:'',
		            rules: {
		            	teacher_name1: {
		                    required: true,
		                    maxlength: 20
		                },
		                teacher_pass1: {
		                	isPwd:true,
		                	maxlength: 20
		                },
		                teacher_pass2: {
		                	equalTo: "#teacher_pass1"
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
		            	teacher_name1: {
		                    required: "学生姓名不能为空",
		                    maxlength: "学生姓名不能超过20字"
		                },
		                teacher_pass1: {
		                	isPwd:"只能包含字符、数字和下划线",
		                	maxlength: 20
		                },
		                teacher_pass2: {
		                	equalTo: "两次密码不一样"
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
				vo.teacher_id=$.trim($("#teacher_id").html());
				vo.teacher_name=$.trim($("#teacher_name1").val());
				vo.teacher_pass=$.trim($("#teacher_pass1").val());
				vo.email=$.trim($("#email").val());
				vo.phone=$.trim($("#phone").val());
				maskUtil.showMask("main");
				commonAjax.ajaxPost("teacher/update.do", vo, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "信息修改成功,请重新登陆!", type: "success",showCancelButton: false},function(){
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
					teacher_info.save();
				});
			},

		}

	}();
	window.teacher_info = teacher_info;
}(jQuery));