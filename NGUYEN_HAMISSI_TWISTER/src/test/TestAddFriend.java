package test;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import services.AddFriend_s;

public class TestAddFriend {

	public static void main(String[] args) {
		JSONObject json = null;
		try {
			try {
				json = AddFriend_s.addFriend("hugowyb", "hamissihamissi");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());

	}

}
