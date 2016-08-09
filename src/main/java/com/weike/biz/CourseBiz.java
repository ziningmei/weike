package com.weike.biz;

import java.util.List;

import com.weike.rvo.CourseRVO;
import com.weike.vo.StudentVO;

/**
 * @author jq
 * @time 2016年3月1日  下午3:33:37
 */
public interface CourseBiz<T, PK> extends BaseBiz<T, PK>{

	List<CourseRVO> getHotCourse();

	List<CourseRVO> getMyCourse(StudentVO studentVO);

	List<CourseRVO> getAllCourse(StudentVO studentVO);
	
}
