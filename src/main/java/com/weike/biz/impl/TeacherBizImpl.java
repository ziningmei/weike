/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.weike.biz.TeacherBiz;
import com.weike.dao.TeacherDao;
import com.weike.rvo.TeacherRVO;
import com.weike.vo.StudentVO;
import com.weike.vo.TeacherVO;

@SuppressWarnings({ "unchecked", "rawtypes" })
@Service
class TeacherBizImpl<T, PK> extends BaseBizImpl implements TeacherBiz {

	private TeacherDao teacherDao;

	@Resource
	public void setTeacherDao(TeacherDao teacherDao) {
		super.setBaseDao(teacherDao);
		this.teacherDao=teacherDao;
		
	}

	@Override
	public TeacherRVO teacherLogin(TeacherVO teacherVO, HttpSession session) {
		return teacherDao.teacherLogin(teacherVO);
	}
	
	
}