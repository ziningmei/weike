package com.weike.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.HomeworkBiz;
import com.weike.rvo.HomeworkRVO;
import com.weike.vo.HomeworkVO;
import com.weike.vo.StudentVO;

@Controller
@RequestMapping(value = "homework", produces = { "application/json;charset=UTF-8" })
public class HomeworkAction extends BaseAction<HomeworkRVO, Integer> {

	private HomeworkBiz homeworkBiz;

	@Autowired
	public void setHomeworkBiz(HomeworkBiz homeworkBiz) {
		super.setBaseBiz(homeworkBiz);
		this.homeworkBiz = homeworkBiz;
	}
	
	@RequestMapping("/getUnsubmitHomework")
	public void getUnsubmitHomework(@RequestBody StudentVO studentVO,HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<HomeworkRVO> list = homeworkBiz.getUnsubmitHomework(studentVO);
		printWriterFromList(response, list);
	}
	
	@RequestMapping("/getUnsubmitCourse")
	public void getUnsubmitCourse(@RequestBody StudentVO studentVO,HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<HomeworkRVO> list = homeworkBiz.getUnsubmitCourse(studentVO);
		printWriterFromList(response, list);
	}
	
	@RequestMapping("/getSubmit")
	public void getSubmit(@RequestBody StudentVO studentVO,HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<HomeworkRVO> list = homeworkBiz.getSubmit(studentVO);
		printWriterFromList(response, list);
	}
	/**
	 * 判断作业状态， 0 未提交，1，已提交，2，已过期，3查看成绩
	 */
	@RequestMapping("/checkHomework")
	public void checkHomework(@RequestBody HomeworkVO homeworkVO,HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		HomeworkRVO rvo = homeworkBiz.checkHomework(homeworkVO);
		printWriterFromObject(response, rvo);
	}
	
	@RequestMapping("/getCourseHomework")
	public void getCourseHomework(@RequestBody HomeworkVO homeworkVO,HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<HomeworkRVO> rvo = homeworkBiz.getCourseHomework(homeworkVO);
		printWriterFromList(response, rvo);
	}
}
