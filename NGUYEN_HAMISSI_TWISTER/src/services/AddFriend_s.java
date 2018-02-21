package services;

import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import tools.ConnectionTools;
import tools.FriendsTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class AddFriend_s {
	public static JSONObject addFriend(String key, String id_friend) throws JSONException, SQLException{
		JSONObject json = null;
		Connection c = Database.getMySQLConnection();
		String id_user;
		
		id_user = ConnectionTools.getId_from_key(key, c);
		
		if(key==null){
			return ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		
		if(id_friend==null){
			return ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		
		if (!UserTools.userExists(id_friend, c)){
			return ErrorJSON.serviceRefused("Unknown user", -1);
		}
		
		if (FriendsTools.friendExists(id_friend, id_user, c)){
			return ErrorJSON.serviceRefused("User is already friend", -1);
		}
		
		json = ErrorJSON.serviceAccepted("key",1);
		
		c.close();
		return json;
		
	}
}
