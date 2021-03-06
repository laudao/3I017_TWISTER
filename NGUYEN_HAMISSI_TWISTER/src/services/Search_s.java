package services;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;

import com.mongodb.DBCollection;

import tools.ConnectionTools;
import tools.FriendsTools;
import tools.MessageTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class Search_s {
	public static JSONObject search(String key_user, String query, String friends) throws JSONException, UnknownHostException, SQLException{
		JSONObject json = null;
		
		if (key_user != null){
			json = list_messages_user(key_user);
		}
		
		else{
			
			json = list_messages_user_friends(key_user,friends);
		}
		return json;
		
	}
	
	public static JSONObject list_messages_user(String key_user) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user;
		Connection c = Database.getMySQLConnection();
		
		DBCollection coll = Database.getMongocollection("messages");
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
		
		
		json = MessageTools.getMessages(id_user, coll);
		
		return json;
	}
	
	public static JSONObject list_messages_user_friends(String key_user,String friends) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user;
		Connection c = Database.getMySQLConnection();
		DBCollection coll = Database.getMongocollection("messages");
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
		json = MessageTools.getMessages(id_user, coll);
		
		String[] idFriends = friends.split(" ");
		
		JSONArray ret = new JSONArray();
		for (int i=0;i<idFriends.length;i++){
			String k=ConnectionTools.getkey_user_from_id(idFriends[i],c);
			ret.put(list_messages_user(k));
		}
		
		return new JSONObject().put("messages", ret);
	}
}