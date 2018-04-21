package services;

import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import tools.ConnectionTools;
import tools.FriendsTools;
import tools.MessageTools;
import tools.UserTools;
import bd.Database;
import java.util.HashMap;

public class GetMostPopular_s {

	public static JSONObject getMostPopular() throws SQLException, JSONException {
		Connection c = Database.getMySQLConnection();
		HashMap<String, Integer> hm = FriendsTools.getMostPopular(c);
		
		
		return new JSONObject().put("most popular", hm);
	}

}
