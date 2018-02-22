package services;

import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import tools.UserTools;
import errorJSON.ErrorJSON;

public class CreateUser_s {
	public static JSONObject createUser(String login, String password,
			String name, String lastName, String email) throws JSONException, SQLException{
		JSONObject json = null;
		Connection c = Database.getMySQLConnection();
		if (login == null || password == null || name == null || lastName == null || email == null){
			return ErrorJSON.serviceRefused("Wrong arguments", -1);
		}
		boolean is_user = UserTools.userExists(login, c);
		if (is_user){
			return ErrorJSON.serviceRefused("User already exists", 100000);
		}
		if (UserTools.insertUser(login, password, name, lastName, email, c) == 0){
			return ErrorJSON.serviceRefused("SQL Error", 1000);
		}
		json = new JSONObject();
		json.put("", "");
		return json;
	}
}
