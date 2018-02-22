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

public class AddComment_s {
	public static JSONObject addComment(String key, String text) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		String id_user = null;
		Connection c = Database.getMySQLConnection();
		Mongo mongo = new Mongo("localhost");
		DB db = mongo.getDB("HAMISSI_NGUYEN_MDB");
		
		if(key==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		
		if(text==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		
		id_user = ConnectionTools.getId_from_key(key, c);
		
		MessageTools.addComment(id_user, text, db);
		
		json = ErrorJSON.serviceAccepted("text",1);
		
		return json;
		
	}
}
