package com.weike.biz.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.weike.biz.BaseBiz;
import com.weike.dao.BaseDao;
import com.weike.vo.ListRangeEx;

public class BaseBizImpl<T, PK extends Serializable> implements BaseBiz<T, PK> {
	private BaseDao<T, PK> baseDao;

	public BaseDao<T, PK> getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(BaseDao<T, PK> baseDao) {
		this.baseDao = baseDao;
	}

	@Override
	public int insert(T obj) {
		return baseDao.insert(obj);
	}

	@Override
	public int update(T obj) {
		return baseDao.update(obj);
	}

	@Override
	public int delete(PK id) {
		return baseDao.delete(id);
	}

	@Override
	public int batchDelete(PK[] delIds) {
		return baseDao.batchDelete(delIds);
	}
	
	@Override
	public T select(PK id) {
		return baseDao.select(id);
	}
	
	@Override
	public List<T> listAll() {
		return baseDao.listAll(null);
	}

	@Override
	public List<T> listAll(Map<String, Object> params) {
		return baseDao.listAll(params);
	}

	@Override
	public void listPage(ListRangeEx listRangeEx) {
		Map params = listRangeEx.getParams();
		int totalSize = baseDao.listAllRecordsCount(params);
		if (listRangeEx.getLimit() == 0) {
			listRangeEx.setLimit(totalSize);
		}
		List<T> list = baseDao.listPage(listRangeEx);
		listRangeEx.setList(list);
		listRangeEx.setTotalSize(totalSize);
		listRangeEx.setSuccess(true);
	}
}
