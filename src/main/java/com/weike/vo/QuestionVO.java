package com.weike.vo;

public class QuestionVO {
	private String question_id;
	private String question_name;
	private String question_content;
	private String course_id;
	private String user_id;
	private String updatetime;
	private String delflag;
	@Override
	public String toString() {
		return "QuestionVO [question_id=" + question_id + ", question_name=" + question_name + ", question_content="
				+ question_content + ", course_id=" + course_id + ", user_id=" + user_id + ", updatetime=" + updatetime
				+ ", delflag=" + delflag + "]";
	}
	
	public String getCourse_id() {
		return course_id;
	}

	public void setCourse_id(String course_id) {
		this.course_id = course_id;
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
	
}
