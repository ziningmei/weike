package com.weike.biz;

import java.util.List;
import java.util.Map;

import com.weike.vo.ListRangeEx;

public interface BaseBiz<T, PK> {
	/**
	 * 新增
	 * @param obj 对象
	 * @return 影响行数
	 */
	int insert(T obj);
	
	/**
	 * 更新
	 * @param obj 对象
	 * @return 影响行数
	 */
	int update(T obj);
	
	/**
	 * 删除 
	 * @param id 主键
	 * @return 影响行数
	 */
	int delete(PK id);
	
	/**
	 * 批量删除
	 * @param delIds 主键数组
	 * @return 影响行数
	 */
	int batchDelete(PK[] delIds);
	
	/**
	 * 根据主键获取单条记录
	 * @param id 主键
	 * @return 单条记录
	 */
	T select(PK id);
	
	/**
	 * 获取所有数据
	 * @return 数据集合
	 */
	List<T> listAll();
	
	/**
	 * 获取所有数据，如果有条件则带参数条件
	 * @param params 条件
	 * @return 数据集合
	 */
	List<T> listAll(Map<String, Object> params);
	
	/**
	 * 分页获取数据，如果有条件则带参数条件
	 * @param listRangeEx 分页对象
	 */
	void listPage(ListRangeEx listRangeEx);
}
