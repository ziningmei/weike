(function($) {
	var do_homework = function() {

		return {
			currentcenter_myhomework : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,
			submit_id:"",
			fileurl:"",
			scores:["未批阅","不及格","及格","良好","优秀"],

			init : function() {
				student.init();
				do_homework.initHomework();
				do_homework.checkHomework();
			},
			initHomework:function(){
				var id=do_homework.getQueryString("id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/select.do", id,function(result){
					if(!result.success){
						alert("系统错误，请联系管理员");
						return;
					}
					$("#homework_name").html(result.data.homework_name);
					maskUtil.hideMask("main");
				});
			},
			checkHomework:function(){
				var vo=new Object();
				vo.homework_id=do_homework.getQueryString("id");
				vo.student_id=sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/checkHomework.do",vo,function(result){
					$("#add").unbind();
					if(result.flag=="1"){
						do_homework.submit_id=result.submit_id;
						$("#add").html("重新提交");
						$("#add").attr("onclick","do_homework.update();");
					}else if(result.flag=='0'){
						$("#add").html("提交");
						$("#add").attr("onclick","do_homework.add();");
					}
					
					maskUtil.hideMask("main");
				});
			},
			showScore:function(){
				var vo=new Object();
				vo.homework_id=do_homework.getQueryString("id");
				vo.student_id=sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/checkHomework.do",vo,function(result){
					commonAjax.ajaxPost("submit/select.do", result.submit_id, function(data){
						if(!data.success){
							alert("系统错误，请联系管理员");
							return;
						}
						$("#content").html(data.data.homework_name);
						$("#score").html(do_homework.scores[Number(data.data.score)]);
						$("#download").attr("href",data.data.result_url);
					});
				});
			},
			add:function(){
				if(do_homework.fileurl==""){
					alert("作业不能为空");
					return;
				}
				var vo=new Object();
				vo.homework_id=do_homework.getQueryString("id");
				vo.student_id=sessionStorage.getItem("student_id");
				vo.init_url=do_homework.fileurl;
				commonAjax.ajaxPost("submit/insert.do", vo, function(result){
					if(result.success){
						swal({title:"提示!",text: "提交成功!", type: "success",showCancelButton: false},function(){
							window.location.href="center_myhomework.html";
						});
					}else{
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			update:function(){
				if(do_homework.fileurl==""){
					alert("作业不能为空");
					return;
				}
				var vo=new Object();
				vo.homework_id=do_homework.getQueryString("id");
				vo.student_id=sessionStorage.getItem("student_id");
				vo.init_url=do_homework.fileurl;
				vo.submit_id=do_homework.submit_id;
				commonAjax.ajaxPost("submit/update.do", vo, function(result){
					if(result.success){
						swal({title:"提示!",text: "提交成功!", type: "success",showCancelButton: false},function(){
							window.location.href="center_myhomework.html";
						});
					}else{
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
				
			},
			fileUpload : function() {
				var fileObj = document.getElementById("file").files[0]; // js
				// 获取文件对象
				var fileExtend=$('#file').val().substring($('#file').val().lastIndexOf('.')).toLowerCase();
				if(fileExtend!=".doc"&&fileExtend!=".docx"&&fileExtend!=".ppt"&&fileExtend!=".pptx"){ 
					$('#file').val("");
					do_homework.fileurl="";
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
								do_homework.fileurl = data;
							} else {
								sweetAlert("提示", "文件不能为空!", "error");
							}
							maskUtil.hideMask("main");
						}
					};
					xhr.send(form);
				}
			},
			getQueryString : function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				
				if (r != null)
					return (r[2]);
				return "";
			},
		}

	}();
	window.do_homework = do_homework;
}(jQuery));