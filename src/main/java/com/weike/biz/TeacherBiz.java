package com.weike.biz;

import javax.servlet.http.HttpSession;

import com.weike.rvo.TeacherRVO;
import com.weike.vo.TeacherVO;

/**
 * @author Administrator
 *
 */
public interface TeacherBiz<T,PK> extends BaseBiz<T, PK>{

	TeacherRVO teacherLogin(TeacherVO teacherVO, HttpSession session);

}
