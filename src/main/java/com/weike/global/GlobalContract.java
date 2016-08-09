package com.weike.global;

/**
 * 静态变量定义
 * 
 * @author czt
 * @time 2015年5月20日 上午11:12:30
 */
public class GlobalContract {
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 本地文件存储路径  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
	/** 本地 文件保存路径 */
	public static final String FILEPATH_URL = "e:/php/www/";
//	public static final String FILEPATH_URL = "/Applications/my/www/";
	
	public static final String APACHE_URL = "http://localhost/";
//	public static final String APACHE_URL = "http://120.27.105.153:8080/";
	/** LOGO URL */
	public static final String UPLOAD_VIDEO= "video/";
	/** folder URL**/
	public static final String UPLOAD_FOLDER = "folder/";
	/** IMAGE URL**/
	public static final String UPLOAD_IMAGE = "image/";
	/** 用户头像 图片后缀 */
	public static final String USER_IMG_END = ".jpg";
	
	/** 计数，满999，还原100，重新 +1 FileOptionUtil.class */
	public static long COUNT = 100;
	
	/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 日志  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

	/** 日志开始 */
	public static final String LOG_BEGIN = "begin";
	/** 日志结束 */
	public static final String LOG_END = "end";
	/** 字段长度超出限制 */
	public static final String ERR_PARAMLENGTH = "字段长度超出限制";
	/** 用户信息在session中的key */
	public static final String STUDENT = "student";
	/** 专家个人信息在session中的key */
	public static final String TEACHER = "teacher";

}
