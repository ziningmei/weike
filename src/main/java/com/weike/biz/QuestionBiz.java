package com.weike.biz;

import java.util.List;

import com.weike.rvo.QuestionRVO;

/**
 * @author Administrator
 *
 */
public interface QuestionBiz<T,PK> extends BaseBiz<T, PK>{

	List<QuestionRVO> getMyQuestion(Integer student_id);

	QuestionRVO getQuestionInfo(Integer questionId);

}
