(function($) {
	var center_myquestion = function() {

		return {
			currentcenter_myhomework : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,

			init : function() {
				student.init();
				center_myquestion.initMyQuestion();
				center_myquestion.initMyAnswer();
			},
			initMyQuestion:function(){
				var vo=new Object();
				vo.user_id=sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("question/listAllByParams.do", vo,function(result){
					var str ="";
					var html="";
					str+='<li>';
					str+=' <p class="clearfix">';
					str+='<span class="name pull-left">我：</span>';
					str+=' <span class="question_tit pull-left">{0}</span>';
					str+=' <a class="btn btn-info pull-right btn-sm white" role="button" onclick="center_myquestion.showDetail({1})">查看</a>';
					str+='</p>';
					str+='</li>';
					var list =result;
					for(var i=0;i<list.length;i++){
						var _obj=list[i];
						html+=str.replace("{0}", _obj.question_name)
								.replace("{1}", _obj.question_id);
					}
					$("#myQuestion").html(html);
					maskUtil.hideMask("main");
				});
			},
			initMyAnswer:function(){
				var vo=new Object();
				vo.user_id=sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("answer/listAllByParams.do", vo,function(result){
					var str ="";
					var html="";
					str+='<li>';
					str+='<p class="clearfix">';
					str+='<span class="name pull-left">我：</span> <span';
					str+='class="question_tit pull-left">{0}</span>';
					str+='<a class="btn btn-info pull-right btn-sm white" role="button"';
					str+='	href="#" data-toggle="modal" onclick="center_myquestion.showDetail({1})">查看</a>';
					str+='</p>';
					str+='</li>';
					var list =result;
					for(var i=0;i<list.length;i++){
						var _obj=list[i];
						html+=str.replace("{0}", _obj.answer_content)
						.replace("{1}", _obj.question_id);
					}
					$("#myAnswer").html(html);
					maskUtil.hideMask("main");
				});
			},
			showDetail:function(id){
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
			}
		}

	}();
	window.center_myquestion = center_myquestion;
}(jQuery));