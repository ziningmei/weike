package com.weike.base;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;

import com.weike.global.GlobalContract;

/**
 * 基于配置文件的AOP日志示例
 * 
 * @author cj
 */
public class AopLog {

	/** 日志 */
	Logger log = Logger.getLogger(AopLog.class);

	/**
	 * 记录日志
	 * 
	 * @param point
	 * @return
	 * @throws Throwable
	 */
	public Object runOnAround(ProceedingJoinPoint point) throws Throwable {

		Object target = point.getTarget();
		String className = target.getClass().getName();
		String methodName = point.getSignature().getName();
		Object[] args = point.getArgs();

		// 通过分析aop监听参数分析出request等信息
		HttpSession session = null;
		for (int i = 0; i < args.length; i++) {
			if (args[i] instanceof HttpSession) {
				session = (HttpSession) args[i];
				break;
			}
		}

		Object object = null;
		log.info("调用" + className + "的" + methodName + "方法");
		object = point.proceed();

		return object;
	}
}