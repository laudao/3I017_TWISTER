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
import tools.UserTools;
import bd.Database;
import errorJSON.ErrorJSON;

public class AddMessage_s {
	public static JSONObject addMessage(String key_user, String text) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user = null;
		String login_user = null;
		String name_user = null;
		Connection c = Database.getMySQLConnection();
		
		DBCollection coll = Database.getMongocollection("messages");
		
		if(key_user==null){
			return ErrorJSON.serviceRefused("missing parameter key",-1);
		}
		
		if(text==null){
			return ErrorJSON.serviceRefused("missing parameter text",-1);
		}
		
		if(!ConnectionTools.connection_within_hour(key_user,c)){
			return ErrorJSON.serviceRefused("Connection expired",-1);
		}
		
		id_user = ConnectionTools.getId_from_key_user(key_user, c);
		login_user = UserTools.getLogin(id_user, c);
		name_user = UserTools.getName(Integer.parseInt(id_user), c);

		MessageTools.addMessage(id_user, name_user, login_user, text, coll);
		//MessageTools.addMessage(id_user, text, coll);
		
		json = ErrorJSON.serviceAccepted("text",1);
		
		return json;
		
	}
}
