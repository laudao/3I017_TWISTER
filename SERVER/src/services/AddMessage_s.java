package services;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;

import tools.ConnectionTools;
import tools.MessageTools;
import bd.Database;
import errorJSON.ErrorJSON;

public class AddMessage_s {
	public static JSONObject addMessage(String key_user, String text) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user = null;
		Connection c = Database.getMySQLConnection();
		
		DBCollection coll = Database.getMongocollection("messages");
		
		if(key_user==null){
			return ErrorJSON.serviceRefused("missing parameter key",-1);
		}
		
		if(text==null){
			return ErrorJSON.serviceRefused("missing parameter text",-1);
		}
		
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
		
		MessageTools.addMessage(id_user, text, coll);
		
		json = ErrorJSON.serviceAccepted("text",1);
		
		return json;
		
	}
}