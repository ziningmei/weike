
/**
 * @author jq
 * @time 2015年10月28日 下午5:00:33
 */
package com.weike.biz;

import javax.servlet.http.HttpSession;

import com.weike.rvo.StudentRVO;
import com.weike.vo.StudentVO;

public interface StudentBiz<T,PK> extends BaseBiz<T, PK>{

	StudentRVO studentLogin(StudentVO studentVO, HttpSession session);
	
	StudentRVO selectStuNo(StudentVO studentVO, HttpSession session);

}