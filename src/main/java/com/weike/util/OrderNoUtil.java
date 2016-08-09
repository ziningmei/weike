package com.weike.util;

/**
 * 订单号生成
 * @author czt
 * @time 2015年7月23日 下午2:22:44
 */
public class OrderNoUtil {
	
	/** 计数，满999，还原100，重新 +1  */
	private static long COUNT = 100;

	/**
	 * 订单号生成
	 * @return
	 * @author czt
	 * @time 2015年7月23日 下午2:27:52
	 */
	public static String getOrderNo() {

		long date = System.currentTimeMillis() / 10;
		if (COUNT == 999) {
			COUNT = 100;
		} else {
			COUNT++;
		}
		return date + "" + COUNT;
	}
	
	/*public static void main(String[] args) {
		
		for (int i = 0; i < 1001; i++) {
			System.out.println(getOrderNo());
		}
	}*/
}
