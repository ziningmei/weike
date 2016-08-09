package com.weike.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.SubmitBiz;
import com.weike.global.GlobalContract;
import com.weike.rvo.SubmitRVO;
import com.weike.vo.ResultMessage;

@Controller
@RequestMapping(value = "submit", produces = { "application/json;charset=UTF-8" })
public class SubmitAction extends BaseAction<SubmitRVO, Integer> {

	private SubmitBiz submitBiz;

	@Autowired
	public void setSubmitBiz(SubmitBiz submitBiz) {
		super.setBaseBiz(submitBiz);
		this.submitBiz = submitBiz;
	}
	
	@Override
	public void select(@RequestBody Integer id,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		SubmitRVO obj = (SubmitRVO) submitBiz.select(id);
		obj.setInit_url(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_FOLDER+obj.getInit_url());
		obj.setResult_url(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_FOLDER+obj.getResult_url());
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(obj != null);
		resMsg.setData(obj);
		resMsg.setMessage(obj != null ? "查询成功。" : "查询失败。");
		printWriterFromObject(response, resMsg);
	}
}
