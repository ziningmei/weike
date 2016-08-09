package com.weike.vo;

public class MaterialVO {
	private String material_id;
	private String material_type;
	private String delflag;
	private String updatetime;
	private String url;
	private String course_id;
	private String material_name;
	
	@Override
	public String toString() {
		return "MaterialRVO [material_id=" + material_id + ", material_type=" + material_type + ", delflag=" + delflag
				+ ", updatetime=" + updatetime + ", url=" + url + ", course_id=" + course_id + ", material_name="
				+ material_name + "]";
	}
	public String getMaterial_id() {
		return material_id;
	}
	public void setMaterial_id(String material_id) {
		this.material_id = material_id;
	}
	public String getMaterial_type() {
		return material_type;
	}
	public void setMaterial_type(String material_type) {
		this.material_type = material_type;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getCourse_id() {
		return course_id;
	}
	public void setCourse_id(String course_id) {
		this.course_id = course_id;
	}
	public String getMaterial_name() {
		return material_name;
	}
	public void setMaterial_name(String material_name) {
		this.material_name = material_name;
	}
	
}
