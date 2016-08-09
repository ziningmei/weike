package com.weike.rvo;

public class AnswerRVO {
	private String answer_id;
	private String user_type;
	private String answer_content;
	private String update_time;
	private String delflag;
	private String question_id;
	private String user_id;
	private String teacher_name;
	private String student_name;
	public String getAnswer_id() {
		return answer_id;
	}
	public String getTeacher_name() {
		return teacher_name;
	}
	public void setTeacher_name(String teacher_name) {
		this.teacher_name = teacher_name;
	}
	public String getStudent_name() {
		return student_name;
	}
	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}
	public void setAnswer_id(String answer_id) {
		this.answer_id = answer_id;
	}
	public String getUser_type() {
		return user_type;
	}
	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}
	public String getAnswer_content() {
		return answer_content;
	}
	public void setAnswer_content(String answer_content) {
		this.answer_content = answer_content;
	}
	public String getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(String update_time) {
		this.update_time = update_time;
	}
	public String getDelflag() {
		return delflag;
	}
	public void setDelflag(String delflag) {
		this.delflag = delflag;
	}
	public String getQuestion_id() {
		return question_id;
	}
	public void setQuestion_id(String question_id) {
		this.question_id = question_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	@Override
	public String toString() {
		return "AnswerVO [answer_id=" + answer_id + ", user_type=" + user_type + ", answer_content=" + answer_content
				+ ", update_time=" + update_time + ", delflag=" + delflag + ", question_id=" + question_id
				+ ", user_id=" + user_id + "]";
	}
	
}
