package services;

import org.json.JSONException;
import org.json.JSONObject;

import tools.ConnectionTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class Logout_s {
	public static JSONObject logout(String key) throws JSONException{
		JSONObject json=null;
		
		if(key==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		try{
			if(ConnectionTools.isConnected(key)){
				json = ErrorJSON.serviceRefused("Unknown connection", 1);
			}
			ConnectionTools.removeConnection(key);
			json = ErrorJSON.serviceAccepted("Bye Bye",1);
			
		}catch(JSONException e){
			e.printStackTrace();

		}
		return json;
	}
}
