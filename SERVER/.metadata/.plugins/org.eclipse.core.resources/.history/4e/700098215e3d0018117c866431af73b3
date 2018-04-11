package services;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import tools.ConnectionTools;
import tools.MessageTools;
import tools.UserTools;
import bd.Database;

import com.mongodb.DBCollection;

import errorJSON.ErrorJSON;

public class AddComment_s {
	public static JSONObject addComment(String key_user, String id_message, String text) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user = null;
		String login_user = null;
		String name_user = null;

		Connection c = Database.getMySQLConnection();
			
		DBCollection coll = Database.getMongocollection("messages");
			
		if(key_user==null){
			return ErrorJSON.serviceRefused("missing parameter key",-1);
		}
			
		if (id_message == null){
			return ErrorJSON.serviceRefused("missing parameter id_message",-1);
		}
			
		if(text==null){
			json = ErrorJSON.serviceRefused("missing parameter text",-1);
		}
			
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
		login_user = UserTools.getLogin(id_user, c);
		name_user = UserTools.getName(id_user, c);

		MessageTools.addComment(name_user, login_user, id_message, text, coll);
		//MessageTools.addComment(id_user, id_message, text, coll);
			
		json = ErrorJSON.serviceAccepted("text",1);
			
		return json;
			
	}

}
