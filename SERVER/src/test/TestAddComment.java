package test;

import org.json.JSONException;
import org.json.JSONObject;

import services.AddComment_s;

public class TestAddComment {
	public static void main(String[] args) {
		JSONObject json = null;
		try {
			json = AddComment_s.addComment("hugowyb", "salut");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		System.out.println(json.toString());
	}
}

