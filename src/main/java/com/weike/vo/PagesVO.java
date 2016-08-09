package com.weike.vo;

/**
 * 计算分页vo
 * @time 2015年9月10日 下午2:41:25
 */
public class PagesVO {

	/** 当前页数 */
	private int pages;

	/** 查询数量 */
	private int count;

	/** 开始row数 */
	private int begin;

	/** 结束的row数 */
	private int end;

	public int getBegin() {
		return begin;
	}

	public void setBegin(int begin) {
		this.begin = begin;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public void getBeginEnd() {
		this.begin = (this.pages - 1) * this.count;
		this.end = this.count;
	}

	/*@Override
	public String toString() {
		return "PagesVO [pages=" + pages + ", count=" + count + ", begin="
				+ begin + ", end=" + end + "]";
	}*/
	
	

}
