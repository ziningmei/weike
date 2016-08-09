package com.weike.vo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.CollectionUtils;

/**
 * 通用数据存取类
 * @function 通用数据存取类，提供按起止条数查询记录的相关参数及返回值
 */
public class ListRange {
	private boolean success;
	private String message;
	private int totalSize;
	private List list;
	private int start;
	private int limit;

	public ListRange() {
		this.totalSize = 0;
		this.list = new ArrayList();
	}
	
	public ListRange(List list) {
		if (CollectionUtils.isEmpty(list)) {
			return;
		}
		
		this.success = true;
		this.totalSize = list.size();
		this.list = list;
		this.start = 0;
		this.limit = list.size();
	}

	/**
	 * 获取总记录数
	 * @return 总记录条数
	 */
	public int getTotalSize() {
		return totalSize;
	}

	/**
	 * 设置总记录数
	 * @param totalSize 总记录条数
	 */
	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}

	/**
	 * 获取数据列表
	 * @return 数据列表
	 */
	public List getList() {
		return list;
	}

	/**
	 * 设置数据列表
	 * @param list 数据列表
	 */
	public void setList(List list) {
		this.list = list;
	}

	/**
	 * 是否成功标识
	 * @return 成功标识
	 */
	public boolean isSuccess() {
		return success;
	}

	/**
	 * 设置是否成功标识
	 * @param success 成功标识
	 */
	public void setSuccess(boolean success) {
		this.success = success;
	}

	/**
	 * 获取提示信息
	 * @return 提示信息
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * 设置提示信息
	 * @param message 提示信息
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * 获取查询记录开始条数
	 * @return 开始条数
	 */
	public int getStart() {
		return start;
	}

	/**
	 * 设置开始条数
	 * @param start 开始条数
	 */
	public void setStart(int start) {
		this.start = start;
	}

	/**
	 * 获取查询记录的条数
	 * @return 查询条数
	 */
	public int getLimit() {
		return limit;
	}

	/**
	 * 设置查询记录条数
	 * @param limit 查询条数
	 */
	public void setLimit(int limit) {
		this.limit = limit;
	}
}
