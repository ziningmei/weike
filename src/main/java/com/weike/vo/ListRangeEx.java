package com.weike.vo;

import java.util.HashMap;
import java.util.Map;

/**
 * 通用数据存取类(带参数)
 * @function 通用数据存取类，提供按起止条数查询记录的相关参数及返回值
 */
public class ListRangeEx extends ListRange {
	private Map params;
	private Map returnMap;

	public ListRangeEx() {
		super();
		this.params = new HashMap();
		this.returnMap = new HashMap();
	}

	public Map getParams() {
		return params;
	}

	public void setParams(Map params) {
		this.params = params;
	}

    public Map getReturnMap() {
        return returnMap;
    }

    public void setReturnMap(Map returnMap) {
        this.returnMap = returnMap;
    }
}
