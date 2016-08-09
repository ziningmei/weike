/*
 * commonAjax.js
 * Description：共同ajax调用js
 * Creator：CaoJian
 * CreateDate：2014-03-18
 */
(function($) {
	var commonAjax = function() {
		// 2015年10月22日20:27:53
		var ajaxObj = {
				
			defaultOption : {
//				url : "http://120.27.105.153:80/weike/",
				url : "http://localhost:8080/",
//				url : "http://192.168.1.156:8888/weike/",
			},
				
				
			/**
			 * 共同ajax调用 (post) 
			 * 
			 * @param url
			 *            action路径
			 * @param obj
			 *            json格式参数
			 * @param event
			 *            回调函数
			 */
			ajaxPost : function(url, obj, event) {
				$.ajax({
					url : commonAjax.defaultOption.url + url,
					type : "POST",
					contentType : 'application/json;charset=UTF-8',
					dataType : "json",
					data : JSON.stringify(obj),
					timeout : 60000,
					success : function(result) {
						if (!result.success && result.errCode == '1001') {
							window.parent.location.href = commonAjax.defaultOption.url + "500.html";
						} else if (!result.success && result.errCode == '1002') {
							swal({title:"提示!",text: "登录超时，请重新登录!", type: "error",showCancelButton: false},function(){
								window.location.href = commonAjax.defaultOption.url + "html/login.html";
							});
						} else {
							event(result);
						}
					},
					error : function(XmlHttpRequest, textStatus, errorThrown) {
//						if (XmlHttpRequest.status == '404') {
//							window.parent.location.href = commonAjax.defaultOption.url + "404.html";
//						} else if (XmlHttpRequest.status == '500') {
//							window.parent.location.href = commonAjax.defaultOption.url + "500.html";
//						} else if (XmlHttpRequest.status == '200') {
//							var sessionstatus = XmlHttpRequest
//									.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
//							if (sessionstatus == "timeout") {
////								alert("登录超时,请重新登录！");
//								swal({title:"提示!",text: "登录超时，请重新登录!", type: "error",showCancelButton: false},function(){
//									window.location.href = commonAjax.defaultOption.url + "html/login.html";
//								});
//							}
//						}
					}
				});
			},
			
			/**
			 * 微信ajax调用 (post) 
			 * @param url
			 * @param obj
			 * @param event
			 */
			wxajaxPost : function(url, obj, event) {
				$.ajax({
					url : commonAjax.defaultOption.url + url,
					type : "POST",
					contentType : 'application/json;charset=UTF-8',
					dataType : "json",
					data : JSON.stringify(obj),
					timeout : 60000,
					success : function(result) {
						if (!result.success && result.errCode == '1001') {
							window.parent.location.href = commonAjax.defaultOption.url + "wx500.html";
						} else if (!result.success && result.errCode == '1002') {
							swal({title:"提示!",text: "登录超时，请重新登录!", type: "error",showCancelButton: false},function(){
								window.location.href = commonAjax.defaultOption.url + "wxhtml/login.html";
							});
						} else {
							event(result);
						}
					},
					error : function(XmlHttpRequest, textStatus, errorThrown) {
						if (XmlHttpRequest.status == '404') {
							window.parent.location.href = commonAjax.defaultOption.url + "wx404.html";
						} else if (XmlHttpRequest.status == '500') {
							window.parent.location.href = commonAjax.defaultOption.url + "wx500.html";
						} else if (XmlHttpRequest.status == '200') {
							var sessionstatus = XmlHttpRequest
									.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
							if (sessionstatus == "timeout") {
//								alert("登录超时,请重新登录！");
								swal({title:"提示!",text: "登录超时，请重新登录!", type: "error",showCancelButton: false},function(){
									window.location.href = commonAjax.defaultOption.url + "wxhtml/login.html";
								});
							}
						}
					}
				});
			},
			
			/**
			 * 共同ajax调用 ( get )
			 * 
			 * @param url
			 *            action路径
			 * @param type
			 *            类型“post”，“get”
			 * @param obj
			 *            json格式参数
			 * @param event
			 *            回调函数
			 */
			ajaxGet : function(url, obj, event) {
				$.ajax({
					url : commonAjax.defaultOption.url + url + "?json=" + JSON.stringify(obj),
					type : 'GET',
					contentType : 'application/json;charset=UTF-8',
					dataType : "json",
					timeout : 60000,
					success : function(result) {
						if (!result.success && result.errCode == '1001') {
							window.parent.location.href = commonAjax.defaultOption.url + "500.html";
						} else {
							event(result);
						}
					},
					error : function(XmlHttpRequest, textStatus, errorThrown) {
						if (XmlHttpRequest.status == '404') {
							window.parent.location.href = commonAjax.defaultOption.url + "404.html";
						} else if (XmlHttpRequest.status == '500') {
							window.parent.location.href = commonAjax.defaultOption.url + "500.html";
						} else if (XmlHttpRequest.status == '200') {
							var sessionstatus = XmlHttpRequest
									.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
							if (sessionstatus == "timeout") {
								alert("登录超时,请重新登录！");
								// 如果超时就处理 ，指定要跳转的页面
								window.parent.location.href = commonAjax.defaultOption.url + "html/system/login.html";
							}
						}
					}
				});
			}
			
		};
		return ajaxObj;
	}();
	window.commonAjax = commonAjax;
}(jQuery));