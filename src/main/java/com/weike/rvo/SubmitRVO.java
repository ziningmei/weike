package com.weike.rvo;

public class SubmitRVO {
	private String submit_id;
	private String student_id;
	private String homework_id;
	private String init_url;
	private String updatetime;
	private String delflag;
	private String score;
	private String homework_name;
	private String student_name;
	private String result_url;
	
	@Override
	public String toString() {
		return "SubmitRVO [submit_id=" + submit_id + ", student_id=" + student_id + ", homework_id=" + homework_id
				+ ", init_url=" + init_url + ", updatetime=" + updatetime + ", delflag=" + delflag + ", score=" + score
				+ ", homework_name=" + homework_name + ", student_name=" + student_name + "]";
	}
	
	public String getHomework_name() {
		return homework_name;
	}

	public void setHomework_name(String homework_name) {
		this.homework_name = homework_name;
	}

	public String getStudent_name() {
		return student_name;
	}

	public void setStudent_name(String student_name) {
		this.student_name = student_name;
	}

	public String getDelflag() {
		return delflag;
	}
	public void setDelflag(String delflag) {
		this.delflag = delflag;
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

	public String getResult_url() {
		return result_url;
	}

	public void setResult_url(String result_url) {
		this.result_url = result_url;
	}
}
