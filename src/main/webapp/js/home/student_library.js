(function($) {
	var student_library = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 2,		// 每页记录数
			flag : 0,
			
			init : function() {
				teacher.init();
				student_library.btn_click();
				student_library.initValidate();
				this.query(0);
			},
			/**
			 * 查询
			 */
			query : function(index) {
				var params=new Object();
				params.student_no=$.trim($("#student_number").val());
				params.student_name=$.trim($("#student_name").val());
				
				var vo = new Object();
				vo.start = index*this.pageSize;
				vo.limit = this.pageSize;
				vo.params = params;
				
				maskUtil.showMask("main");
				commonAjax.ajaxPost("student/listPage.do", vo, function (result) {
					maskUtil.hideMask("main")
					
					if(!result.success){
						alert('查询发生错误');
						return;
					}
					
					var list = result.list;
					var html = "";
					var tr="";
					tr += '<tr>';
					tr += '	<td>{0}</td>';
					tr += ' <td>{1}</td>';
					tr += ' <td>{2}</td>';
					tr += ' <td>';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-danger" onclick="student_library.deleteStudent({3});">';
					tr += '	<span class="glyphicon glyphicon-trash"></span>';
					tr += '</button>   ';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-success" onclick="student_library.resetStudent({4},{5});">';
					tr += '	<span class="glyphicon glyphicon-refresh"></span>';
					tr += '</button>';
					tr += ' </td>';
					tr += '</tr>';
					for (var i = 0; i < list.length; i++) {
						var _obj = list[i];
						html += tr.replace("{0}",i+index*student_library.pageSize+1)
								  .replace("{1}",_obj.student_no)
								  .replace("{2}",_obj.student_name)
								  .replace("{3}",_obj.student_id)
								  .replace("{4}",_obj.student_id)
								  .replace("{5}",_obj.student_no);
					}
					$("#tbody").html(html);
					// 计算页索引
					student_library.currentIndex=Math.floor(result.start/result.limit);
					// 设置分页
					var option={
						callback: function(index,jq){
							student_library.query(index);
						},
						current_page : student_library.currentIndex,	 // 当前页索引
						items_per_page : student_library.pageSize,    // 每页记录数
						num_edge_entries : 2, 	 			 // 显示首末页
						num_display_entries : 5, 			 // 最多显示的页码数
						load_callback : false,    		     // 初始化时是否执行callback
						prev_text : '上一页',	
						next_text :'下一页'
					};
					$("#pagination").pagination(result.totalSize, option);
				});
			},
			
			deleteStudent:function(id){
				if(confirm("确定要删除吗?")){
					maskUtil.showMask("main");
					commonAjax.ajaxPost("student/delete.do",id, function(result){
						maskUtil.hideMask("main");
						if(result.success){
							swal({title:"提示!",text: "删除成功!", type: "success",showCancelButton: false},function(){
								student_library.query(0);
							});
						}else{
							wal({title:'系统错误请联系管理员！',type:'warning'});
						}
					});
				}
			},
			showAdd:function(){
				$("#myModalLabel").html("新增学生");
				$(".validate_message").remove();
				$("#a_student_number").val("");
				$("#modal_add").modal("show");
			},
			
			insertStudent : function(){
				var student_no = $("#a_student_number").val().trim();
				var object = new Object();
				object.student_no = student_no;
				commonAjax.ajaxPost("student/selectStuNo.do", object, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						object.student_pass = student_no;
						student_library.insertStudent1(object);
					}else if(result.message != null){
						swal({title:'提示！',text: result.message, type:'warning'});
					} else {
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			insertStudent1 : function(object){
				commonAjax.ajaxPost("student/insert.do", object, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "添加成功!", type: "success",showCancelButton: false},function(){
							student_library.query(0);
						});
						$("#modal_add").modal("hide");
					}else{
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			
			resetStudent : function(id,student_no){
				if(confirm("确定重置密码吗？")){
					var object = new Object();
					object.student_id = id;
					object.student_pass = student_no;
					commonAjax.ajaxPost("student/update.do", object, function(result){
						maskUtil.hideMask("main");
						if(result.success){
							swal({title:"提示!",text: "重置密码成功!", type: "success",showCancelButton: false},function(){
								student_library.query(0);
							}); 	
							$("#modal_add").modal("hide");
						}else{
							wal({title:'系统错误请联系管理员！',type:'warning'});
						}
					});
				}
			},
			
			initValidate:function(){
				$('#form_add').validate({
					ignore:'',
		            rules: {
		            	a_student_number: {
		                    required: true,
		                    maxlength: 15
		                }
		            },
		            messages: {
		            	a_student_number: {
		                    required: "学号不能为空",
		                    maxlength: "学号不能超过15字"	
		                }
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
			
			btn_click : function() {

				$("#search").click(function(){
					student_library.query(0);
				});
				$("#reset").click(function(){
					$("#student_number").val("");
					$("#student_name").val("");
					student_library.query(0);
				});
				$("#plus").click(function(){
					student_library.showAdd();
				});
				$("#add").click(function(){
					if(!$("#form_add").valid()){
						return;
					}
					student_library.insertStudent();
				});
			},

		}

	}();
	window.student_library = student_library;
}(jQuery));