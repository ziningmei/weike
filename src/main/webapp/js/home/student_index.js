(function($) {
	var index = function() {

		return {
			currentIndex : 0, // 当前索引
			pageSize : 6, // 每页记录数
			flag : 0,

			init : function() {
				student.init();
				index.initHomework();
				index.initTheNew();
				index.initHotCourse();
			},

			/**
			 * 查询
			 */
			query : function(index) {
				var params = new Object();
				params.course_name = $.trim($("#course_name").val());

				var vo = new Object();
				vo.start = index * this.pageSize;
				vo.limit = this.pageSize;
				vo.params = params;
				maskUtil.showMask("main");
				commonAjax
						.ajaxPost(
								"course/listPage.do",
								vo,
								function(result) {
									maskUtil.hideMask("main")
									if (!result.success) {
										alert('查询发生错误');
										return;
									}
									var list = result.list;
									var html = "";
									var tr = "";
									tr += '<tr>';
									tr += '	<td>{0}</td>';
									tr += ' <td>{1}</td>';
									tr += ' <td>{2}</td>';
									tr += ' <td>';
									tr += '<button type="button" class="btn btn-primary btn-xs" onclick="index.showEdit({3});">';
									tr += '<span class="glyphicon glyphicon-pencil"></span>';
									tr += '</button>&nbsp;';
									tr += '<button type="button"';
									tr += '	class="btn btn-primary btn-xs btn-danger" onclick="index.delete({3});">';
									tr += '	<span class="glyphicon glyphicon-trash"></span>';
									tr += '</button>   ';
									tr += '<button type="button"';
									tr += '	class="btn btn-primary btn-xs btn-success" onclick="index.show({3});">';
									tr += '	<span class="glyphicon glyphicon-search"></span>';
									tr += '</button>';
									tr += ' </td>';
									tr += '</tr>';
									for (var i = 0; i < list.length; i++) {
										var _obj = list[i];
										html += tr.replace("{0}",
												i + index * index.pageSize)
												.replace("{1}",
														_obj.course_name)
												.replace("{2}",
														_obj.course_describe)
												.replace("{3}", _obj.course_id)
												.replace("{4}", _obj.course_id)
												.replace("{5}", _obj.course_id);
									}
									$("#tbody").html(html);
									// 计算页索引
									index.currentIndex = Math
											.floor(result.start / result.limit);
									// 设置分页
									var option = {
										callback : function(index, jq) {
											index.query(index);
										},
										current_page : index.currentIndex, // 当前页索引
										items_per_page : index.pageSize, // 每页记录数
										num_edge_entries : 2, // 显示首末页
										num_display_entries : 5, // 最多显示的页码数
										load_callback : false, // 初始化时是否执行callback
										prev_text : '上一页',
										next_text : '下一页'
									};
									$("#pagination").pagination(
											result.totalSize, option);
								});
			},
			initHomework : function() {
				var vo = new Object();
				vo.student_id = sessionStorage.getItem("student_id");
				maskUtil.showMask("main");
				commonAjax.ajaxPost("homework/getUnsubmitCourse.do", vo, function(
						result) {
					maskUtil.hideMask("main")

					var html = "";
					var tr = "";
					tr += '<li class="news-item">';
					tr += '<table cellpadding="4">';
					tr += '<tr>';
					tr += '<td><img src="../../images/{0}.png" width="60"';
					tr += 'class="img-circle" /></td>';
					tr += '<td>你的《{1}》课程有作业未完成！ <a href="gointo_class.html?id={2}"';
					tr += '	class="pull-right">查看</a></td>';
					tr += '</tr>';
					tr += '</table>';
					tr += '</li>';
					for (var i = 0; i < result.length; i++) {
						var _obj = result[i];
						html += tr.replace("{0}", i % 5 + 1)
								.replace("{1}",_obj.course_name)
								.replace("{2}",_obj.course_id);
					}
					$("#homework_body").html(html);
					$(".demo1").bootstrapNews({
						newsPerPage : 4,
						autoplay : true,
						pauseOnHover : true,
						direction : 'up',
						newsTickerInterval : 4000,
						onToDo : function() {
							// console.log(this);
						}
					});
				});
			},
			initTheNew : function() {
				var vo = new Object();
				vo.start = 0;
				vo.limit = 6;

				maskUtil.showMask("main");
				commonAjax
						.ajaxPost(
								"course/listPage.do",
								vo,
								function(result) {
									maskUtil.hideMask("main")
									var list = result.list;
									var html = "";
									var tr = "";
									tr += '<li class="news-item"><b>《{0}》</b>{1} <a';
									tr += ' href="gointo_class.html?id={2}" class="pull-right">进入</a></li>';
									for (var i = 0; i < list.length; i++) {
										var _obj = list[i];
										html += tr.replace("{0}",
												_obj.course_name).replace(
												"{1}", _obj.teacher_name)
												.replace("{2}", _obj.course_id);
									}
									$("#course_body").html(html);
									$(".demo2").bootstrapNews({
										newsPerPage : 5,
										autoplay : true,
										pauseOnHover : true,
										navigation : false,
										direction : 'down',
										newsTickerInterval : 2500,
										onToDo : function() {
											// console.log(this);
										}
									});
								});
			},
			initHotCourse : function() {
				var vo = new Object();

				maskUtil.showMask("main");
				commonAjax
						.ajaxPost(
								"course/getHotCourse.do",
								"",
								function(result) {
									maskUtil.hideMask("main")
									var list = result;
									var html = "";
									var tr = "";
									tr += '<li class="news-item"><b>《{0}》</b>{1} <a';
									tr += ' href="gointo_class.html?id={2}" class="pull-right">学习</a></li>';
									var tbody = "";
									tbody += '<div class="col-md-3">';
									tbody += '<div class="course_img">';
									tbody += '<a href="gointo_class.html?id={0}"><img class=""';
									tbody += 'src="{1}" alt="chrome"></a>';
									tbody += '</div>';
									tbody += '<div class="course_info clearfix shadow">';
									tbody += '<h4 class="mb5">{2}</h4>';
									tbody += '<p>';
									tbody += '<span class="pull-left color-gray">{3}</span>';
									tbody += '<span class="pull-right color-gray">{4}人学习</span>';
									tbody += '</p>';
									tbody += '</div>';
									tbody += '</div>';
									var html1 = "";
									for (var i = 0; i < list.length; i++) {
										var _obj = list[i];
										html += tr.replace("{0}",
												_obj.course_name).replace(
												"{1}", _obj.teacher_name)
												.replace("{2}", _obj.course_id);
										html1 += tbody.replace("{0}",
												_obj.course_id).replace("{1}",
												_obj.img).replace("{2}",
												_obj.course_name).replace(
												"{3}", _obj.teacher_name)
												.replace("{4}", _obj.count);
									}
									$("#demo3").html(html);
									$("#course").html(html1);
									$("#demo3").bootstrapNews({
										newsPerPage : 5,
										autoplay : false,
										onToDo : function() {
											// console.log(this);
										}
									});
									// 首页移上去图片放大
									$("#course").find("img").hover(function() {
										good_w = $(this).width();
										good_h = $(this).height();
										$(this).stop(true, true).animate({
											width : good_w * 1.2,
											height : good_h * 1.2,
											left : -good_w * 0.1,
											top : -good_h * 0.1
										});
									}, function() {
										$(this).stop(true, true).animate({
											width : good_w,
											height : good_h,
											left : 0,
											top : 0
										})
									})
								});
				// 轮播
				$('#ad-carousel').carousel();
			},
		}

	}();
	window.index = index;
}(jQuery));