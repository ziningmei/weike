package com.weike.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;

import org.apache.commons.codec.binary.Base64;

import com.weike.global.GlobalContract;

/**
 * Base64加密解密
 * @ClassName: Base64Util 
 * @author 蔡志同 
 * @date 2014年12月24日 下午1:50:52
 */
public class Base64Util {
	
	/**
	 * 加密字符串
	 * @Title encodeStr 
	 * @param str 明文 
	 * @return
	 * @author 蔡志同  
	 * @date 2014年12月1日 下午1:42:07
	 */
	public static byte[] decryptBASE64(String str){
		
		return (new Base64()).encode(str.getBytes());
	}
	
	/**
	 * 解密字符串
	 * @Title decodeStr 
	 * @param key 密文
	 * @return
	 * @author 蔡志同  
	 * @date 2014年12月1日 下午1:41:56
	 */
	public static String encryptBASE64(byte[] key){
		
		return new String((new Base64()).decode(key));
	}
	
	/**
	 * 对文件进行编码
	 * @Title GetImageStr 
	 * @param file
	 * @return
	 * @throws Exception
	 * @author 蔡志同  
	 * @date 2014年12月24日 下午1:48:00
	 */
	public static String encodeFile(File file) throws Exception {
		
		InputStream in = new FileInputStream(file);
		byte[] data = new byte[in.available()];
		in.read(data);
		in.close();
		return new String((new Base64()).encode(data));
	}
	
	/** 
     * 对文件进行解码 
     * @param oldString 需要解码的字符串 
     * @param filePath  将字符串解码到filepath文件路径 
     * @return  返回解码后得到的文件 
     * @throws Exception 
     */  
    public static void decodeFile(String fileString, String filePath) throws Exception{  
    	
        File file = new File(filePath);  
        
        if(file.exists()){  
        	file.delete();
        }
        
        file.createNewFile();
        
        FileOutputStream out = new FileOutputStream(file); 
        byte[] debytes = null;
        if (fileString != null) {
			debytes = new Base64().decode(fileString.getBytes());
		}
        out.write(debytes);
        out.close();
    }  
    /**
     * 生成文件名称
     * @return
     * @author czt
     * @time 2015年10月21日 上午10:39:34
     */
	public static String getfileName() {

		long date = System.currentTimeMillis() / 10;
		if (GlobalContract.COUNT == 999) {
			GlobalContract.COUNT = 100;
		} else {
			GlobalContract.COUNT++;
		}
		return date + "" + GlobalContract.COUNT;
	}
    public static void main(String[] args) throws Exception {
		
    	File file = new File("D://1.jpg");
    	String str = encodeFile(file);
    	System.out.println(str);
    	decodeFile(str, "D://123.jpg");
	}
    
    
}
