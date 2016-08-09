package com.weike.controller;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.CourseBiz;
import com.weike.global.GlobalContract;
import com.weike.rvo.CourseRVO;
import com.weike.util.Base64Util;
import com.weike.vo.ResultMessage;
import com.weike.vo.StudentVO;

@Controller
@RequestMapping("/course")
public class CourseAction extends BaseAction<CourseRVO, Integer> {

	private CourseBiz courseBiz;

	@Autowired
	public void setCourseBiz(CourseBiz courseBiz) {
		super.setBaseBiz(courseBiz);
		this.courseBiz = courseBiz;
	}
	
	@RequestMapping("/insert")
	@Override
	public void insert(@RequestBody CourseRVO obj, HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		String img_base64 = obj.getImg();
		if (img_base64.length()<100) {
		} else {
			// 图片保存路径
			String filePath = GlobalContract.FILEPATH_URL+GlobalContract.UPLOAD_IMAGE;
			File dir = new File(filePath);
			if (!dir.exists()) {
				dir.mkdirs();
			}
			String fileFormat = ".".concat(img_base64.substring(11,
					img_base64.indexOf(";")));
			String fileData = img_base64.substring(img_base64.indexOf(",") + 1);
			String fileName = Base64Util.getfileName().concat(fileFormat);
			try {
				Base64Util.decodeFile(fileData, filePath.concat(fileName));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			obj.setImg(fileName);
		}
		int result = courseBiz.insert(obj);
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(result == 1);
		resMsg.setData(result == 1);
		resMsg.setMessage(result == 1 ? "新增成功。" : "新增失败。");
		printWriterFromObject(response, resMsg);
	}
	
	@Override
	public void select(@RequestBody Integer id, HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		CourseRVO obj = (CourseRVO) courseBiz.select(id);
		obj.setImg(GlobalContract.APACHE_URL.concat(GlobalContract.UPLOAD_IMAGE).concat(obj.getImg()));
		ResultMessage resMsg = new ResultMessage();
		resMsg.setSuccess(obj != null);
		resMsg.setData(obj);
		resMsg.setMessage(obj != null ? "查询成功。" : "查询失败。");
		printWriterFromObject(response, resMsg);
	}
	
	@RequestMapping("/getHotCourse")
	public void getHotCourse(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<CourseRVO> list = courseBiz.getHotCourse();
		for(int i=0;i<list.size();i++){
			list.get(i).setImg(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_IMAGE.concat(list.get(i).getImg()));
		}
		printWriterFromList(response, list);
	}
	
	@RequestMapping("/getMyCourse")
	public void getMyCourse(@RequestBody StudentVO studentVO,HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<CourseRVO> list = courseBiz.getMyCourse(studentVO);
		for(int i=0;i<list.size();i++){
			list.get(i).setImg(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_IMAGE.concat(list.get(i).getImg()));
		}
		printWriterFromList(response, list);
	}
	
	@RequestMapping("/getAllCourse")
	public void getAllCourse(@RequestBody StudentVO studentVO,HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		List<CourseRVO> list = courseBiz.getAllCourse(studentVO);
		for(int i=0;i<list.size();i++){
			list.get(i).setImg(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_IMAGE.concat(list.get(i).getImg()));
		}
		printWriterFromList(response, list);
	}
}
