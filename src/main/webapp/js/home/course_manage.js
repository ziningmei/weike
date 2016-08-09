(function($) {
	var course_manage = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 8,		// 每页记录数
			flag : 0,
			
			init : function() {
				teacher.init();
				course_manage.btn_click();
				course_manage.init_base64();
				course_manage.initValidate();
				this.query(0);
			},
			/**
			 * 查询
			 */
			query : function(index) {
				var params=new Object();
				params.course_name=$.trim($("#course_name").val());
				params.teacher_id=sessionStorage.getItem("teacher_id");
				var vo = new Object();
				vo.start = index*this.pageSize;
				vo.limit = this.pageSize;
				vo.params = params;
				
				maskUtil.showMask("main");
				commonAjax.ajaxPost("course/listPage.do", vo, function (result) {
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
					tr += '<button type="button" class="btn btn-primary btn-xs" onclick="course_manage.showEdit({3});">';
					tr += '<span class="glyphicon glyphicon-pencil"></span>';
					tr += '</button>&nbsp;';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-danger" onclick="course_manage.deleteCourse({4});">';
					tr += '	<span class="glyphicon glyphicon-trash"></span>';
					tr += '</button>   ';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-success" onclick="course_manage.show({5});">';
					tr += '	<span class="glyphicon glyphicon-search"></span>';
					tr += '</button>';
					tr += ' </td>';
					tr += '</tr>';
					for (var i = 0; i < list.length; i++) {
						var _obj = list[i];
						if(_obj.course_describe.length>30){
							_obj.course_describe=_obj.course_describe.substr(0,30);
						}
						html += tr.replace("{0}",i+index*course_manage.pageSize+1)
								  .replace("{1}",_obj.course_name)
								  .replace("{2}",_obj.course_describe)
								  .replace("{3}",_obj.course_id)
								  .replace("{4}",_obj.course_id)
								  .replace("{5}",_obj.course_id);
					}
					$("#tbody").html(html);
					// 计算页索引
					course_manage.currentIndex=Math.floor(result.start/result.limit);
					if(result.totalSize%course_manage.pageSize==0&&result.totalSize/course_manage.pageSize<index+1&&result.start!=0){
						index=result.totalSize/course_manage.pageSize-1;
						course_manage.query(index);
					}
					// 设置分页
					var option={
						callback: function(index,jq){
							course_manage.query(index);
						},
						current_page : course_manage.currentIndex,	 // 当前页索引
						items_per_page : course_manage.pageSize,    // 每页记录数
						num_edge_entries : 2, 	 			 // 显示首末页
						num_display_entries : 5, 			 // 最多显示的页码数
						load_callback : false,    		     // 初始化时是否执行callback
						prev_text : '上一页',	
						next_text :'下一页'
					};
					$("#pagination").pagination(result.totalSize, option);
				});
			},
			show:function(id){
				$("#view1").unbind();
				$("#view2").unbind();
				$("#view3").unbind();
				$("#view1").click(function(){
					window.location.href="homework_manager.html?id="+id;
				});
				$("#view2").click(function(){
					window.location.href="question_manager.html?id="+id;
				});
				$("#view3").click(function(){
					window.location.href="meterial_manager.html?id="+id;
				});
				$("#modal_choose").modal("show");
			},
			deleteCourse:function(id){
				if(confirm("确定要删除吗?")){
					maskUtil.showMask("main");
					commonAjax.ajaxPost("course/delete.do", id, function(result){
						maskUtil.hideMask("main");
						if(result.success){
							swal({title:"提示!",text: "删除成功!", type: "success",showCancelButton: false},function(){
								course_manage.query(course_manage.currentIndex);
							});
						}else{
							wal({title:'系统错误请联系管理员！',type:'warning'});
						}
					});
				}
			},
			showAdd:function(){
				$("#myModalLabel").html("新增课程");
				$(".validate_message").remove();
				$('#show_chooseImg').attr("src", "").hide();
				$('#btn_close').hide();
				$('#img_chooseImg').show();
				$("#a_course_name").val("");
				$("#a_course_describe").val("");
				$("#add").show();
				$("#edit").hide();
				$("#modal_add").modal("show");
			},
			showEdit:function(id){
				$("#myModalLabel").html("修改课程");
				$(".validate_message").remove();
				commonAjax.ajaxPost("course/select.do", id, function(result){
					if(!result.success){
						return;
					}
					$('#show_chooseImg').attr("src",result.data.img).show();
					$("#a-img-error").remove();
					$('#btn_close').show();
					$('#img_chooseImg').hide();
					$("#a_course_name").val(result.data.course_name);
					$("#a_id").val(result.data.course_id);
					$("#a_course_describe").val(result.data.course_describe);
					
				});
				$("#add").hide();
				$("#edit").show();
				$("#modal_add").modal("show");
			},
			/**
			 * base64处理图片
			 */
			init_base64 : function() {
				
				if (typeof (FileReader) === undefined) {
					alert("抱歉，你的浏览器版本过低！");
					$('#btn_chooseImg').attr("disable", "disable");
				} else {
					$('#btn_chooseImg').change(function() {
						var file = this.files[0];
						if (file) {
							// 这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
							if (!/image\/\w+/.test(file.type)) {
								alert("请确保文件为图像类型");
								return false;
							}
							maskUtil.showMask("wrap");
							var reader = new FileReader();
							reader.readAsDataURL(file);
							reader.onload = function(e) {
								$('#show_chooseImg').attr("src",this.result).show();
								$("#a-img-error").remove();
								$('#btn_close').show();
								$('#img_chooseImg').hide();
								maskUtil.hideMask("wrap");
							}
						}
					});
				}
			},
			initValidate:function(){
				$('#form_add').validate({
					ignore:'',
		            rules: {
		            	a_course_name: {
		                    required: true,
		                    maxlength: 30
		                },
		                a_course_describe:{
		                	required: true,
		                	maxlength: 1200
		                },
		            },
		            messages: {
		            	a_course_name: {
		                    required: "课程名称不能为空",
		                    maxlength: "课程名称不能超过30字"
		                },
		                a_course_describe:{
		                	required: "课程描述不能为空",
		                	maxlength: "课程描述长度不超过1200字"
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
			add:function(){
				$(".validate_message").remove();
				if(!$("#form_add").valid()){
					return;
				}
				if($('#show_chooseImg').attr("src")==""){
					$('<label id="a-img-error" class="error validate_message" for="img">课程图片不能为空</label>').insertAfter($("#img_chooseImg"));
					return;
				}
				var vo=new Object();
				vo.course_name=$.trim($("#a_course_name").val());
				vo.course_describe=$.trim($("#a_course_describe").val());
				vo.img=$('#show_chooseImg').attr("src");
				vo.teacher_id=sessionStorage.getItem("teacher_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("course/insert.do", vo, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "添加成功!", type: "success",showCancelButton: false},function(){
							$("#modal_add").modal("hide");
							course_manage.query(0);
						});
					}else{
						swal({title:'系统错误请联系管理员！',type:'warning'});
					}
					
				});
			},
			edit:function(){
				$(".validate_message").remove();
				if(!$("#form_add").valid()){
					return;
				}
				if($('#show_chooseImg').attr("src")==""){
					$('<label id="a-img-error" class="error validate_message" for="img">课程图片不能为空</label>').insertAfter($("#img_chooseImg"));
					return;
				}
				var vo=new Object();
				vo.course_id=$.trim($("#a_id").val());
				vo.course_name=$.trim($("#a_course_name").val());
				vo.course_describe=$.trim($("#a_course_describe").val());
				vo.img=$('#show_chooseImg').attr("src");
				vo.teacher_id=$("#teacher_name").attr("title");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("course/update.do", vo, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "修改成功!", type: "success",showCancelButton: false},function(){
							$("#modal_add").modal("hide");
							course_manage.query(course_manage.currentIndex);
						});
					}else{
						swal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			btn_click : function() {

				$("#search").click(function(){
					course_manage.query(0);
				});
				$("#reset").click(function(){
					$("#course_name").val("");
					course_manage.query(0);
				});
				$("#plus").click(function(){
					course_manage.showAdd();
				});
				$("#add").click(function(){
					course_manage.add();
				});
				$('#img_chooseImg').click(function() {
					$('#btn_chooseImg').click();
				});
				// 删除图片
				$('#btn_close').click(function() {
					// 图片清空
					$('#show_chooseImg').attr("src", "").hide();
					$('#btn_close').hide();
					$('#img_chooseImg').show();
					var file=$("#btn_chooseImg");
					file.after(file.clone().val(""));
					file.remove();	
					course_manage.init_base64();
					$('<label id="a-img-error" class="error validate_message" for="img">课程图片不能为空</label>').insertAfter($("#img_chooseImg"));
				});
			},

		}

	}();
	window.course_manage = course_manage;
}(jQuery));