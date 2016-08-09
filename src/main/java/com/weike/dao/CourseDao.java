package com.weike.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.weike.vo.StudentVO;

@Repository
public interface CourseDao<T, PK> extends BaseDao<T, PK>{

	List getHotCourse();

	List getMyCourse(StudentVO studentVO);

	List getAllCourse(StudentVO studentVO);
}
