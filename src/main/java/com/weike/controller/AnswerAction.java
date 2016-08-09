package com.weike.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.AnswerBiz;
import com.weike.rvo.AnswerRVO;

@Controller
@RequestMapping(value = "answer", produces = { "application/json;charset=UTF-8" })
public class AnswerAction extends BaseAction<AnswerRVO, Integer> {

	private AnswerBiz answerBiz;

	@Autowired
	public void setAnswerBiz(AnswerBiz answerBiz) {
		super.setBaseBiz(answerBiz);
		this.answerBiz = answerBiz;
	}
}
