package test;

import org.json.JSONException;
import org.json.JSONObject;

import services.AddFriend_s;

public class TestAddFriend {

	public static void main(String[] args) {
		JSONObject json = null;
		try {
			json = AddFriend_s.addFriend("hugowyb", "hamissihamissi");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());

	}

}
