package services;

import org.json.JSONException;
import org.json.JSONObject;

import errorJSON.ErrorJSON;

public class AddComment_s {
	public static JSONObject addComment(String key, String text) throws JSONException{
		JSONObject json = null;
	
		if(key==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		
		if(text==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		
		try{
			json = ErrorJSON.serviceAccepted("text",1);
		}catch(JSONException e){
			e.printStackTrace();
		}
		
		return json;
		
	}
}
