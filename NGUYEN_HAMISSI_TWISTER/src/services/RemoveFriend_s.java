package services;

import org.json.JSONException;
import org.json.JSONObject;

import tools.FriendsTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class RemoveFriend_s {
	public static JSONObject removeFriend(String key, String id_friend) throws JSONException{
		JSONObject json = null;
	
		if(key==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		
		if(id_friend==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		

		if (!UserTools.userExists(id_friend)){
			return ErrorJSON.serviceRefused("Unknown user", -1);
		}
		
		if (!FriendsTools.friendExists(id_friend)){
			return ErrorJSON.serviceRefused("User is not in friends list", -1);
		}
		
		try{
			json = ErrorJSON.serviceAccepted("key",1);
		}catch(JSONException e){
			e.printStackTrace();
		}
		
		return json;
		
	}
}
