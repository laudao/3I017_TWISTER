package test;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import services.GetFollowing_s;

public class TestGetFollowing {
	public static void main(String[] args) {
		JSONObject json = null;
		try {
			json = GetFollowing_s.getFollowing();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(json.toString());
	}

}