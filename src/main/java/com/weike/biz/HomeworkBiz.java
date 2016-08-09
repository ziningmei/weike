package com.weike.biz;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.weike.rvo.HomeworkRVO;
import com.weike.vo.AnswerVO;
import com.weike.vo.HomeworkVO;
import com.weike.vo.ResultVO;
import com.weike.vo.StudentVO;

/**
 * @author Administrator
 *
 */
public interface HomeworkBiz<T,PK> extends BaseBiz<T, PK>{

	List<HomeworkRVO> initHomework(StudentVO studentVO);

	List<HomeworkRVO> getUnsubmitHomework(StudentVO studentVO);
	
	List<HomeworkRVO> getUnsubmitCourse(StudentVO studentVO);

	List<HomeworkRVO> getSubmit(StudentVO studentVO);

	HomeworkRVO checkHomework(HomeworkVO homeworkVO);

	List<HomeworkRVO> getCourseHomework(HomeworkVO homeworkVO);

}
