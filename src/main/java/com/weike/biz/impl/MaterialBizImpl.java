/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.weike.biz.MaterialBiz;
import com.weike.dao.MaterialDao;

@SuppressWarnings({ "unchecked", "rawtypes" })
@Service
class MaterialBizImpl<T, PK> extends BaseBizImpl implements MaterialBiz {

	private MaterialDao materialDao;

	@Resource
	public void setMaterialDao(MaterialDao materialDao) {
		super.setBaseDao(materialDao);
		this.materialDao = materialDao;
	}
}