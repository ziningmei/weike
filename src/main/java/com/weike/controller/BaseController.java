package com.weike.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.PropertyFilter;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.weike.util.JacksonUtil;

@Controller
public class BaseController {
    protected static final Logger LOGGER = Logger.getLogger(BaseController.class);
    
    protected void printWriterFromObject(HttpServletResponse response, Object obj) {
        if (response == null || obj == null) {
            return;
        }
        
    	response.setContentType("text/javascript;charset=UTF-8");
		
		try {
			PrintWriter out = response.getWriter();
			String resultJson = JSONObject.fromObject(obj).toString();
			out.write(resultJson);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			this.showException(response, e.getMessage());
		}
    }
    
    protected void printWriterFromList(HttpServletResponse response, List obj) {
        if (response == null || obj == null) {
            return;
        }
        
        response.setContentType("text/javascript;charset=UTF-8");
        
        try {
            PrintWriter out = response.getWriter();
            String resultJson = JacksonUtil.bean2Json(obj);
            out.write(resultJson);
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            this.showException(response, e.getMessage());
        }
    }
    
    protected void showException(HttpServletResponse response, String msg) {
        try{
            response.getWriter().write("{\"exception\":true, \"msg\":\"" + msg + "\"}");
        }
        catch(IOException ex){
        	LOGGER.error(ex.getMessage());
        }
    }
    
	@ModelAttribute
	protected void initPath(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
		//String fullPath = request.getScheme() + "://" + request.getServerName() + base;
		//model.addAttribute("fullPath", fullPath);
		
		String base = request.getContextPath();
		model.addAttribute("base", base);
	}
	
	protected JsonConfig getJsonConfig(final String... columns) {
        // 声明JsonConfig配置文件对象  
        JsonConfig jsonConfig = new JsonConfig();  
        // 设置循环检测策略  
        jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);  
        // 设置json的属性的过滤器  
        // 创建属性过滤器的内部内部对象  
        jsonConfig.setJsonPropertyFilter(new PropertyFilter() {  
            // 重写内部的允许字段通过的方法  
            public boolean apply(Object source, String name, Object value) {  
                // 排除的字段名字（属性名）  
                boolean isExisted = false;
                for (int i = 0; i < columns.length; i++) {
                    if (name.equalsIgnoreCase(columns[i])) {  
                        isExisted = true;
                        break;
                    }
                }
                
                return isExisted;
            }  
        });  
        
        return jsonConfig;
    }
	   
	protected void writeToResponse(HttpServletResponse response, String sourceFilePath, String targetFileName) {
		response.reset(); // 非常重要
	    BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            String filename = new String(targetFileName);
            response.setContentType("application/x-msdownload");
            response.setHeader("Content-Disposition",
                    "attachment; filename=" + new String(filename.getBytes("GB2312"), "ISO8859-1"));
            bis = new BufferedInputStream(new FileInputStream(sourceFilePath));
            bos = new BufferedOutputStream(response.getOutputStream());
            byte[] buff = new byte[2048];
            int bytesRead;
            while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
                bos.write(buff, 0, bytesRead);
            }
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            this.showException(response, e.getMessage());
        } finally {
            try {
                if (bis != null)
                    bis.close();
                if (bos != null)
                    bos.close();
            } catch (IOException e) {
            	LOGGER.error(e.getMessage());
            	this.showException(response, e.getMessage());
            }
        }
	}
}
