package services;

import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import tools.ConnectionTools;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class Login_s {
	public static JSONObject login(String login, String password) throws JSONException, SQLException{
		JSONObject json;
		String key = null;
		int id_user;
		Connection c;
		c = Database.getMySQLConnection();
		
		if(login == null || password == null){
			return ErrorJSON.serviceRefused("wrong argument",-1);
		}
		
		boolean is_user;
		is_user = UserTools.userExists(login, c);
		
		if(!is_user){
			return ErrorJSON.serviceRefused("Unknown user",10000);
		}
		
		boolean pass_ok;
		pass_ok = UserTools.checkPassword(login,password, c);
	
		
		if(!pass_ok){
			return ErrorJSON.serviceRefused("wrong password",1000);
		}
		
		key = ConnectionTools.generateKey(c);
		id_user = UserTools.getId(login, c);
		
		ConnectionTools.insertConnexion(key,id_user,c);		
		
		c.close();
		
		json = new JSONObject();
		json.put("","");
		return json;
	}
}
