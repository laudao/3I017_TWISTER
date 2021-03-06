package services;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import tools.ConnectionTools;
import tools.MessageTools;
import bd.Database;

import com.mongodb.DBCollection;

import errorJSON.ErrorJSON;

public class AddLike_s {
	public static JSONObject addLike(String key_user, String id_message) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user = null;
	//	String login_user = null;
	//	String name_user = null;

		Connection c = Database.getMySQLConnection();
			
		DBCollection coll = Database.getMongocollection("messages");
			
		if(key_user==null){
			return ErrorJSON.serviceRefused("missing parameter key",-1);
		}
			
		if (id_message == null){
			return ErrorJSON.serviceRefused("missing parameter id_message",-1);
		}
		
		if(!ConnectionTools.connection_within_hour(key_user,c)){
			return ErrorJSON.serviceRefused("Connection expired",-1);
		}
		
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
	//	login_user = UserTools.getLogin(id_user, c);
	//	name_user = UserTools.getName(id_user, c);

		MessageTools.addLike(id_message, id_user, coll);
		//MessageTools.addComment(id_user, id_message, text, coll);
			
		json = ErrorJSON.serviceAccepted("ok",1);
			
		return json;
			
	}

}