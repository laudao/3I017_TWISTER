package services;

import org.json.JSONException;
import org.json.JSONObject;

import tools.UserTools;
import errorJSON.ErrorJSON;

public class CreateUser_s {
	public static JSONObject createUser(String login, String password,
			String name, String lastName, String email) throws JSONException{
		JSONObject json;
		if (login == null || password == null || name == null || lastName == null || email == null){
			return ErrorJSON.serviceRefused("Wrong arguments", -1);
		}
		boolean is_user = UserTools.userExists(login);
		if (is_user){
			return ErrorJSON.serviceRefused("User already exists", 1000);
		}
		UserTools.insertUser(login, password, name, lastName, email);
		json = new JSONObject();
		json.put("", "");
		return json;
	}
}
