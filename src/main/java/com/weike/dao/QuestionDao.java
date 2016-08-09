package com.weike.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.weike.rvo.QuestionRVO;

@Repository
public interface QuestionDao<T, PK> extends BaseDao<T, PK>{

	List<QuestionRVO> getList(Integer student_id);
	/**
	 * @author jq
	 * @time 2016年3月1日  下午3:37:21
	 */

	QuestionRVO getQuestionInfo(Integer homwork_id);
}