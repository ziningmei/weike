package com.weike.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.BaseBiz;
import com.weike.vo.ListRangeEx;
import com.weike.vo.ResultMessage;

@Controller
public class BaseAction<T, PK> extends BaseController {
	protected static final Logger LOGGER = Logger.getLogger(BaseAction.class);
	
	private BaseBiz<T, PK> baseBiz;
	
    public BaseBiz<T, PK> getBaseBiz() {
		return baseBiz;
	}

	public void setBaseBiz(BaseBiz<T, PK> baseBiz) {
		this.baseBiz = baseBiz;
	}
	
	@RequestMapping("/listAll")
	public void listAll(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<T> list = baseBiz.listAll();
		printWriterFromList(response, list);
	}

	@RequestMapping("/listAllByParams")
	public void listAllByParams(@RequestBody Map<String, Object> params, 
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		System.out.println(params.toString());
		List<T> list = baseBiz.listAll(params);
		printWriterFromList(response, list);
	}
	
	@RequestMapping("/listPage")
	public void listPage(@RequestBody ListRangeEx listRangeEx, 
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		System.out.println(listRangeEx.getStart());
		baseBiz.listPage(listRangeEx);
		printWriterFromObject(response, listRangeEx);
	}

	@RequestMapping("/insert")
	public void insert(@RequestBody T obj,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		int result = baseBiz.insert(obj);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(result == 1);
		resMsg.setData(result == 1);
		resMsg.setMessage(result == 1 ? "新增成功。" : "新增失败。");
		printWriterFromObject(response, resMsg);
	}

	@RequestMapping("/update")
	public void update(@RequestBody T obj,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		int result = baseBiz.update(obj);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(result == 1);
		resMsg.setData(result == 1);
		resMsg.setMessage(result == 1 ? "更新成功。" : "更新失败。");
		printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping("/select")
	public void select(@RequestBody PK id,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		T obj = baseBiz.select(id);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(obj != null);
		resMsg.setData(obj);
		resMsg.setMessage(obj != null ? "查询成功。" : "查询失败。");
		printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping("/delete")
	public void delete(@RequestBody PK id,
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		int result = baseBiz.delete(id);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(result == 1);
		resMsg.setData(result == 1);
		resMsg.setMessage(result == 1 ? "删除成功。" : "删除失败。");
		printWriterFromObject(response, resMsg);
	}

	@RequestMapping("/batchDelete")
	public void batchDelete(@RequestBody PK[] delIds, 
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		int result = baseBiz.batchDelete(delIds);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(result >= 1);
		resMsg.setData(result >= 1);
		resMsg.setMessage(result == 1 ? "删除成功。" : "删除失败。");
		printWriterFromObject(response, resMsg);
	}
}
