package com.weike.rvo;

import java.util.List;

import com.weike.vo.AnswerVO;

public class QuestionRVO {
	private String question_id;
	private String question_name;
	private String question_content;
	private String course_id;
	private String user_id;
	private String updatetime;
	private String delflag;
	private String course_name;
	private String student_name;
	private List<AnswerRVO> list;
	@Override
	public String toString() {
		return "QuestionRVO [question_id=" + question_id + ", question_name="
				+ question_name + ", question_content=" + question_content
				+ ", course_id=" + course_id + ", user_id=" + user_id
				+ ", updatetime=" + updatetime + ", delflag=" + delflag
				+ ", course_name=" + course_name + "]";
	}
	public String getQuestion_id() {
		return question_id;
	}
	public void setQuestion_id(String question_id) {
		this.question_id = question_id;
	}
	public String getQuestion_name() {
		return question_name;
	}
	public void setQuestion_name(String question_name) {
		this.question_name = question_name;
	}
	public String getQuestion_content() {
		return question_content;
	}
	public void setQuestion_content(String question_content) {
		this.question_content = question_content;
	}
	public String getCourse_id() {
		return course_id;
	}
	public void setCourse_id(String course_id) {
		this.course_id = course_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	public String getDelflag() {
		return delflag;
	}
	public void setDelflag(String delflag) {
		this.delflag = delflag;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public List<AnswerRVO> getList() {
		return list;
	}
	public void setList(List<AnswerRVO> list) {
		this.list = list;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	
}
