(function($) {
	var homework_manage = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 8,		// 每页记录数
			flag : 0,
			fileurl:"",
			
			init : function() {
				teacher.init();
				homework_manage.initData();
				homework_manage.btn_click();
				homework_manage.init_datapicker();
				homework_manage.initValidate();
			},
			initValidate:function(){
				$('#form_add').validate({
					ignore:'',
		            rules: {
		            	a_homework_name: {
		                    required: true,
		                    maxlength: 30
		                },
		                a_conent:{
		                	required: true,
		                	maxlength: 2000
		                },
		                endDate:{
		                	required: true,
		                	isDate:true,
		                },
		            },
		            messages: {
		            	a_homework_name: {
		                    required: "作业名称不能为空",
		                    maxlength:"作业名称不能超过30字"
		                },
		                a_conent:{
		                	required: "作业内容不能为空",
		                	maxlength: "作业内容不能超过2000字"
		                },
		                endDate:{
		                	required: "截止日期不能为空",
		                	isDate:"截止日期格式不正确",
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
			init_datapicker:function(){
				$('.form_date').datetimepicker({
					language : 'zh-CN',
					weekStart : 1,
					todayBtn : 1,
					autoclose : 1,
					todayHighlight : 1,
					startView : 2,
					minView : 2,
					forceParse : 0,
					format : 'yyyy-mm-dd',
					startDate:new Date()
				});
			},
			initData: function() {
				teacher_id =sessionStorage.getItem("teacher_id");
				var vo = new Object();
				vo.teacher_id=teacher_id;
				
				var url = "course/listAllByParams.do";
				maskUtil.showMask("main");
				commonAjax.ajaxPost(url,vo,function(result) {
					maskUtil.hideMask("main")
					var arr =result;
					var html = '';
					var options ='<option value="{8}">{9}</option>';
					for (var i = 0; i < arr.length; i++) {
						html += options
								.replace("{8}",arr[i].course_id)
								.replace("{9}",arr[i].course_name)
					}
					$("#course_name").html(html);
					if(homework_manage.getQueryString("id")!=""){
						$("#course_name").val(homework_manage.getQueryString("id"));
					}
					homework_manage.query(0);
				});
			},
			getQueryString : function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				
				if (r != null)
					return (r[2]);
				return "";
			},
			fileUpload : function() {
				var fileObj = document.getElementById("file").files[0]; // js
				// 获取文件对象
				var fileExtend=$('#file').val().substring($('#file').val().lastIndexOf('.')).toLowerCase();
				if(fileExtend!=".doc"&&fileExtend!=".docx"&&fileExtend!=".ppt"&&fileExtend!=".pptx"){ 
					$('#file').val("");
					homework_manage.fileurl="";
					alert("上传文件必须为Doc或者ppt文件！"); 
					return false;
				}
				if ($('#file').val() != '') {
					maskUtil.showMask("main");
					var FileController = "../../fileUpload/uploadFile.do"; // 接收上传文件的后台地址
					// FormData 对象
					var form = new FormData();
					form.append("file", fileObj); // 文件对象
					// XMLHttpRequest 对象
					var xhr = new XMLHttpRequest();
					xhr.open("POST", FileController, true);
					xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
					xhr.onreadystatechange = function(result) {
						if (xhr.readyState == 4 && xhr.status == 200) {
							var result = JSON.parse(xhr.responseText);
							if (result.success) {
								var data = result.resData;
								sweetAlert("提示", "文件上传成功!", "success");
								homework_manage.fileurl = data;
								$(".validate_message").remove();
							} else {
								sweetAlert("提示", "文件不能为空!", "error");
							}
							maskUtil.hideMask("main");
						}
					};
					xhr.send(form);
				}
			},
			/**
			 * 查询
			 */
			query : function(index) {
				var params=new Object();
				params.course_id=$.trim($("#course_name").val());
				params.homework_name=$.trim($("#homework_name").val());
				
				var vo = new Object();
				vo.start = index*this.pageSize;
				vo.limit = this.pageSize;
				vo.params = params;
				
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/listPage.do", vo, function (result) {
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
					tr += '<button type="button" class="btn btn-primary btn-xs" onclick="homework_manage.showEdit({5});">';
					tr += '<span class="glyphicon glyphicon-pencil"></span>';
					tr += '</button>&nbsp;';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-danger" onclick="homework_manage.deletehomework({3});">';
					tr += '	<span class="glyphicon glyphicon-trash"></span>';
					tr += '</button>   ';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-success" onclick="homework_manage.homeworkDetail({4});">';
					tr += '	<span class="glyphicon glyphicon-search"></span>';
					tr += '</button>';
					tr += ' </td>';
					tr += '</tr>';
					for (var i = 0; i < list.length; i++) {
						var _obj = list[i];
						html += tr.replace("{0}",i+index*homework_manage.pageSize+1)
								  .replace("{1}",_obj.course_name)
								  .replace("{2}",_obj.homework_name)
								  .replace("{3}",_obj.homework_id)
								  .replace("{4}",_obj.homework_id)
								  .replace("{5}",_obj.homework_id);
					}
					$("#tbody").html(html);
					// 计算页索引
					homework_manage.currentIndex=Math.floor(result.start/result.limit);
					// 设置分页
					var option={
						callback: function(index,jq){
							homework_manage.query(index);
						},
						current_page : homework_manage.currentIndex,	 // 当前页索引
						items_per_page : homework_manage.pageSize,    // 每页记录数
						num_edge_entries : 2, 	 			 // 显示首末页
						num_display_entries : 5, 			 // 最多显示的页码数
						load_callback : false,    		     // 初始化时是否执行callback
						prev_text : '上一页',	
						next_text :'下一页'
					};
					$("#pagination").pagination(result.totalSize, option);
				});
			},
			showEdit:function(id){
				$("#myModalLabel").html("修改作业");
				$(".validate_message").remove();
				commonAjax.ajaxPost("homework/select.do", id, function(result){
					if(!result.success){
						return;
					}
					$("#a_conent").val(result.data.content);
					$("#endDate").val(result.data.endDate);
					$("#a_homework_name").val(result.data.homework_name);
					$("#a_id").val(result.data.homework_id);
					$("#file").val(result.data.result_url);
					homework_manage.fileurl="";	
				})
				
				$("#add").hide();
				$("#edit").show();
				$("#modal_add").modal("show");
			},
			showAdd:function(){
				$("#myModalLabel").html("新增作业");
				$(".validate_message").remove();
				$("#a_conent").val("");
				$("#endDate").val("");
				$("#a_course_name").val("");
				$("#file").val("");
				homework_manage.fileurl="";
				$("#add").show();
				$("#edit").hide();
				$("#modal_add").modal("show");
			},
			add:function(){
				$(".validate_message").remove();
				if(!$("#form_add").valid()){
					return;
				}
				if($('#file').val()==""){
					$('<label id="a-img-error" class="error validate_message" for="img">答案不能为空</label>').insertAfter($("#file_body"));
					return;
				}
				var vo=new Object();
				vo.homework_name=$.trim($("#a_homework_name").val());
				vo.content=$.trim($("#a_conent").val());
				vo.result_url=homework_manage.fileurl;
				vo.endDate=$("#endDate").val();
				vo.course_id=$("#course_name").val();
				
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/insert.do", vo, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "添加成功!", type: "success",showCancelButton: false},function(){
							$("#modal_add").modal("hide");
							homework_manage.query(0);
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
				var vo=new Object();
				vo.homework_name=$.trim($("#a_homework_name").val());
				vo.content=$.trim($("#a_conent").val());
				vo.result_url=homework_manage.fileurl;
				vo.endDate=$("#endDate").val();
				vo.course_id=$("#course_name").val();
				vo.homework_id=$.trim($("#a_id").val());
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/update.do", vo, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "添加成功!", type: "success",showCancelButton: false},function(){
							$("#modal_add").modal("hide");
							homework_manage.query(0);
						});
					}else{
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			btn_click : function() {
				$("#plus").click(function(){
					homework_manage.showAdd();
				});
				$("#search").click(function(){
					homework_manage.query(0);
				});
				$("#reset").click(function(){
					$("#homework_name").val("");
					homework_manage.query(0);
				});
				$("#course_name").change(function(){
					homework_manage.query(0);
				});
				$("#add").click(function(){
					homework_manage.add();
				});
				$("#edit").click(function(){
					homework_manage.edit();
				});
			},
			homeworkDetail:function(id){
				window.location.href="submit_manage.html?id="+id;
			},
			deletehomework:function(id){
				if(confirm("确定要删除吗?")){
					maskUtil.showMask("main");
					commonAjax.ajaxPost("homework/delete.do",id, function(result){
						maskUtil.hideMask("main");
						if(result.success){
							swal({title:"提示!",text: "删除成功!", type: "success",showCancelButton: false},function(){
								homework_manage.query(0);
							});
						}else{
							wal({title:'系统错误请联系管理员！',type:'warning'});
						}
					});
				}
			},
			
		}

	}();
	window.homework_manage = homework_manage;
}(jQuery));