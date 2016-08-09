package com.weike.vo;

public class SubmitVO {
	private String submit_id;
	private String student_id;
	private String homework_id;
	private String init_url;
	private String updatetime;
	private String delflag;
	private String score;
	@Override
	public String toString() {
		return "SubmitVO [submit_id=" + submit_id + ", student_id=" + student_id + ", homework_id=" + homework_id
				+ ", init_url=" + init_url + ", updatetime=" + updatetime + ", delflag=" + delflag + ", score=" + score
				+  "]";
	}
	public String getSubmit_id() {
		return submit_id;
	}
	public void setSubmit_id(String submit_id) {
		this.submit_id = submit_id;
	}
	public String getStudent_id() {
		return student_id;
	}
	public void setStudent_id(String student_id) {
		this.student_id = student_id;
	}
	public String getHomework_id() {
		return homework_id;
	}
	public void setHomework_id(String homework_id) {
		this.homework_id = homework_id;
	}
	public String getInit_url() {
		return init_url;
	}
	public void setInit_url(String init_url) {
		this.init_url = init_url;
	}
	public String getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	public String getDelflag() {
		return delflag;
	}
	public void setDelflag(String delflag) {
		this.delflag = delflag;
	}
}
