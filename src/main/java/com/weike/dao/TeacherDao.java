package com.weike.dao;

import com.weike.rvo.TeacherRVO;
import com.weike.vo.TeacherVO;

public interface TeacherDao<T, PK> extends BaseDao<T, PK>{

	TeacherRVO teacherLogin(TeacherVO teacherVO);
	
}