/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import com.weike.biz.StudentBiz;
import com.weike.dao.StudentDao;
import com.weike.rvo.StudentRVO;
import com.weike.vo.StudentVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

@SuppressWarnings({ "unchecked", "rawtypes" })
@Service
class StudentBizImpl<T, PK> extends BaseBizImpl  implements StudentBiz{

	private StudentDao studentDao;

	@Resource
	public void setStudentDao(StudentDao studentDao) {
		super.setBaseDao(studentDao);
		this.studentDao = studentDao;
	}

	@Override
	public StudentRVO studentLogin(StudentVO studentVO, HttpSession session) {
		return studentDao.studentLogin(studentVO);
	}
	
	@Override
	public StudentRVO selectStuNo(StudentVO studentVO, HttpSession session) {
		return studentDao.selectStuNo(studentVO);
	}

}