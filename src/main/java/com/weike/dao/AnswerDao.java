package com.weike.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.weike.rvo.AnswerRVO;
import com.weike.rvo.QuestionRVO;

@Repository
public interface AnswerDao<T, PK> extends BaseDao<T, PK>{
	/**
	 * @author jq
	 * @time 2016年3月1日  下午3:37:21
	 */
	List<AnswerRVO> getList(Integer question_id);
}