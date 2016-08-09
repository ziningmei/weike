package com.weike.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.weike.biz.TeacherBiz;
import com.weike.global.GlobalContract;
import com.weike.rvo.StudentRVO;
import com.weike.rvo.TeacherRVO;
import com.weike.vo.ResultMessage;
import com.weike.vo.StudentVO;
import com.weike.vo.TeacherVO;

@Controller
@RequestMapping(value = "teacher", produces = { "application/json;charset=UTF-8" })
public class TeacherAction extends BaseAction<TeacherRVO, Integer> {

	private TeacherBiz teacherBiz;

	@Autowired
	public void setTeacherBiz(TeacherBiz teacherBiz) {
		super.setBaseBiz(teacherBiz);
		this.teacherBiz = teacherBiz;
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public void studentLogin(HttpSession session, HttpServletRequest request,HttpServletResponse response,
			@RequestBody TeacherVO teacherVO) {
			TeacherRVO teacherRVO = teacherBiz.teacherLogin(teacherVO, session);
			if(teacherRVO!=null){
				session.setAttribute(GlobalContract.TEACHER, teacherRVO);
			}
			ResultMessage resMsg = new ResultMessage();
			resMsg.setSuccess(teacherRVO != null);
			resMsg.setData(teacherRVO);
			resMsg.setMessage(teacherRVO != null ? "登录成功。" : "登录失败。");
			printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public void studentLogout(HttpSession session,HttpServletResponse response) {

			// 删除登录的用户信息
			session.removeAttribute(GlobalContract.TEACHER);
			ResultMessage resMsg = new ResultMessage();
			resMsg.setSuccess(true);
			resMsg.setMessage(session.getAttribute(GlobalContract.TEACHER) == null ? "退出成功。" : "退出失败。");
			printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping(value = "/initTeacher", method = RequestMethod.POST)
	public void initTeacher(HttpSession session,HttpServletResponse response) {
		
		TeacherRVO teacherRVO=(TeacherRVO) session.getAttribute(GlobalContract.TEACHER);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(teacherRVO != null);
		resMsg.setData(teacherRVO);
		resMsg.setMessage(teacherRVO != null ? "加载成功" : "加载失败。");
		printWriterFromObject(response, resMsg);
	}
}
