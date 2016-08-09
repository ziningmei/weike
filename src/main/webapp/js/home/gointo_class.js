(function($) {
	var gointo_class = function() {

		return {
			currentcenter_mycourse : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,
			buttons:["未提交","已提交","已过期","查看成绩"],
			hrefs:["do_homework.html?id=","do_homework.html?id=","","homework_grade.html?id="],
			init : function() {
				maskUtil.showMask("main");
				gointo_class.checkIsChoose();
			},
			
			getQueryString : function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				
				if (r != null)
					return (r[2]);
				return "";
			},
			
			checkIsChoose:function(){
				var vo=new Object();
				vo.student_id=sessionStorage.getItem("student_id");
				vo.course_id=gointo_class.getQueryString("id");
				commonAjax.ajaxPost("courseStudent/listAllByParams.do",vo,function(result){
					maskUtil.hideMask("main");
					if(result.length==0){
						window.location.href="class_introduction.html?id="+vo.course_id;
					}else{
						gointo_class.initData();
					}
				});
				
			},
			initData:function(){
				student.init();
				gointo_class.initTitle();
				gointo_class.initMaterial();
				gointo_class.initQuestion();
				gointo_class.initButton();
				gointo_class.initHomework();
			},
			initTitle:function(){
				var course_id=gointo_class.getQueryString("id");
				commonAjax.ajaxPost("course/select.do", course_id, function(result){
						if(result.success){
							var small='<small>'+result.data.teacher_name+'</small>'
							$("#g_course_name").html('《'+result.data.course_name+'》'+small);
						}else{
							swal({title:"提示!",text: "系统错误，请联系管理员!", type: "error",showCancelButton: false},function(){
								return;
							});
						}
				});
			},
			initHomework:function(){
				var vo=new Object();
				vo.student_id=sessionStorage.getItem("student_id");
				vo.course_id=gointo_class.getQueryString("id");
				commonAjax.ajaxPost("homework/getCourseHomework.do", vo, function(result){
					var _obj=result[i];
					var html="";
					var tr='';
					tr+='<li>';
					tr+='<div class="row">';
					tr+='<div class="col-md-8 col-md-offset-2">';
					tr+='<p class="clearfix">';
					tr+='        <span class="pull-left">作业{0} {1}</span> ';  
					tr+='        <a class="btn btn-info pull-right btn-sm" role="button" href="{2}{6}" {3}>{4}</a>';
					tr+='       <span class="deadline">期返日期{5}</span></dd>';
					tr+='   </p>';
					tr+=' </div>';
					tr+='</div>';
					tr+='</li>';
					for(var i=0;i<result.length;i++){
						var _obj=result[i];
						var button="";
						var disabled="";
						if(_obj.flag==2)
							disabled="disabled";
						html+=tr.replace("{0}", i+1)
							.replace("{1}", _obj.homework_name)
							.replace("{2}",gointo_class.hrefs[Number(_obj.flag)])
							.replace("{3}", disabled)
							.replace("{4}", gointo_class.buttons[Number(_obj.flag)])
							.replace("{5}", _obj.endDate)
							.replace("{6}",_obj.homework_id);
					}
					$("#homework_body").html(html);
				})
			},
			initButton:function(){
				$("#submit").click(function(){
					if($("#question_content").val()==""){
						swal({title:"提示!",text: "提问不能为空!", type: "error",showCancelButton: false},function(){
							return ;
						});
					}else if($("#question_content").val().length>=200){
						swal({title:"提示!",text: "问题字数不能超过200字!", type: "error",showCancelButton: false},function(){
							return ;
						});
					}
					var vo=new Object();
					vo.course_id=gointo_class.getQueryString("id");
					vo.user_id=sessionStorage.getItem("student_id");
					vo.question_name=$("#question_content").val()
					commonAjax.ajaxPost("question/insert.do", vo, function(result){
						if(result.success){
							swal({title:"提示!",text: "提问成功!", type: "success",showCancelButton: false},function(){
								gointo_class.initQuestion();
							});
						}else{
							swal({title:"提示!",text: "系统错误，请联系管理员!", type: "error",showCancelButton: false},function(){
								return;
							});
						}
						$("#ask").modal("hide");
					});
				});
			},
			initQuestion:function(){
				var vo=new Object();
				vo.course_id=gointo_class.getQueryString("id");
				commonAjax.ajaxPost("question/listAllByParams.do", vo, function(result){
					var str='';
					var html='';
					str+='<li>';
					str+='  <div class="row">';
					str+='<div class="col-md-8 col-md-offset-2">';
					str+='    <p class="clearfix">';
					str+='       <span class="name pull-left">{0}：</span>';
					str+='<span class="question_tit pull-left">{1}</span>';
					str+='    <a class="btn btn-info pull-right btn-sm white" role="button" onclick="gointo_class.showAnswer({2});" data-toggle="modal" >查看</a>';
					str+=' </p>';
					str+=' </div>';
					str+='</div>  ';
					str+='</li>';
					for(var i=0;i<result.length;i++){
						var _obj=result[i];
						html+=str.replace("{0}", _obj.student_name)
							.replace("{1}", _obj.question_name)
							.replace("{2}", _obj.question_id);
					}
					$("#question").html(html);
				});
			},
			answer:function(){
				var vo=new Object();
				if($("#answer_content").val()==""){
					alert("你的回答为空");
					return;
				}
				vo.question_id=$("#u_id").val();
				vo.user_type='1';
				vo.user_id=sessionStorage.getItem("student_id");
				vo.answer_content=$("#answer_content").val();
				commonAjax.ajaxPost("answer/insert.do", vo, function(result){
					if(result.success){
						swal({title:"提示!",text: "提交成功!", type: "success",showCancelButton: false},function(){
							$("question_details").modal("hide");
							gointo_class.showAnswer($("#u_id").val());
						});
					}else{
						swal({title:'系统错误请联系管理员！',type:'warning'});
					}
				});
			},
			showAnswer:function(id){
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
                	$("#question_detail").html(html);
                	$("#answer").val("");
                	$("#question_details").modal("show");
                });
			},
			initMaterial:function(){
				var vo=new Object();
				vo.course_id=gointo_class.getQueryString("id");
				commonAjax.ajaxPost("material/listAllByParams.do", vo, function(result){
					var tr="";
					var tr2="";
					var html1="";
					var html2="";
					tr+=' <li>';
					tr+=' <div class="row">';
					tr+='<div class="col-md-8 col-md-offset-2">';
					tr+='   <p class="clearfix">';
					tr+='      <span class="pull-left">{0}</span>';
	/*				tr+='      <a class="btn btn-success pull-right btn-sm white" role="button" href="video.html?id={1}">播放</a>';*/
					tr+='      <a class="btn btn-info pull-right btn-sm white" role="button" href="{2}">播放</a>';
					tr+='   </p>';
					tr+=' </div>';
					tr+='  </div>  ';
					tr+='  </li>';
					tr2+='<li>';
					tr2+='<div class="row">';
					tr2+='<div class="col-md-8 col-md-offset-2">';
					tr2+='    <p class="clearfix">';
					tr2+='        <span class="pull-left">{0}</span>';
					tr2+='       <a class="btn btn-info pull-right btn-sm white" role="button" href="{1}">下载</a>';
					tr2+='    </p>';
					tr2+=' </div>';
					tr2+='</div>  ';
					tr2+='</li>';
					for(var i=0;i<result.length;i++){
						var _obj=result[i];
						if(_obj.material_type=='1'){
							html1+=tr.replace("{0}", _obj.material_name)
									.replace("{2}", _obj.url)
						}else if(_obj.material_type=='0'){
							html2+=tr2.replace("{0}", _obj.material_name)
							.replace("{1}", _obj.url)
						}
					}
					$("#video").html(html1);
					$("#folder").html(html2);
				});
			}
		}

	}();
	window.gointo_class = gointo_class;
}(jQuery));