package com.weike.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.QuestionBiz;
import com.weike.rvo.QuestionRVO;
import com.weike.vo.ListRangeEx;

@Controller
@RequestMapping(value = "question", produces = { "application/json;charset=UTF-8" })
public class QuestionAction extends BaseAction<QuestionRVO, Integer> {

	private QuestionBiz questionBiz;

	@Autowired
	public void setQuestionBiz(QuestionBiz questionBiz) {
		super.setBaseBiz(questionBiz);
		this.questionBiz = questionBiz;
	}
	
	@RequestMapping("/getMyQuestion")
	public void getMyQuestion(@RequestBody Integer student_id , 
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<QuestionRVO> list=questionBiz.getMyQuestion(student_id);
		printWriterFromList(response, list);
	}
	
	@RequestMapping("/getQuestionInfo")
	public void getQuestionInfo(@RequestBody Integer question_id , 
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		QuestionRVO questionRVO=questionBiz.getQuestionInfo(question_id);
		printWriterFromObject(response, questionRVO);
	}
}
