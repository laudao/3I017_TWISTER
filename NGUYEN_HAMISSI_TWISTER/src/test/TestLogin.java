package test;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import services.Login_s;

public class TestLogin {
	public static void main(String[] args) {
		JSONObject json = null;
		try {
			try {
				json = Login_s.login("hugowyb", "MPIL");
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
