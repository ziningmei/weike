package com.weike.dao;

import com.weike.rvo.StudentRVO;
import com.weike.vo.StudentVO;

public interface StudentDao <T, PK> extends BaseDao<T, PK>{
	
	public StudentRVO studentLogin(StudentVO studentVO);

	public StudentRVO selectStuNo(StudentVO studentVO);

}
