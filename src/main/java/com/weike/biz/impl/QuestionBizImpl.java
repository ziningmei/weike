/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.weike.biz.QuestionBiz;
import com.weike.dao.AnswerDao;
import com.weike.dao.QuestionDao;
import com.weike.rvo.AnswerRVO;
import com.weike.rvo.QuestionRVO;

@SuppressWarnings({ "unchecked", "rawtypes" })
@Service
class QuestionBizImpl<T, PK> extends BaseBizImpl implements QuestionBiz {

	private QuestionDao questionDao;
	
	@Resource
	private AnswerDao answerDao;

	@Resource
	public void setQuestionDao(QuestionDao questionDao) {
		super.setBaseDao(questionDao);
		this.questionDao = questionDao;
	}

	public List getMyQuestion(Integer student_id) {
		List<QuestionRVO> list=questionDao.getList(student_id);
		for(int i=0;i<list.size();i++){
			List<AnswerRVO> rvo=answerDao.getList(Integer.parseInt(list.get(i).getQuestion_id()));
			list.get(i).setList(rvo);
		}
		return list;
	}
	
	public QuestionRVO getQuestionInfo(Integer question_id) {
		QuestionRVO rvo=(QuestionRVO) questionDao.select(question_id);
		List<AnswerRVO> answerRVO=answerDao.getList(Integer.parseInt(rvo.getQuestion_id()));
		rvo.setList(answerRVO);
		return rvo;
	}
}