package com.weike.util;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

/**
 * 上传图片
 * @author czt
 * @time 2015年7月29日 下午2:36:58
 */
public class UploadImgUtil {

	/**
	 * 上传图片
	 * @param mFile			文件
	 * @param name			文件名称
	 * @param filePath		保存路径
	 * @param url			访问路径
	 * @return
	 * @throws Exception
	 * @author czt
	 * @time 2015年7月29日 下午2:37:34
	 */
	public static Map<String, String> uploadImg(CommonsMultipartFile mFile, String name, String filePath, String url) throws Exception {

		Map<String, String> map = null;
		
		String fileName = mFile.getFileItem().getName();
		System.out.println(fileName);
		// 图片后缀
		String suffix = fileName.substring(fileName.lastIndexOf("."));
		// 修改后的文件名
		fileName = name.concat(suffix);
		// 图片路径
		File dir = new File(filePath);
		if (!dir.exists()) {
			dir.mkdirs();
		}
		File file = new File(filePath.concat(File.separator).concat(fileName));
		mFile.getFileItem().write(file);
		
		map = new HashMap<String, String>(2);
		map.put("imgName", fileName);
		map.put("imgUrl", url.concat(fileName));
		return map;
	}
	
	/**
	 * 删除图片
	 * @param fileName		图片名称
	 * @param filePath		保存路径
	 * @return
	 * @throws Exception
	 * @author czt
	 * @time 2015年7月30日 下午3:33:12
	 */
	public static boolean deleteImg(String fileName, String filePath) throws Exception {
		
		boolean flag = false;
		File file = new File(filePath.concat(File.separator).concat(fileName));
//		System.out.println("图片" + file.getAbsolutePath());
		if (file.exists()) {
			if (file.isFile()) {
				flag = file.delete();
			}
		}
		return flag;
	}
}
