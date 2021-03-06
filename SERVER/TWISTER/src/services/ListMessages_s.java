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

public class ListMessages_s {
	public static JSONObject list_messages(String key_user) throws JSONException, UnknownHostException, SQLException{
		JSONObject json = null;
        DBCollection coll = Database.getMongocollection("messages");
		Connection c = Database.getMySQLConnection();

        if(!ConnectionTools.connection_within_hour(key_user,c)){
			return ErrorJSON.serviceRefused("Connection expired",-1);
		}
        
		json = MessageTools.getMessages_within_month(coll);
		
        return json;
		
	}
}