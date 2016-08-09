/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.weike.biz.SubmitBiz;
import com.weike.dao.SubmitDao;

@SuppressWarnings({ "unchecked", "rawtypes" })
@Service
class SubmitBizImpl<T, PK> extends BaseBizImpl implements SubmitBiz {

	private SubmitDao submitDao;

	@Resource
	public void setSubmitDao(SubmitDao submitDao) {
		super.setBaseDao(submitDao);
		this.submitDao = submitDao;
	}
}