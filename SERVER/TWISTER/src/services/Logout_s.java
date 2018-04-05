package services;

import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import tools.ConnectionTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class Logout_s {
	public static JSONObject logout(String key) throws JSONException, SQLException{
		JSONObject json=null;
		Connection c;
		c = Database.getMySQLConnection();
		
		if(key==null){
			json = ErrorJSON.serviceRefused("wrong parameter",-1);
		}
		if(!ConnectionTools.isConnected(key, c)){
			json = ErrorJSON.serviceRefused("Unknown connection", 1);
		}
		ConnectionTools.removeConnection(key, c);
		json = ErrorJSON.serviceAccepted("Bye Bye",1);
			
		return json;
	}
}
