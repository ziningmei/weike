package com.weike.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.weike.biz.StudentBiz;
import com.weike.global.GlobalContract;
import com.weike.rvo.StudentRVO;
import com.weike.vo.ResultMessage;
import com.weike.vo.StudentVO;

@Controller
@RequestMapping(value = "student", produces = { "application/json;charset=UTF-8" })
public class StudentAction extends BaseAction<StudentRVO, Integer> {
	
	private StudentBiz studentBiz;

	@Autowired
	public void setStudentBiz(StudentBiz studentBiz) {
		super.setBaseBiz(studentBiz);
		this.studentBiz = studentBiz;
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public void studentLogin(HttpSession session, HttpServletRequest request,HttpServletResponse response,
			@RequestBody StudentVO studentVO) {
			StudentRVO studentRVO = studentBiz.studentLogin(studentVO, session);
			if(studentRVO!=null){
				session.setAttribute(GlobalContract.STUDENT, studentRVO);
			}
			ResultMessage resMsg = new ResultMessage();
			resMsg.setSuccess(studentRVO != null);
			resMsg.setData(studentRVO);
			resMsg.setMessage(studentRVO != null ? "登录成功。" : "登录失败。");
			printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public void studentLogout(HttpSession session,HttpServletResponse response) {

			// 删除登录的用户信息
			session.removeAttribute(GlobalContract.STUDENT);
			ResultMessage resMsg = new ResultMessage();
			resMsg.setSuccess(true);
			resMsg.setMessage(session.getAttribute(GlobalContract.STUDENT) == null ? "退出成功。" : "退出失败。");
			printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping(value = "/initStudent", method = RequestMethod.POST)
	public void initStudent(HttpSession session,HttpServletResponse response) {
		
		StudentRVO studentRVO=(StudentRVO) session.getAttribute(GlobalContract.STUDENT);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(studentRVO != null);
		resMsg.setData(studentRVO);
		resMsg.setMessage(studentRVO != null ? "加载成功" : "加载失败。");
		printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping(value = "/selectStuNo", method = RequestMethod.POST)
	public void selectStuNo(HttpSession session, HttpServletRequest request,HttpServletResponse response,
			@RequestBody StudentVO studentVO) {
			StudentRVO studentRVO = studentBiz.selectStuNo(studentVO, session);
			if(studentRVO!=null){
				session.setAttribute(GlobalContract.STUDENT, studentRVO);
			}
			ResultMessage resMsg = new ResultMessage();
			resMsg.setSuccess(studentRVO == null);
			resMsg.setData(studentRVO);
			resMsg.setMessage(studentRVO == null ? "学号不存在。" : "学号已存在。");
			printWriterFromObject(response, resMsg);
	}
}
