package com.weike.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.weike.rvo.CourseRVO;
import com.weike.rvo.HomeworkRVO;
import com.weike.vo.HomeworkVO;
import com.weike.vo.StudentVO;

@Repository
public interface HomeworkDao<T, PK> extends BaseDao<T, PK>{

	HomeworkRVO initHomework(CourseRVO courseRVO);

	List getUnsubmitHomework(StudentVO studentVO);

	List getUnsubmitCourse(StudentVO studentVO);

	List getSubmit(StudentVO studentVO);

	HomeworkRVO checkHomework(HomeworkVO homeworkVO);

	int checkDate(HomeworkVO homeworkVO);

	int checkScore(HomeworkVO homeworkVO);
}