package test;

import org.json.JSONException;
import org.json.JSONObject;

import services.RemoveFriend_s;

public class TestRemoveFriend {
	public static void main(String[] args) {
		JSONObject json = null;
		try {
			json = RemoveFriend_s.removeFriend("hugowyb", "pizza");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());
	}
}
