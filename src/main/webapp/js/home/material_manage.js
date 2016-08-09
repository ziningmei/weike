(function($) {
	var material_manage = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 8,		// 每页记录数
			flag : 0,
			fileurl:"",
			
			init : function() {
				teacher.init();
				material_manage.initData();
				material_manage.btn_click();
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
					material_manage.query(0);
				});
			},
			fileUpload : function(flag) {
				var fileObj = document.getElementById("file").files[0]; // js
				// 获取文件对象
				var fileExtend=$('#file').val().substring($('#file').val().lastIndexOf('.')).toLowerCase();
				if(flag=='0'){
					var FileController = "../../fileUpload/uploadFile.do"; // 接收上传文件的后台地址
					if(fileExtend!=".doc"&&fileExtend!=".docx"&&fileExtend!=".xls"&&fileExtend!=".pptx"&&fileExtend!=".pptx"&&fileExtend!=".xlsx"&&fileExtend!=".rar"){ 
						$('#file').val("");
						material_manage.fileurl="";
						alert("上传文件必须为doc,ppt,excel,rar文件！"); 
						return false;
					}
				}else {
					var FileController = "../../fileUpload/uploadVideo.do";
					if(fileExtend!=".mp4"){ 
						$('#file').val("");
						material_manage.fileurl="";
						alert("视频文件必须为mp4格式！"); 
						return false;
					}
				}
				if ($('#file').val() != '') {
					maskUtil.showMask("main");
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
								material_manage.fileurl = data;
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
				params.material_type=$.trim($("#type").val());
				params.material_name=$.trim($("#material_name").val());
				
				var vo = new Object();
				vo.start = index*this.pageSize;
				vo.limit = this.pageSize;
				vo.params = params;
				
				maskUtil.showMask("main");
				commonAjax.ajaxPost("material/listPage.do", vo, function (result) {
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
					tr += ' <td><a href="{4}">{2}</a></td>';
					tr += ' <td>';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-danger" onclick="material_manage.deletematerial({3});">';
					tr += '	<span class="glyphicon glyphicon-trash"></span>';
					tr += '</button>   ';
					tr += ' </td>';
					tr += '</tr>';
					for (var i = 0; i < list.length; i++) {
						var _obj = list[i];
						html += tr.replace("{0}",i+index*material_manage.pageSize+1)
								  .replace("{1}",_obj.material_name)
								  .replace("{2}",_obj.url)
								  .replace("{4}",_obj.url)
								  .replace("{3}",_obj.material_id);
					}
					$("#tbody").html(html);
					// 计算页索引
					material_manage.currentIndex=Math.floor(result.start/result.limit);
					// 设置分页
					var option={
						callback: function(index,jq){
							material_manage.query(index);
						},
						current_page : material_manage.currentIndex,	 // 当前页索引
						items_per_page : material_manage.pageSize,    // 每页记录数
						num_edge_entries : 2, 	 			 // 显示首末页
						num_display_entries : 5, 			 // 最多显示的页码数
						load_callback : false,    		     // 初始化时是否执行callback
						prev_text : '上一页',	
						next_text :'下一页'
					};
					$("#pagination").pagination(result.totalSize, option);
				});
			},
			showAdd:function(){
				$("#myModalLabel").html("新增资料");
				$("#modal_add").modal("show");
				$("#file").val("");
				material_manage.fileurl="";
			},
			add:function(){
				$(".validate_message").remove();
				if($('#file').val()==""){
					$('<label id="a-img-error" class="error validate_message" for="img">答案不能为空</label>').insertAfter($("#file_body"));
					return;
				}
				var vo=new Object();
				vo.material_type=$.trim($("#type").val());
				vo.course_id=$("#course_name").val();
				vo.url=material_manage.fileurl;
				vo.material_name=$.trim($("#file").val()).substring($("#file").val().lastIndexOf('\\')+1,$("#file").val().lastIndexOf('.'));
				maskUtil.showMask("main");
				commonAjax.ajaxPost("material/insert.do", vo, function(result){
					maskUtil.hideMask("main");
					if(result.success){
						swal({title:"提示!",text: "添加成功!", type: "success",showCancelButton: false},function(){
							$("#modal_add").modal("hide");
							material_manage.query(0);
						});
					}else{
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			btn_click : function() {

				$("#plus").click(function(){
					material_manage.showAdd();
				});
				$("#search").click(function(){
					material_manage.query(0);
				});
				$("#reset").click(function(){
					$("#material_name").val("");
					material_manage.query(0);
				});
				$("#course_name").change(function(){
					material_manage.query(0);
				});
				$("#type").change(function(){
					material_manage.query(0);
				});
				$("#file").change(function(){
					material_manage.fileUpload($("#type").val());
				});
				$("#add").click(function(){
					material_manage.add();
				});
			},
			
			deletematerial:function(id){
				if(confirm("确定要删除吗?")){
					maskUtil.showMask("main");
					commonAjax.ajaxPost("material/delete.do",id, function(result){
						maskUtil.hideMask("main");
						if(result.success){
							swal({title:"提示!",text: "删除成功!", type: "success",showCancelButton: false},function(){
								material_manage.query(0);
							});
						}else{
							wal({title:'系统错误请联系管理员！',type:'warning'});
						}
					});
				}
			},
			
		}

	}();
	window.material_manage = material_manage;
}(jQuery));