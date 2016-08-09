package com.weike.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.core.annotation.OrderUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.weike.global.GlobalContract;
import com.weike.global.GlobalMessage;
import com.weike.util.FileOptionUtil;
import com.weike.util.UploadImgUtil;
import com.weike.vo.ResultVO;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "fileUpload")
public class FileUploadAction {
	
	/** 日志 */
	private static Logger log = Logger.getLogger(FileUploadAction.class);
	/**
	 * 文件操作接口
	 */
	@Resource(name = "fileutil")
	private FileOptionUtil fileutil; 

	/**
	 * 上传图片
	 * @author jq
	 * @time 2015年9月30日  上午9:39:17
	 * @param upfile
	 * @param session
	 * @return
	 */
	@RequestMapping("/uploadImage")
	@ResponseBody
	public String uploadfile(@RequestParam("upfile") MultipartFile upfile,HttpSession session){
		try {
			
		String name=FileOptionUtil.getfileName();
		String  path = fileutil.writeFileByBybeimg(upfile.getInputStream(),"d:/qzy_img/upload/",name+upfile.getOriginalFilename());
		String result = "{\"name\":\""+ path +"\", \"originalName\": \""+ upfile.getOriginalFilename() +"\", \"size\": "+ upfile.getSize() +", \"state\": \"SUCCESS\", \"type\": \""+name.substring(name.lastIndexOf(".")+1,name.length())+"\", \"url\": \""+path+"\"}";  
        result = result.replaceAll( "\\\\", "\\\\" ); 
        // 将图片上传到文件服务器
		List<String> filePathList = new ArrayList<String>();
		filePathList.add("d:/qzy_img/upload/"+path);
        
          return result;
		} catch (IOException e) {
			e.printStackTrace();
		}
          return "";
	}
	/**
	 * 上传文件
	 * @author jq
	 * @time 2015年9月30日  上午9:39:05
	 * @param session
	 * @param mFile
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/uploadFile")
	public String uploadFile(HttpSession session,
			@RequestParam("file") CommonsMultipartFile file){

		log.info(GlobalContract.LOG_BEGIN);
		ResultVO resultVO = new ResultVO();
		try {
			String name=FileOptionUtil.getfileName()+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
			FileOutputStream os = new FileOutputStream(GlobalContract.FILEPATH_URL.concat(GlobalContract.UPLOAD_FOLDER)+name);
	        InputStream in = file.getInputStream();
	        int b = 0;
	        while((b=in.read())!=-1){ //读取文件 
	          os.write(b);
	        }
	        os.flush(); //关闭流 
	        in.close();
	        os.close();
	        JSONObject object=new JSONObject();
	        resultVO.setResData(name);
	        System.out.println(object.toString());
		} catch (Exception e) {
			e.printStackTrace();
			resultVO = new ResultVO(GlobalMessage.MSG_01);
			log.error("错误信息：" + e.getMessage());
		}
		
		log.info(GlobalContract.LOG_END);
		return JSONObject.fromObject(resultVO).toString();
	}
	/**
	 * 上传文件
	 * @author jq
	 * @time 2015年9月30日  上午9:39:05
	 * @param session
	 * @param mFile
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/uploadVideo")
	public String uploadVideo(HttpSession session,
			@RequestParam("file") CommonsMultipartFile file){

		log.info(GlobalContract.LOG_BEGIN);
		ResultVO resultVO = new ResultVO();
		try {
			String name=FileOptionUtil.getfileName()+file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.')-1);
			FileOutputStream os = new FileOutputStream(GlobalContract.FILEPATH_URL.concat(GlobalContract.UPLOAD_VIDEO)+name);
	        InputStream in = file.getInputStream();
	        int b = 0;
	        while((b=in.read())!=-1){ //读取文件 
	          os.write(b);
	        }
	        os.flush(); //关闭流 
	        in.close();
	        os.close();
	        resultVO.setResData(name);
		} catch (Exception e) {
			e.printStackTrace();
			resultVO = new ResultVO(GlobalMessage.MSG_01);
			log.error("错误信息：" + e.getMessage());
		}
		
		log.info(GlobalContract.LOG_END);
		return JSONObject.fromObject(resultVO).toString();
	}
	/**
	 * 下载
	 * 
	 * @param session
	 * @param fname
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/download/{fname}")
	public ResponseEntity<byte[]> download(HttpSession session,
			@PathVariable("fname") String fname) throws IOException {

		log.info(GlobalContract.LOG_BEGIN);
		String path = GlobalContract.FILEPATH_URL+fname;
		File file = new File(path);
		HttpHeaders headers = new HttpHeaders();
		String fileName = new String(fname.getBytes("gbk"), "iso-8859-1");// 为了解决中文名称乱码问题
		headers.setContentDispositionFormData("attachment", fileName);
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		log.info(GlobalContract.LOG_END);
		return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),
				headers, HttpStatus.OK);
	}
}
