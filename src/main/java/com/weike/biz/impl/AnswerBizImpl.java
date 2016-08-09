/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.weike.biz.AnswerBiz;
import com.weike.dao.AnswerDao;

@SuppressWarnings({"unchecked", "rawtypes"})
@Service
class AnswerBizImpl<T, PK> extends BaseBizImpl implements AnswerBiz{

	private AnswerDao answerDao;
	
	@Resource
	public void setAnswerDao(AnswerDao answerDao) {
		super.setBaseDao(answerDao);
		this.answerDao = answerDao;
	}
}