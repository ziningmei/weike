package com.weike.biz.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weike.biz.CourseBiz;
import com.weike.dao.CourseDao;
import com.weike.vo.StudentVO;

@SuppressWarnings({"unchecked", "rawtypes"})
@Service
public class CourseBizImpl <T, PK> extends BaseBizImpl implements CourseBiz{
	
	private CourseDao courseDao;
	
	@Resource
	public void setCourseDao(CourseDao courseDao) {
		super.setBaseDao(courseDao);
		this.courseDao = courseDao;
	}
	@Override
	public List getHotCourse() {
		return courseDao.getHotCourse();
	}
	@Override
	public List getMyCourse(StudentVO studentVO) {
		return courseDao.getMyCourse(studentVO);
	}
	@Override
	public List getAllCourse(StudentVO studentVO) {
		return courseDao.getAllCourse(studentVO);
	}
}
