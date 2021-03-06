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

public class GetFollowing_s {

	public static JSONObject getFollowing() throws SQLException, JSONException {
		Connection c = Database.getMySQLConnection();
		
		String[] users = UserTools.getAllUsers(c); // récupérer tous les utilisateurs

		JSONArray ret = new JSONArray();
		
		for (int i=0;i<users.length;i++){
			String[] idFriends = FriendsTools.getFriends(users[i], c); // récupérer les personnes suivies par l'utilisateur i
			JSONObject o = new JSONObject().put("id_user", users[i]);
			o.put("following", idFriends);
			ret.put(o);
		}
		
		return new JSONObject().put("follow", ret);
	}

}
