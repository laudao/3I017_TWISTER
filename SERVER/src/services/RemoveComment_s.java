package services;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.DBCollection;

import bd.Database;
import tools.ConnectionTools;
import tools.FriendsTools;
import tools.MessageTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class RemoveComment_s {
	public static JSONObject removeComment(String key, String id_message, String id_comment) throws JSONException, SQLException, UnknownHostException{
		JSONObject json = null;
		Connection c;
		String id_user;
		c = Database.getMySQLConnection();
		DBCollection coll = Database.getMongocollection("messages");
		
		id_user = ConnectionTools.getId_from_key_user(key, c);
		
		if(key==null){
			return ErrorJSON.serviceRefused("missing key_user",-1);
		}
		
		if(id_message==null){
			return ErrorJSON.serviceRefused("missing id_message",-1);
		}
		
		if(id_comment==null){
			return ErrorJSON.serviceRefused("missing id_comment",-1);
		}
		
		if (!MessageTools.check_remove_comment(id_user, id_message, id_comment, coll)){
			return ErrorJSON.serviceRefused("permission denied",-1);
		}
		
		MessageTools.removeComment(id_user, id_message, id_comment, coll);
		
		json = ErrorJSON.serviceAccepted("key",1);
		
		c.close();
		
		return json;
		
	}
}
