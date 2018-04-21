package test;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import services.GetMostPopular_s;

public class TestPopular{
	public static void main(String[] args) {
		JSONObject json = null;
		try {
			json = GetMostPopular_s.getMostPopular();
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(json.toString());
	}

}
