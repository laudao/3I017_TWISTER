package test;

import java.net.UnknownHostException;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import services.ListMessages_s;

public class TestConnection{

	public static void main(String[] args) {
		JSONObject json = null;
		try {
			try {
				json = ListMessages_s.list_messages("905227163");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());

	}

}
