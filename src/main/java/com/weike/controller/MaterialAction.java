package com.weike.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.hssf.util.HSSFColor.GOLD;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.weike.biz.MaterialBiz;
import com.weike.global.GlobalContract;
import com.weike.rvo.MaterialRVO;
import com.weike.vo.ListRangeEx;

@Controller
@RequestMapping(value = "material", produces = { "application/json;charset=UTF-8" })
public class MaterialAction extends BaseAction<MaterialRVO, Integer> {

	private MaterialBiz materialBiz;

	@Autowired
	public void setMaterialBiz(MaterialBiz materialBiz) {
		super.setBaseBiz(materialBiz);
		this.materialBiz = materialBiz;
	}
	@Override
	public void listPage(@RequestBody ListRangeEx listRangeEx, 
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		materialBiz.listPage(listRangeEx);
		List list= listRangeEx.getList();
		List<MaterialRVO> newList=new ArrayList<>();
		for(int i=0;i<list.size();i++){
			MaterialRVO rvo=(MaterialRVO) list.get(i);
			if(rvo.getMaterial_type().equals("0")){
				rvo.setUrl(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_FOLDER.concat(rvo.getUrl()));
			}else if(rvo.getMaterial_type().equals("1")){
				rvo.setUrl(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_VIDEO.concat(rvo.getUrl()));
			}
			newList.add(rvo);
		}
		listRangeEx.setList(newList);
		printWriterFromObject(response, listRangeEx);
	}
	
	@RequestMapping("/listAllByParams")
	public void listAllByParams(@RequestBody Map<String, Object> params, 
			HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		System.out.println(params.toString());
		List newList= new ArrayList<>();
		List<MaterialRVO> list = materialBiz.listAll(params);
		for(int i=0;i<list.size();i++){
			MaterialRVO rvo=(MaterialRVO) list.get(i);
			if(rvo.getMaterial_type().equals("0")){
				rvo.setUrl(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_FOLDER.concat(rvo.getUrl()));
			}else if(rvo.getMaterial_type().equals("1")){
				rvo.setUrl(GlobalContract.APACHE_URL+GlobalContract.UPLOAD_VIDEO.concat(rvo.getUrl()));
			}
			newList.add(rvo);
		}
		printWriterFromList(response, list);
	}
}
