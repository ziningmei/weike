package com.weike.rvo;

public class HomeworkRVO {
	private String homework_id;
	private String content;
	private String course_id;
	private String delflag;
	private String updatetime;
	private String result_url;
	private String showflag;
	private String homework_name;
	private String endDate;
	private String submit_id;
	private String count;
	private String flag;
	private String course_name;
	private String score;
	
	@Override
	public String toString() {
		return "HomeworkRVO [homework_id=" + homework_id + ", content=" + content + ", course_id=" + course_id
				+ ", delflag=" + delflag + ", updatetime=" + updatetime + ", result_url=" + result_url + ", showflag="
				+ showflag + ", homework_name=" + homework_name + ", endDate=" + endDate + ", count=" + count
				+ ", course_name=" + course_name + "]";
	}
	public String getHomework_id() {
		return homework_id;
	}
	public void setHomework_id(String homework_id) {
		this.homework_id = homework_id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDelflag() {
		return delflag;
	}
	public void setDelflag(String delflag) {
		this.delflag = delflag;
	}
	public String getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	public String getResult_url() {
		return result_url;
	}
	public void setResult_url(String result_url) {
		this.result_url = result_url;
	}
	public String getShowflag() {
		return showflag;
	}
	public void setShowflag(String showflag) {
		this.showflag = showflag;
	}
	public String getCourse_id() {
		return course_id;
	}
	public void setCourse_id(String course_id) {
		this.course_id = course_id;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getHomework_name() {
		return homework_name;
	}
	public void setHomework_name(String homework_name) {
		this.homework_name = homework_name;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getSubmit_id() {
		return submit_id;
	}
	public void setSubmit_id(String submit_id) {
		this.submit_id = submit_id;
	}
	public String getScore() {
		return score;
	}
	public void setScore(String score) {
		this.score = score;
	}
	
}
