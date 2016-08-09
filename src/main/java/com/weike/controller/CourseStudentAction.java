package com.weike.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.CourseStudentBiz;
import com.weike.rvo.CourseStudentRVO;

@Controller
@RequestMapping(value = "courseStudent", produces = { "application/json;charset=UTF-8" })
public class CourseStudentAction extends BaseAction<CourseStudentRVO, Integer> {

	private CourseStudentBiz courseStudentBiz;

	@Autowired
	public void setCourseStudentBiz(CourseStudentBiz courseStudentBiz) {
		super.setBaseBiz(courseStudentBiz);
		this.courseStudentBiz = courseStudentBiz;
	}
}
