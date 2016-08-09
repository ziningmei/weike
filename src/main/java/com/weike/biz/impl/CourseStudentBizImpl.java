/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weike.biz.CourseStudentBiz;
import com.weike.dao.CourseStudentDao;
import com.weike.dao.CourseDao;

@SuppressWarnings({"unchecked", "rawtypes"})
@Service
class CourseStudentBizImpl<T, PK> extends BaseBizImpl implements CourseStudentBiz{

	private CourseStudentDao courseStudentDao;
	
	@Resource
	public void setCourseStudentDao(CourseStudentDao courseStudentDao) {
		super.setBaseDao(courseStudentDao);
		this.courseStudentDao = courseStudentDao;
	}
}