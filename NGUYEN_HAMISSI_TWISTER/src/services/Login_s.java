package services;

import org.json.JSONException;
import org.json.JSONObject;

import tools.UserTools;
import errorJSON.ErrorJSON;

public class Login_s {
	public static JSONObject login(String login, String password) throws JSONException{
		JSONObject json;
		String key = null;
		int id_user;
		
		if(login == null || password == null){
			return ErrorJSON.serviceRefused("wrong argument",-1);
		}
		
		boolean is_user = UserTools.userExists(login);
		
		if(is_user){
			return ErrorJSON.serviceRefused("Unknown user",1000);
		}
		
		boolean pass_ok = UserTools.checkPassword(login,password);
		
		if(!pass_ok){
			return ErrorJSON.serviceRefused("wrong password",1000);
		}
		
		key = UserTools.generateKey();
		id_user = UserTools.getId(login);
		UserTools.insertConnexion(key,id_user);
		json = new JSONObject();
		json.put("key",key);
		return json;
	}
}
