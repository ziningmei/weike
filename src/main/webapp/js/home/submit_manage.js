(function($) {
	var submit_manage = function() {

		return {
			currentIndex : 0,	// 当前索引
			pageSize : 8,		// 每页记录数
			flag : 0,
			scores:["未批阅","不及格","及格","良好","优秀"],
			
			init : function() {
				teacher.init();
				this.query();
			},
			/**
			 * 查询
			 */
			query : function() {
				var vo = new Object();
				vo.homework_id=submit_manage.getQueryString("id");
				
				maskUtil.showMask("main");
				commonAjax.ajaxPost("submit/listAllByParams.do", vo, function (result) {
					maskUtil.hideMask("main")
					var list = result;
					var html = "";
					var tr="";
					tr += '<tr>';
					tr += '	<td>{0}</td>';
					tr += ' <td>{1}</td>';
					tr += ' <td>{2}</td>';
					tr += ' <td>{6}</td>';
					tr += ' <td>';
					tr += '<button type="button" class="btn btn-primary btn-xs" onclick="submit_manage.download({3});">';
					tr += '<span class="glyphicon glyphicon-download-alt"></span>';
					tr += '</button>&nbsp;';
					tr += '<button type="button" class="btn btn-primary btn-xs" onclick="submit_manage.showEdit({4},{5});">';
					tr += '<span class="glyphicon glyphicon-pencil"></span>';
					tr += '</button>&nbsp;';
					tr += ' </td>';
					tr += '</tr>';
					for (var i = 0; i < list.length; i++) {
						var _obj = list[i];
						html += tr.replace("{0}",i+1)
								  .replace("{1}",_obj.student_name)
								  .replace("{2}",_obj.homework_name)
								  .replace("{3}",_obj.submit_id)
								  .replace("{4}",_obj.submit_id)
								  .replace("{5}",_obj.score)
								  .replace("{6}",submit_manage.scores[Number(_obj.score)]);
					}
					$("#tbody").html(html);
					// 计算页索引
					submit_manage.currentIndex=Math.floor(result.start/result.limit);
					if(result.totalSize%submit_manage.pageSize==0&&result.totalSize/submit_manage.pageSize<index+1){
						index=result.totalSize/submit_manage.pageSize-1;
						submit_manage.query(index);
					}
					// 设置分页
					var option={
						callback: function(index,jq){
							submit_manage.query(index);
						},
						current_page : submit_manage.currentIndex,	 // 当前页索引
						items_per_page : submit_manage.pageSize,    // 每页记录数
						num_edge_entries : 2, 	 			 // 显示首末页
						num_display_entries : 5, 			 // 最多显示的页码数
						load_callback : false,    		     // 初始化时是否执行callback
						prev_text : '上一页',	
						next_text :'下一页'
					};
					$("#pagination").pagination(result.totalSize, option);
				});
			},
			showEdit:function(id,score){
				$("#a_id").val(id);
				$("#score").val(score);
				$("#modal_add").modal("show");
			},
			edit:function(){
				var vo=new Object();
				vo.submit_id=$("#a_id").val();
				vo.score=$("#score").val();
				maskUtil.showMask("main");
				commonAjax.ajaxPost("submit/update.do", vo, function(result){
					if(result.success){
						swal({title:"提示!",text: "成绩修改成功!", type: "success",showCancelButton: false},function(){
							$("#modal_add").modal("hide");
							submit_manage.query();
						});
					}else{
						wal({title:'系统错误请联系管理员！',type:'warning'});
					}
					maskUtil.hideMask("main");
				});
			},
			download:function(id){
				commonAjax.ajaxPost("submit/select.do", id, function(result){
					if(!result.success){
						return;
					}
					window.open(result.data.init_url);
				})
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
	window.submit_manage = submit_manage;
}(jQuery));