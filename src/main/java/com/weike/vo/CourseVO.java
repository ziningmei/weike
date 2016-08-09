package com.weike.vo;

public class CourseVO {
	private String course_id;
	private String course_name;
	private String course_describe;
	private String delflag;
	private String updatetime;
	private String teacher_id;
	private String img;
	@Override
	public String toString() {
		return "CourseVO [course_id=" + course_id + ", course_name=" + course_name + ", course_describe="
				+ course_describe + ", delflag=" + delflag + ", updatetime=" + updatetime + ", teacher_id=" + teacher_id
				+ ", img=" + img + "]";
	}
	public String getCourse_id() {
		return course_id;
	}
	public void setCourse_id(String course_id) {
		this.course_id = course_id;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getCourse_describe() {
		return course_describe;
	}
	public void setCourse_describe(String course_describe) {
		this.course_describe = course_describe;
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
	public String getTeacher_id() {
		return teacher_id;
	}
	public void setTeacher_id(String teacher_id) {
		this.teacher_id = teacher_id;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}

}
