package test;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import services.Logout_s;

public class TestLogout {
	public static void main(String[] args) throws SQLException {
		JSONObject json = null;
		try {
			json = Logout_s.logout("hugowyb");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());
	}
}
