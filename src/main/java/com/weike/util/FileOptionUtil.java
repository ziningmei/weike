package com.weike.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import org.springframework.stereotype.Component;

import com.weike.global.GlobalContract;

@Component("fileutil")
public class FileOptionUtil {

	/**
	 * 获取订单号
	 * 
	 * @return
	 * @throws Exception
	 */
	public static String getfileName() {

		long date = System.currentTimeMillis() / 10;
		if (GlobalContract.COUNT == 999) {
			GlobalContract.COUNT = 100;
		} else {
			GlobalContract.COUNT++;
		}
		return date + "" + GlobalContract.COUNT + "";
	}

	/**
	 * 将字符输入到文件(不存在则创建，存在则覆盖)
	 * 
	 * @param content
	 */
	public String writeFileByBybeBuffer(String content, String docname) {
		FileOutputStream out = null;
		try {
			// 获取源文件和目标文件的输入输出流
			File file = new File(GlobalContract.FILEPATH_URL+GlobalContract.UPLOAD_FOLDER + docname);
			if (!file.getParentFile().exists()) {
				file.getParentFile().mkdirs();
			}
			file.createNewFile();
			out = new FileOutputStream(file);
			// 获取输入输出通道
			FileChannel fcOut = out.getChannel();
			ByteBuffer buffer = ByteBuffer
					.wrap(("<meta charset=\"UTF-8\">" + content)
							.getBytes("UTF-8"));
			buffer.flip();
			// 从输入通道中将数据读到缓冲区
			// flip方法让缓冲区可以将新读入的数据写入另一个通道
			buffer.clear();
			fcOut.write(buffer);
			fcOut.close();
			out.flush();
			out.close();
			return docname;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 上传图片
	 * 
	 * @param content
	 */
	public String writeFileByBybeimg(InputStream in, String path, String name) {
		try {
			File file = new File(path);
			if (!file.exists()) {
				file.mkdirs();
			}
			String filename = FileOptionUtil.getfileName();
			name = name.substring(name.lastIndexOf(".") + 1, name.length());
			System.out.println(name);
			FileOutputStream fos = new FileOutputStream(path + filename + "."
					+ name);
			byte[] b = new byte[1024];
			while ((in.read(b)) != -1) {
				fos.write(b);
			}
			fos.flush();
			fos.close();
			in.close();
			return filename + "." + name;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 将文件中的内容读取到字符中
	 * 
	 * @param content
	 */
	public String readFileByBybeBuffer(String docname) {
		try {
			String encoding = "UTF-8";
			URL url = new URL(GlobalContract.APACHE_URL
					 + GlobalContract.UPLOAD_FOLDER.concat(docname));
			URLConnection connection = url.openConnection();
			InputStream read = connection.getInputStream();
			BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(read,
					encoding));
			StringBuffer lineTxt = new StringBuffer();
			String line = "";
			while ((line = bufferedReader.readLine()) != null) {
				lineTxt.append(line);
			}
			read.close();
			return lineTxt.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	public static long getTime() {
		return System.currentTimeMillis();
	}

	// public static void main(String args[]) {
	// long time1 = getTime();
	// System.out.println(readFileByBybeBuffer("D:/aa/143600027337101.html"));//
	// 125,
	// long time2 = getTime();
	// System.out.println(time2 - time1);
	// }

}
