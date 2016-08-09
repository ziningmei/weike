package com.weike.util;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;

import net.sf.json.util.JSONUtils;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

public class JacksonUtil {
	private static final Logger LOGGER = Logger.getLogger(JacksonUtil.class);

	public static boolean isBadJson(String json) {
		return !isGoodJson(json);
	}

	public static boolean isGoodJson(String data) {
		return JSONUtils.mayBeJSON(data);
	}
	
	public static String bean2Json(Object obj) {
		ObjectMapper objMapper = new ObjectMapper();
		StringWriter sw = new StringWriter();
		JsonGenerator gen = null;
		
		try {
			gen = new JsonFactory().createJsonGenerator(sw);
			objMapper.writeValue(gen, obj);
		} catch (IOException e) {
			LOGGER.error(e.getMessage());
		} finally {
			if (gen != null) {
				try {
					gen.close();
				} catch (IOException e) {
					LOGGER.error(e.getMessage());
				}
			}
		}

		return sw.toString();
	}

	public static <T> T json2Bean(String jsonStr, Class<T> objClass) {
		ObjectMapper objMapper = new ObjectMapper();
		try {
			return objMapper.readValue(jsonStr, objClass);
		} catch (JsonParseException e) {
			LOGGER.error(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.error(e.getMessage());
		} catch (IOException e) {
			LOGGER.error(e.getMessage());
		}
		
		return null;
	}
	
	public static <T> List<T> json2List(String jsonStr, Class<T> objClass) {
		List<T> list = null;
		ObjectMapper objMapper = new ObjectMapper();
		TypeFactory typeFactory = objMapper.getTypeFactory();
		try {
			list = objMapper.readValue(jsonStr, typeFactory.constructCollectionType(List.class, objClass));
		} catch (JsonParseException e) {
			LOGGER.error(e.getMessage());
		} catch (JsonMappingException e) {
			LOGGER.error(e.getMessage());
		} catch (IOException e) {
			LOGGER.error(e.getMessage());
		}
		
		return list;
	}
}
