/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weike.biz.HomeworkBiz;
import com.weike.dao.HomeworkDao;
import com.weike.rvo.CourseRVO;
import com.weike.rvo.HomeworkRVO;
import com.weike.vo.HomeworkVO;
import com.weike.vo.StudentVO;
import com.weike.dao.CourseDao;

@SuppressWarnings({ "unchecked", "rawtypes" })
@Service
class HomeworkBizImpl<T, PK> extends BaseBizImpl implements HomeworkBiz {

	private HomeworkDao homeworkDao;
	
	@Resource
	private CourseDao courseDao;

	@Resource
	public void setHomeworkDao(HomeworkDao homeworkDao) {
		super.setBaseDao(homeworkDao);
		this.homeworkDao = homeworkDao;
	}

	@Override
	public List initHomework(StudentVO studentVO) {
		List<CourseRVO> list = courseDao.getMyCourse(studentVO);
		List<HomeworkRVO> homeworkList = new ArrayList<>();
		int count = 0;
		for (int i = 0; i < list.size(); i++) {
			HomeworkRVO rvo = homeworkDao.initHomework(list.get(i));
		}
		return homeworkList;
	}

	@Override
	public List getUnsubmitHomework(StudentVO studentVO) {
		return homeworkDao.getUnsubmitHomework(studentVO);
	}

	@Override
	public List getUnsubmitCourse(StudentVO studentVO) {
		return homeworkDao.getUnsubmitCourse(studentVO);
	}

	@Override
	public List getSubmit(StudentVO studentVO) {
		return homeworkDao.getSubmit(studentVO);
	}

	@Override
	public HomeworkRVO checkHomework(HomeworkVO homeworkVO) {
		int flag=0;
		int isDate = homeworkDao.checkDate(homeworkVO);
		HomeworkRVO rvo = homeworkDao.checkHomework(homeworkVO);
		if (isDate == 1 && rvo == null) {
			flag = 0;
		} else if (homeworkDao.checkScore(homeworkVO) == 1 && rvo != null) {
			flag = 1;
		} else if (isDate == 0 && rvo == null) {
			flag = 2;
		} else if (homeworkDao.checkScore(homeworkVO) == 0 && rvo != null) {
			flag = 3;
		}
		HomeworkRVO vo=new HomeworkRVO();
		vo.setFlag(flag+"");
		if(rvo!=null){
			vo.setSubmit_id(rvo.getSubmit_id());
			vo.setScore(rvo.getScore());
		}
		return vo;
	}
	@Override
	public List<HomeworkRVO> getCourseHomework(HomeworkVO homeworkVO){
		Map params=new HashMap<>();
		params.put("course_id", homeworkVO.getCourse_id());
		List<HomeworkRVO> list=homeworkDao.listAll(params);
		for(int i=0;i<list.size();i++){
			HomeworkVO vo=new HomeworkVO();
			vo.setStudent_id(homeworkVO.getStudent_id());
			vo.setHomework_id(list.get(i).getHomework_id());
			
			HomeworkRVO rvo= checkHomework(vo);
			list.get(i).setFlag(rvo.getFlag());
			list.get(i).setSubmit_id(rvo.getSubmit_id());
		}
		return list;
	}
}