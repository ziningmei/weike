(function($) {
	var question_manage = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 8,		// 每页记录数
			flag : 0,
			
			init : function() {
				teacher.init();
				question_manage.initData();
				question_manage.btn_click();
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
					question_manage.query(0);
				});
			},
			
			/**
			 * 查询
			 */
			query : function(index) {
				var params=new Object();
				params.course_id=$.trim($("#course_name").val());
				params.question_name=$.trim($("#question_name").val());
				
				var vo = new Object();
				vo.start = index*this.pageSize;
				vo.limit = this.pageSize;
				vo.params = params;
				
				maskUtil.showMask("main");
				commonAjax.ajaxPost("question/listPage.do", vo, function (result) {
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
					tr += '	class="btn btn-primary btn-xs btn-danger" onclick="question_manage.deleteQuestion({3});">';
					tr += '	<span class="glyphicon glyphicon-trash"></span>';
					tr += '</button>   ';
					tr += '<button type="button"';
					tr += '	class="btn btn-primary btn-xs btn-success" onclick="question_manage.questionDetail({4});">';
					tr += '	<span class="glyphicon glyphicon-search"></span>';
					tr += '</button>';
					tr += ' </td>';
					tr += '</tr>';
					for (var i = 0; i < list.length; i++) {
						var _obj = list[i];
						html += tr.replace("{0}",i+index*question_manage.pageSize+1)
								  .replace("{1}",_obj.course_name)
								  .replace("{2}",_obj.question_name)
								  .replace("{3}",_obj.question_id)
								  .replace("{4}",_obj.question_id)
					}
					$("#tbody").html(html);
					// 计算页索引
					question_manage.currentIndex=Math.floor(result.start/result.limit);
					// 设置分页
					var option={
						callback: function(index,jq){
							question_manage.query(index);
						},
						current_page : question_manage.currentIndex,	 // 当前页索引
						items_per_page : question_manage.pageSize,    // 每页记录数
						num_edge_entries : 2, 	 			 // 显示首末页
						num_display_entries : 5, 			 // 最多显示的页码数
						load_callback : false,    		     // 初始化时是否执行callback
						prev_text : '上一页',	
						next_text :'下一页'
					};
					$("#pagination").pagination(result.totalSize, option);
				});
			},
			
			btn_click : function() {

				$("#search").click(function(){
					question_manage.query(0);
				});
				$("#reset").click(function(){
					$("#question_name").val("");
					question_manage.query(0);
				});
				$("#course_name").change(function(){
					question_manage.query(0);
				});
			},
			answer:function(){
				var vo=new Object();
				if($("#answer_content").val()==""){
					swal({title:"提示!",text: "回答不能为空!", type: "error",showCancelButton: false},function(){
						return ;
					});
				}
				vo.question_id=$("#u_id").val();
				vo.user_type='0';
				vo.user_id=sessionStorage.getItem("teacher_id");
				vo.answer_content=$("#answer_content").val();
				commonAjax.ajaxPost("answer/insert.do", vo, function(result){
					if(result.success){
						swal({title:"提示!",text: "提问成功!", type: "success",showCancelButton: false},function(){
							question_manage.questionDetail(vo.question_id);
						});
					}else{
						swal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			questionDetail:function(id){
				
				var html="";
				var tr='<div class="question clearfix">';
					tr+='<h4 class="pull-left">{0}:</h4>';
					tr+='<h5 class="pull-left">{1}?</h5>';
					tr+='</div>';
                var tr1='<div class="answer clearfix">';
                	tr1+='<h4>{2}:</h4>';
                	tr1+='<p class="article">{3}</p>';
                	tr1+='</div>';
                var tr2=' <div class="answer clearfix">';
                	tr2+='<p class="no-answer">暂无回答</p>';
                	tr2+='</div>';
                var i=0;
                commonAjax.ajaxPost("question/getQuestionInfo.do", id, function(result){
                	html+=tr.replace("{0}", result.student_name).replace("{1}",result.question_name);
                	$("#u_id").val(id);
                	
                	var list = result.list;
                	for(i=0;i<list.length;i++){
                		var _obj=list[i];
                		if(_obj.user_type=='0'){
                			html+=tr1.replace("{2}", _obj.teacher_name)
                			.replace("{3}", _obj.answer_content);
                		}else if (_obj.user_type=='1'){
                			html+=tr1.replace("{2}", _obj.student_name)
                			.replace("{3}", _obj.answer_content);
                		}
                	}	
                	if(i==0){
                		html+=tr2;
                	}
                	$("#detail").html(html);
                	$("#answer").val("");
                	$("#question_detail").modal("show");
                });
			},
			deleteQuestion:function(id){
				if(confirm("确定要删除吗?")){
					maskUtil.showMask("main");
					commonAjax.ajaxPost("question/delete.do",id, function(result){
						maskUtil.hideMask("main");
						if(result.success){
							swal({title:"提示!",text: "删除成功!", type: "success",showCancelButton: false},function(){
								question_manage.query(0);
								
							});
						}else{
							wal({title:'系统错误请联系管理员！',type:'warning'});
						}
					});
				}
			},
			
		}

	}();
	window.question_manage = question_manage;
}(jQuery));