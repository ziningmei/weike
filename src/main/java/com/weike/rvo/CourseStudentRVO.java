package com.weike.rvo;

public class CourseStudentRVO {
	private String course_student_id;
	private String student_id;
	private String course_id;
	private String delflag;
	private String updatetime;
	@Override
	public String toString() {
		return "CourseStudentVO [course_student_id=" + course_student_id + ", student_id=" + student_id + ", course_id="
				+ course_id + ", delflag=" + delflag + ", updatetime=" + updatetime + "]";
	}
	public String getCourse_student_id() {
		return course_student_id;
	}
	public void setCourse_student_id(String course_student_id) {
		this.course_student_id = course_student_id;
	}
	public String getStudent_id() {
		return student_id;
	}
	public void setStudent_id(String student_id) {
		this.student_id = student_id;
	}
	public String getCourse_id() {
		return course_id;
	}
	public void setCourse_id(String course_id) {
		this.course_id = course_id;
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
	
}
