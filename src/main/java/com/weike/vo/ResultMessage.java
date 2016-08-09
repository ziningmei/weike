package com.weike.vo;

/**
 * 接口调用返回信息
 *
 */
public class ResultMessage {
	private boolean success;
    private Object data; 
    private String message;
    
    public ResultMessage() {
        
    }
    
    public ResultMessage(boolean success, Object data, String message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
    
    public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	/**
     * @return the result
     */
    public Object getData() {
        return data;
    }
    /**
     * @param data the result to set
     */
    public void setData(Object data) {
        this.data = data;
    }
    /**
     * @return the message
     */
    public String getMessage() {
        return message;
    }
    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }
}
